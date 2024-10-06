export type Repo = {
  id: string;
  name: string;
  url: string;
  status: Status;
  languages: Language[] | [];
  comments: Comment[] | [];
};

export type Status = {
  id: 1 | 2;
  label: "Public" | "Private";
};

export type Language = {
  id: number;
  label: string;
};

export type Comment = {
  id: number;
  author: string;
  text: string;
  createdAt: string;
};

export type Languages = Language[];

export type ReposRequest = Repo[] | [];

export type ReposPageLoaderData = {
  repos: ReposRequest;
  languages: Languages;
};
