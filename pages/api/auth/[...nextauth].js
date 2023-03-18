import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import GoogleProvider from "next-auth/providers/google";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (account.provider === "google") {
  //       return profile.email_verified && profile.email.endsWith("@example.com")
  //     }
  //     return true // Do different verification for other providers that don't have `email_verified`
  //   },
  // },
  secret: process.env.JWT_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: '/home',
  },
  session: {
    strategy: 'jwt',
  }
});