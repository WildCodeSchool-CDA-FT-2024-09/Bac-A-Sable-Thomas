import { Query, Resolver } from "type-graphql";
import { Language } from "./languages.entity";

@Resolver(Language)
export default class LanguageResolver {
  @Query(() => [Language])
  async languages() {
    const languages = await Language.find({});
    return languages;
  }
}
