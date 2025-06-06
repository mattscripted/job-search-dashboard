import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  basePath: "/auth",
  adapter: MongoDBAdapter(client),
  providers: [
    GitHub,
  ],
});
