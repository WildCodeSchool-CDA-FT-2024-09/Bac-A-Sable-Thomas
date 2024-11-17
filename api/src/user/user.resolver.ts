import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { User } from "./user.entity";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as argon2 from "argon2";

dotenv.config();
const { AUTH_SECRET } = process.env;

@Resolver()
export default class UserResolver {
  @Query(() => User)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() ctx: { res: { setHeader: (key: string, value: string) => void } }
  ): Promise<User | boolean> {
    const testPassword = "testargon2hash";
    const testHash = await argon2.hash(testPassword);
    const testUser = User.create({
      id: "1",
      username: "test",
      password: testHash,
      email: "test@test.com",
      role: "admin",
    });
    if (username === testUser.username) {
      const valid = await argon2.verify(testUser.password, password);
      if (valid && AUTH_SECRET) {
        const token = jwt.sign({ username }, AUTH_SECRET, {
          expiresIn: "24h",
        });
        ctx.res.setHeader(
          "Set-Cookie",
          "bas-token=" +
            token +
            "; HttpOnly; Secure; SameSite=Strict; expires=" +
            new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toUTCString()
        );

        return testUser;
      }
    }
    return false;
  }
}
