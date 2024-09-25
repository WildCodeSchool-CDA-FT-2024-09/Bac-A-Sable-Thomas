import fs from "fs";

// Server side types
const sampleRawRepo = {
  id: "R_kgDOMJ1wPQ",
  isPrivate: false,
  languages: [
    {
      size: 987,
      node: {
        name: "JavaScript",
      },
    },
    {
      size: 2250,
      node: {
        name: "Astro",
      },
    },
  ],
  name: "astro-p5js",
  url: "https://github.com/teasmade/astro-p5js",
};

type RawRepo = typeof sampleRawRepo;
type RepoResponse = RawRepo[];

// Target types
type Repo = {
  id: string;
  name: string;
  url: string;
  isPrivate: number;
};

type Language = {
  id: number;
  label: string;
};

type Status = {
  id: number;
  label: "public" | "private";
};

type RepoLanguage = {
  repoId: string;
  languageId: number;
};

async function parseRepos() {
  const raw: RepoResponse = await JSON.parse(
    fs.readFileSync("./data/raw.json", { encoding: "utf-8" })
  );
  return raw;
}

async function transformRepos() {
  const rawRepos = await parseRepos();

  // transform repos
  const repos: Repo[] = rawRepos.map((repo) => {
    return {
      id: repo.id,
      name: repo.name,
      url: repo.url,
      isPrivate: repo.isPrivate ? 1 : 2,
    };
  });

  // transform languages
  const languages: Language[] = [];
  let id: number = 1;
  rawRepos.forEach((repo) => {
    repo.languages.forEach((lang) => {
      if (!languages.find((l) => l.label === lang.node.name)) {
        languages.push({
          id: id,
          label: lang.node.name,
        });
        id++;
      }
    });
  });

  // define statuses
  const statuses: Status[] = [
    {
      id: 1,
      label: "private",
    },
    {
      id: 2,
      label: "public",
    },
  ];

  const repoLanguages: RepoLanguage[] = [];
  rawRepos.forEach((rawRepo) => {
    rawRepo.languages.forEach((rawRepoLang) => {
      const language = languages.find((l) => l.label === rawRepoLang.node.name);
      if (language) {
        repoLanguages.push({
          repoId: rawRepo.id,
          languageId: language.id,
        });
      }
    });
  });

  // write to files
  fs.writeFileSync("./data/repos.json", JSON.stringify(repos, null, 2));
  fs.writeFileSync("./data/languages.json", JSON.stringify(languages, null, 2));
  fs.writeFileSync("./data/statuses.json", JSON.stringify(statuses, null, 2));
  fs.writeFileSync(
    "./data/repo_languages.json",
    JSON.stringify(repoLanguages, null, 2)
  );
}

transformRepos();
