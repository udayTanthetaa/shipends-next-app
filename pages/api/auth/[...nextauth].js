import NextAuth from "next-auth";
import clientPromise from "../../../lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { EmailProvider } from "next-auth/providers";

import { compare } from "bcrypt";

export default NextAuth({
	secret: process.env.NEXT_PUBLIC_JWT_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 365 * 24 * 60 * 60,
	},
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		EmailProvider({
			server: {
				host: process.env.NEXT_PUBLIC_EMAIL_SERVER_HOST,
				port: process.env.NEXT_PUBLIC_EMAIL_SERVER_PORT,
				auth: {
					user: process.env.NEXT_PUBLIC_EMAIL_SERVER_USER,
					pass: process.env.NEXT_PUBLIC_EMAIL_SERVER_PASS,
				},
			},
			from: process.env.NEXT_PUBLIC_EMAIL_FROM,
		}),
	],
	pages: {
		signIn: "../../profile",
	},
});
