import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { MongodbLevel } from "mongodb-level";
import { GitHubProvider } from "tinacms-gitprovider-github";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN as string;
const owner = process.env.GITHUB_OWNER as string;
const repo = process.env.GITHUB_REPO as string;
const branch = (process.env.GITHUB_BRANCH || "main") as string;

if (!branch) {
  throw new Error(
    "No branch found. Make sure that you have set the GITHUB_BRANCH environment variable."
  );
}

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch,
        owner,
        repo,
        token,
      }),
      databaseAdapter: new MongodbLevel<string, Record<string, any>>({
        collectionName: "tinacms",
        dbName: process.env.MONGODB_DBNAME || "tinacms",
        mongoUri: process.env.MONGODB_URI as string,
      }),
      namespace: branch,
    });
