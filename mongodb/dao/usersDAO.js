import { ObjectId } from "mongodb";
import { hash, compare } from "bcrypt";
import * as jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { sendCustomResponse, sendKeyResponse } from "responses";

let users;

export default class UsersDAO {
	static injectDB = async (conn) => {
		if (users) return;

		try {
			users = await conn.db(process.env.NEXT_PUBLIC_MONGODB_NS).collection("users");
		} catch (err) {
			console.error(`Unable to establish connection handle in usersDAO => ${err}`);
		}
	};

	static isUsernameUnique = async (res, username) => {
		const exists = await users.findOne({
			username: username,
		});

		if (exists) {
			sendKeyResponse(res, "USERNAME_CONFLICT");
			return false;
		} else return true;
	};

	static isEmailUnique = async (res, email) => {
		const exists = await users.findOne({
			email: email,
		});

		if (exists) {
			sendKeyResponse(res, "EMAIL_CONFLICT");
			return false;
		} else return true;
	};

	static isAccountCreated = async (res, email, username) => {
		const userExists = await users.findOne({
			$or: [
				{
					email: email,
				},
				{
					username: username,
				},
			],
		});

		if (userExists) {
			sendKeyResponse(res, "SIGN_UP_SUCCESS");
			return true;
		} else return false;
	};

	static signIn = async (username, password, res) => {
		try {
			const userDoc = await users.findOne({
				username: username,
			});
			if (!userDoc) {
				sendKeyResponse(res, "USER_NOT_FOUND");
				return;
			}

			const checkPassword = await compare(password, userDoc.password);
			if (!checkPassword) {
				sendKeyResponse(res, "WRONG_PASSWORD");
				return;
			}

			const token = jwt.sign(
				{
					id: userDoc._id,
				},
				process.env.NEXT_PUBLIC_JWT_SECRET,
				{
					allowInsecureKeySizes: true,
					expiresIn: 365 * 24 * 60 * 60 * 1000,
				}
			);

			sendCustomResponse(res, "SIGN_IN_SUCCESS", {
				token: token,
			});
		} catch (err) {
			sendKeyResponse(res, "INTERNAL_SERVER_ERROR");
		}
	};

	static signUp = async (email, username, password, res) => {
		try {
			if (!(await this.isUsernameUnique(res, username))) return;
			if (!(await this.isEmailUnique(res, email))) return;

			const token = jwt.sign(
				{
					email: email,
					username: username,
					password: await hash(password, 12),
				},
				process.env.NEXT_PUBLIC_JWT_SECRET,
				{
					allowInsecureKeySizes: true,
					expiresIn: 10 * 60 * 1000, // 10 minutes
				}
			);

			const verificationUrl = `${req.headers.origin}/profile/verify?token=${token}`;

			const transporter = nodemailer.createTransport({
				host: "smtp.gmail.com",
				auth: {
					user: process.env.NEXT_PUBLIC_GMAIL_USER,
					pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
				},
				secure: true,
			});

			const config = {
				from: process.env.NEXT_PUBLIC_GMAIL_USER,
				to: email,
				subject: "Test Email",
				text: `Click here to verify -- ${verificationUrl}`,
			};

			try {
				await transporter.sendMail(config);
				sendKeyResponse(res, "EMAIL_SENT");
			} catch (err) {
				sendKeyResponse(res, "EMAIL_FAILED");
			}
		} catch (err) {
			sendKeyResponse(res, "INTERNAL_SERVER_ERROR");
		}
	};

	static verify = async (email, username, password, res) => {
		try {
			const userDoc = {
				email: email,
				username: username,
				password: password,
			};

			if (await this.isAccountCreated(res, email, username)) return;

			const receipt = await users.insertOne(userDoc);
			receipt.insertedId ? sendKeyResponse(res, "SIGN_UP_SUCCESS") : sendKeyResponse(res, "SOMETHING_WENT_WRONG");
		} catch (err) {
			sendKeyResponse(res, "INTERNAL_SERVER_ERROR");
		}
	};

	static getUser = async (_id, res) => {
		try {
			const userDoc = await users.findOne({
				_id: _id,
			});

			if (!userDoc) sendKeyResponse(res, "USER_NOT_FOUND");
			else
				sendCustomResponse(res, "SUCCESS", {
					user: {
						username: userDoc.username,
						email: userDoc.email,
					},
				});
		} catch (err) {
			sendKeyResponse(res, "INTERNAL_SERVER_ERROR");
		}
	};
}
