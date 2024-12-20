import {
  Query,
  Resolver,
  Arg,
  Ctx,
  Mutation,
  ObjectType,
  Field,
} from "type-graphql";
import { User } from "./user.entity";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as argon2 from "argon2";

dotenv.config();
const { AUTH_SECRET } = process.env;

@Resolver()
export default class UserResolver {
  // Query to log in a user
  @Query(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: { res: { setHeader: (key: string, value: string) => void } }
  ): Promise<PublicUser | boolean> {
    const user = await User.findOneOrFail({ where: { email } });
    if (user) {
      const valid = await argon2.verify(user.password, password);

      if (!AUTH_SECRET) {
        throw new Error("Server error");
      }

      if (valid) {
        const token = jwt.sign(
          { username: user.username, role: user.role, email: user.email },
          AUTH_SECRET,
          {
            expiresIn: "24h",
          }
        );
        ctx.res.setHeader(
          "Set-Cookie",
          "bas-token=" +
            token +
            "; HttpOnly; Secure; SameSite=Strict; expires=" +
            new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toUTCString()
        );
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        };
      } else {
        throw new Error("Password or email is incorrect");
      }
    } else {
      throw new Error("Password or email is incorrect");
    }
  }

  @Mutation(() => User)
  // Mutation to register a user
  async register(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("email") email: string,
    @Ctx() ctx: { res: { setHeader: (key: string, value: string) => void } }
  ): Promise<PublicUser> {
    if (!isPasswordValid(password)) {
      throw new Error(
        "Password must be at least 8 characters long, contain uppercase, lowercase, a number, and a special character"
      );
    }

    if (!AUTH_SECRET) {
      throw new Error("Server error");
    }
    const hash = await argon2.hash(password);
    const user = new User();
    user.username = username;
    user.password = hash;
    user.email = email;
    user.role = "user";
    await user.save();

    const token = jwt.sign(
      { username: user.username, role: user.role, email: user.email },
      AUTH_SECRET,
      {
        expiresIn: "24h",
      }
    );
    ctx.res.setHeader(
      "Set-Cookie",
      "bas-token=" +
        token +
        "; HttpOnly; Secure; SameSite=Strict; expires=" +
        new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toUTCString()
    );
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }
}

@ObjectType()
class PublicUser {
  @Field()
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  role: string;
}

function isPasswordValid(password: string): boolean {
  // Password must be at least 8 characters long, contain uppercase, lowercase, a number, and a special character
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}
