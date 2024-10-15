import { Arg, Query, Resolver } from "type-graphql";
import { Repo, RepoRestricted } from "./repos.entity";
import { In } from "typeorm";

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
  async repos(
    @Arg("language", { nullable: true }) language: string
  ): Promise<Repo[]> {
    if (language) {
      const repos = await this.reposByLanguage(language);
      return repos;
    } else {
      const repos = await Repo.find({
        relations: { languages: true, status: true, comments: true },
      });
      return repos;
    }
  }

  async reposByLanguage(language: string): Promise<Repo[]> {
    const repos = await Repo.find({
      relations: { languages: true },
      where: { languages: { label: language } },
    });

    const fullRepos = await Repo.find({
      where: { id: In(repos.map((repo) => repo.id)) },
      relations: { status: true, languages: true, comments: true },
    });

    return fullRepos;
  }

  @Query(() => [RepoRestricted])
  async reposRestricted(): Promise<RepoRestricted[]> {
    const repos = await Repo.find({
      relations: { status: true },
    });
    return repos;
  }

  @Query(() => Repo)
  async repo(@Arg("id") id: string): Promise<Repo | null> {
    const repo = await Repo.findOne({
      relations: { languages: true, status: true, comments: true },
      where: { id },
    });
    return repo;
  }

  // @Mutation(() => Repo)
  // // Entering data called "data" needs to be of type NewRepo
  // async createNewRepo(@Arg("data") newRepo: NewRepo) {
  // }
}
