import NextAuth from "next-auth";
import { authOptions } from "@/server/auth";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
