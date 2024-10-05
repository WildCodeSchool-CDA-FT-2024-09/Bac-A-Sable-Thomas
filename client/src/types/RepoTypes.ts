export type Repo = {
  id: string;
  name: string;
  url: string;
  status: Status;
  languages: Language[] | [];
};

export type Status = {
  id: 1 | 2;
  label: "Public" | "Private";
};

export type Language = {
  id: number;
  label: string;
};

export type RepoRequest = Repo[] | [];
