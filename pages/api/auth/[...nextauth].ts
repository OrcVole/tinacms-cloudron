import { TinaAuthJSOptions } from "tinacms-authjs";
import databaseClient from "../../../tina/__generated__/databaseClient";
import NextAuth from "next-auth";

const authOptions = TinaAuthJSOptions({
  databaseClient: databaseClient,
  secret: process.env.NEXTAUTH_SECRET!,
});

export default NextAuth(authOptions);
