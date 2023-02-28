// import { ObjectId } from "bson";
import { ObjectId } from "mongodb";
import { hash, compare } from "bcrypt";
import * as jwt from "jsonwebtoken";
import validator from "validator";
import nodemailer from "nodemailer";
import { sendCustomResponse, sendKeyResponse } from "responses";

let users;

export default class UsersDAO {
	static injectDB = async (conn) => {
		if (users) {
			return;
		}

		try {
			users = await conn.db(process.env.NEXT_PUBLIC_MONGODB_NS).collection("users");
		} catch (err) {
			console.error(`Unable to establish connection handle in usersDAO => ${err}`);
		}
	};

	static isEmailValid = (res, email) => {
		if (email === undefined || email === "" || email.length > 350 || !validator.isEmail(email)) {
			sendKeyResponse(res, "INVALID_EMAIL");
			return false;
		}

		return true;
	};

	static isUsernameValid = (res, username) => {
		if (username === undefined || username === "") {
			sendKeyResponse(res, "INVALID_USERNAME");
			return false;
		}

		if (!validator.isAlphanumeric(username)) {
			sendKeyResponse(res, "USERNAME_NOT_ALPHANUMERIC");
			return false;
		}

		if (username.length > 30) {
			sendKeyResponse(res, "USERNAME_LENGTH");
			return false;
		}

		return true;
	};

	static isPasswordValid = (res, password) => {
		if (password === undefined || password === "") {
			sendKeyResponse(res, "INVALID_PASSWORD");
			return false;
		}

		if (password.length > 101) {
			sendKeyResponse(res, "PASSWORD_LENGTH");
			return false;
		}

		return true;
	};

	static isUsernameUnique = async (res, username) => {
		const exists = await users.findOne({
			username: username,
		});

		if (exists) {
			sendKeyResponse(res, "USERNAME_CONFLICT");
			return false;
		}

		return true;
	};

	static isEmailUnique = async (res, email) => {
		const exists = await users.findOne({
			email: email,
		});

		if (exists) {
			sendKeyResponse(res, "EMAIL_CONFLICT");
			return false;
		}

		return true;
	};

	static signIn = async (req, res) => {
		try {
			const { username, password } = req.body;

			if (!this.isUsernameValid(res, username)) return;
			if (!this.isPasswordValid(res, password)) return;

			const userExists = await users.findOne({
				username: username,
			});

			if (!userExists) {
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
					expiresIn: 365 * 24 * 60 * 60,
				}
			);

			sendCustomResponse(res, "SIGN_IN_SUCCESS", {
				token: token,
			});
		} catch (err) {
			sendKeyResponse(res, "INTERNAL_SERVER_ERROR");
		}
	};

	static signUp = async (req, res) => {
		try {
			const { email, username, password } = req.body;

			if (!this.isEmailValid(res, email)) return;
			if (!this.isUsernameValid(res, username)) return;
			if (!this.isPasswordValid(res, password)) return;
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
					expiresIn: 10 * 60, // 10 minutes
				}
			);

			const verificationUrl = `${req.headers.origin}/profile/verify?token=${token}`;

			const transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: process.env.NEXT_PUBLIC_GMAIL_USER,
					pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
				},
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

	static verifyEmail = async (req, res) => {
		try {
			const { token } = req.body;

			if (!token) {
				sendKeyResponse(res, "AUTH_TOKEN_MISSING");
				return;
			}

			try {
				const verified = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

				if (!verified) {
					sendKeyResponse(res, "UNAUTHORIZED");
					return;
				}

				const user = jwt.decode(token);

				const userDoc = {
					email: user.email,
					username: user.username,
					password: user.password,
				};

				if (!this.isEmailUnique(user.email)) {
					sendKeyResponse(res, "SIGN_UP_SUCCESS");
					return;
				}

				const receipt = await users.insertOne(userDoc);

				receipt.insertedId
					? sendKeyResponse(res, "SIGN_UP_SUCCESS")
					: sendKeyResponse(res, "SOMETHING_WENT_WRONG");
			} catch (err) {
				sendKeyResponse(res, "INVALID_AUTH_TOKEN");
			}
		} catch (err) {
			sendKeyResponse(res, "INTERNAL_SERVER_ERROR");
		}
	};

	static updateEmail = async (req, res) => {
		try {
			const { token, email } = req.body;

			if (!validator.isEmail(email)) {
				sendKeyResponse(res, "INVALID_EMAIL");
				return;
			}

			const verified = jwt.verify(token.session, process.env.NEXT_PUBLIC_JWT_SECRET);

			if (!verified) {
				sendKeyResponse(res, "UNAUTHORIZED");
				return;
			}

			const user = jwt.decode(token.session);
			const _id = new ObjectId(user.id);

			const userDoc = await users.findOne({
				_id: _id,
			});

			if (!userDoc) {
				sendKeyResponse(res, "USER_NOT_FOUND");
				return;
			}

			const updateDoc = await users.updateOne(
				{
					_id: _id,
				},
				{
					$set: { email: email },
				}
			);

			sendKeyResponse(res, "UPDATED");
		} catch (err) {
			sendKeyResponse(res, "INTERNAL_SERVER_ERROR");
		}
	};

	static updateUsername = async (req, res) => {
		try {
			const { token, username } = req.body;

			if (!validator.isAlphanumeric(username)) {
				sendKeyResponse(res, "INVALID_USERNAME");
				return;
			}

			const verified = jwt.verify(token.session, process.env.NEXT_PUBLIC_JWT_SECRET);

			if (!verified) {
				sendKeyResponse(res, "UNAUTHORIZED");
				return;
			}

			const user = jwt.decode(token.session);
			const _id = new ObjectId(user.id);

			const userDoc = await users.findOne({
				_id: _id,
			});

			if (!userDoc) {
				sendKeyResponse(res, "USER_NOT_FOUND");
				return;
			}

			const updateDoc = await users.updateOne(
				{
					_id: _id,
				},
				{
					$set: { username: username },
				}
			);

			sendKeyResponse(res, "UPDATED");
		} catch (err) {
			sendKeyResponse(res, "INTERNAL_SERVER_ERROR");
		}
	};

	static updatePassword = async (req, res) => {
		try {
			const { token, password } = req.body;

			const verified = jwt.verify(token.session, process.env.NEXT_PUBLIC_JWT_SECRET);

			if (!verified) {
				sendKeyResponse(res, "UNAUTHORIZED");
				return;
			}

			const user = jwt.decode(token.session);
			const _id = new ObjectId(user.id);

			const userDoc = await users.findOne({
				_id: _id,
			});

			if (!userDoc) {
				sendKeyResponse(res, "USER_NOT_FOUND");
				return;
			}

			const updateDoc = await users.updateOne(
				{
					_id: _id,
				},
				{
					$set: { password: await hash(password, 12) },
				}
			);

			sendKeyResponse(res, "UPDATED");
		} catch (err) {
			sendKeyResponse(res, "INTERNAL_SERVER_ERROR");
		}
	};
}
