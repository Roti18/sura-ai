import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // 👉 pake JWT, no DB
  },
  callbacks: {
    async jwt({ token, user }) {
      // kalau user baru login, inisialisasi chatCount
      if (user && token.chatCount === undefined) {
        token.chatCount = 0;
      }
      return token;
    },
    async session({ session, token }) {
      // inject ke session client-side
      session.user.chatCount = token.chatCount as number;
      return session;
    },
  },
};
