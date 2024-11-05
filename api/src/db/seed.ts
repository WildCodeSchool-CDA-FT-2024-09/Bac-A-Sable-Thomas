import dataSource from "./data-source";

import { Language } from "../languages/languages.entity";
import languageData from "../../data/languages.json";
import { Status } from "../statuses/statuses.entity";
import statusData from "../../data/statuses.json";
import { Repo } from "../repos/repos.entity";
import repoData from "../../data/repos.json";
import repo_languages from "../../data/repo_languages.json";

(async () => {
  await dataSource.initialize();
  console.log("Data source initialized");

  let queryRunner = dataSource.createQueryRunner();
  try {
    await queryRunner.startTransaction();
    await queryRunner.query("TRUNCATE repo RESTART IDENTITY CASCADE");
    await queryRunner.query("TRUNCATE status RESTART IDENTITY CASCADE");
    await queryRunner.query("TRUNCATE language RESTART IDENTITY CASCADE");
    await queryRunner.query(
      "TRUNCATE repo_languages_language RESTART IDENTITY CASCADE"
    );

    // Postgres reset sequence if columns not owned by tables
    // await queryRunner.query(`ALTER SEQUENCE language_id_seq RESTART WITH 1;`);
    // await queryRunner.query(`ALTER SEQUENCE status_id_seq RESTART WITH 1;`);
    // await queryRunner.query(`ALTER SEQUENCE comment_id_seq RESTART WITH 1;`);

    await queryRunner.commitTransaction();
  } catch (error) {
    console.error("Error truncating tables", error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }

  // Seed languages
  let savedLanguages: Language[] = [];
  queryRunner = dataSource.createQueryRunner();
  try {
    await queryRunner.startTransaction();
    savedLanguages = await Promise.all(
      languageData.map(async (language) => {
        const newLanguage = new Language();
        newLanguage.label = language.label;
        return await newLanguage.save();
      })
    );
    await queryRunner.commitTransaction();
  } catch (error) {
    console.error("Error inserting languages", error);
    await queryRunner.rollbackTransaction;
  } finally {
    await queryRunner.release();
  }

  // Seed statuses
  let savedStatuses: Status[] = [];
  queryRunner = dataSource.createQueryRunner();
  try {
    await queryRunner.startTransaction();
    savedStatuses = await Promise.all(
      statusData.map(async (status) => {
        const newStatus = new Status();
        newStatus.label = status.label;
        return await newStatus.save();
      })
    );
    await queryRunner.commitTransaction();
  } catch (error) {
    console.error("Error inserting statuses", error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }

  queryRunner = dataSource.createQueryRunner();
  try {
    await queryRunner.startTransaction();
    // Seed repos
    const savedRepos = await Promise.all(
      repoData.map(async (repo) => {
        const newRepo = new Repo();
        newRepo.id = repo.id;
        newRepo.name = repo.name;
        newRepo.url = repo.url;

        // Match statuses between data statuses and newly saved statuses - we only need to do this because of the multi-step process that we used to previously demo breaking down the raw data.
        const newStatus = savedStatuses.find(
          (status) => status.id === repo.isPrivate
        ) as Status;
        newRepo.status = newStatus;

        // Get the subset of repo_languages that are associated with this repo
        const newRepoLanguageAssociations = repo_languages.filter(
          (repo_language) => {
            return repo_language.repoId === newRepo.id;
          }
        );

        // For that subset...
        const newRepoLanguages = newRepoLanguageAssociations.map((assoc) => {
          // ... get the label of the language from the original data that matches the languageId of the association
          const label = languageData.find(
            (language) => language.id === assoc.languageId
          )?.label;
          // ... find the newly saved language that matches that label and return its id
          return {
            id: savedLanguages.find(
              (savedLanguage) => savedLanguage.label === label
            )?.id,
            label: label,
          };
        }) as Language[];

        newRepo.languages = newRepoLanguages;
        return await newRepo.save();
      })
    );
    await queryRunner.commitTransaction();

    console.log(
      `Database seeded with ${savedRepos.length} repos, ${savedLanguages.length} languages, and ${savedStatuses.length} statuses`
    );
  } catch (error) {
    console.error("Error seeding database", error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
    await dataSource.destroy();
  }
})();
