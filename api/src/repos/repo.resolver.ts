import { Query, Resolver } from "type-graphql";
import { Repo, RepoRestricted } from "./repos.entity";

// Input Types
// @InputType()
// class NewRepo {
//   @Field()
//   name: string;

//   @Field()
//   url: string;

//   @Field()
//   isPrivate: boolean;
// }

// Resovler needs to specify the schema details as well
// Resolver for the Repo entity
@Resolver(Repo)
export default class RepoResolver {
  // Method GET for all repos
  @Query(() => [Repo])
  async repos() {
    const repos = await Repo.find({
      relations: { languages: true, status: true, comments: true },
    });
    return repos;
  }

  @Query(() => [RepoRestricted])
  async reposRestricted() {
    const repos = await Repo.find({
      relations: { status: true },
    });
    return repos;
  }

  // @Mutation(() => Repo)
  // // Entering data called "data" needs to be of type NewRepo
  // async createNewRepo(@Arg("data") newRepo: NewRepo) {
  // }
}
