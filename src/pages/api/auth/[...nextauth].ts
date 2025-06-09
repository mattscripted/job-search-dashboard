import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/auth/db"

export const authOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  debug: true
}

export default NextAuth(authOptions);
