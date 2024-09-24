CREATE TABLE status (id SERIAL PRIMARY KEY, status VARCHAR);

CREATE TABLE repo (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  url VARCHAR,
  status_id INTEGER REFERENCES status(id) ON DELETE
  SET
    NULL
);

CREATE TABLE comment (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  title VARCHAR,
  body VARCHAR,
  timestamp TIMESTAMP,
  repo_id INTEGER REFERENCES repo(id)
);

CREATE TABLE language (id SERIAL PRIMARY KEY, name VARCHAR);

CREATE TABLE repo_language (
  repo_id INTEGER REFERENCES repo(id),
  language_id INTEGER REFERENCES language(id),
  PRIMARY KEY (repo_id, language_id)
);