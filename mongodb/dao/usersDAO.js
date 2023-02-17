// import { ObjectId } from "bson";
import { ObjectId } from "mongodb";
import { hash, compare } from "bcrypt";
import * as jwt from "jsonwebtoken";
import validator from "validator";
import nodemailer from "nodemailer";
import { getResponse, sendResponse } from "../../responseCodes";

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
		let status = true;

		if (!validator.isEmail(email)) status = false;
		if (email.length > 350) status = false;
		if (status === false) sendResponse(res, "INVALID_EMAIL");

		return status;
	};

	static isUsernameValid = (res, username) => {
		let status = true;

		if (!validator.isAlphanumeric(username)) status = false;
		if (username.length > 30) status = false;
		if (status === false) sendResponse(res, "INVALID_USERNAME");

		return status;
	};

	static isPasswordValid = (res, password) => {
		let status = true;

		if (password === "") status = false;
		if (password.length > 101) status = false;
		if (status === false) sendResponse(res, "INVALID_PASSWORD");

		return status;
	};

	static isUsernameUnique = async (res, username) => {
		const exists = await users.findOne({
			username: username,
		});

		if (exists) {
			sendResponse(res, "USERNAME_CONFLICT");
			return false;
		}

		return true;
	};

	static isEmailUnique = async (res, email) => {
		const exists = await users.findOne({
			email: email,
		});

		if (exists) {
			sendResponse(res, "EMAIL_CONFLICT");
			return false;
		}

		return true;
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

			const verificationUrl = `${req.headers.origin}/verify?token=${token}`;

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
				sendResponse(res, "EMAIL_SENT");
			} catch (err) {
				sendResponse(res, "EMAIL_FAILED");
			}
		} catch (err) {
			sendResponse(res, "INTERNAL_SERVER_ERROR");
		}
	};

	static verifyEmail = async (req, res) => {
		try {
			const { token } = req.body;

			if (!token) {
				sendResponse(res, "AUTH_TOKEN_MISSING");
				return;
			}

			try {
				const verified = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

				if (!verified) {
					sendResponse(res, "UNAUTHORIZED");
					return;
				}

				const user = jwt.decode(token);

				const userDoc = {
					email: user.email,
					username: user.username,
					password: user.password,
				};

				const receipt = await users.insertOne(userDoc);

				receipt.insertedId ? sendResponse(res, "SIGN_UP_SUCCESS") : sendResponse(res, "SOMETHING_WENT_WRONG");
			} catch (err) {
				sendResponse(res, "INVALID_AUTH_TOKEN");
			}
		} catch (err) {
			sendResponse(res, "INTERNAL_SERVER_ERROR");
		}
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
				sendResponse(res, "USER_NOT_FOUND");
				return;
			}

			const checkPassword = await compare(password, userDoc.password);

			if (!checkPassword) {
				sendResponse(res, "WRONG_PASSWORD");
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

			res.status(201).json({ ...getResponse("SIGN_IN_SUCCESS"), token: token });
		} catch (err) {
			sendResponse(res, "INTERNAL_SERVER_ERROR");
		}
	};

	static updateEmail = async (req, res) => {
		try {
			const { token, email } = req.body;

			if (!validator.isEmail(email)) {
				sendResponse(res, "INVALID_EMAIL");
				return;
			}

			const verified = jwt.verify(token.session, process.env.NEXT_PUBLIC_JWT_SECRET);

			if (!verified) {
				sendResponse(res, "UNAUTHORIZED");
				return;
			}

			const user = jwt.decode(token.session);
			const _id = new ObjectId(user.id);

			const userDoc = await users.findOne({
				_id: _id,
			});

			if (!userDoc) {
				sendResponse(res, "USER_NOT_FOUND");
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

			sendResponse(res, "UPDATED");
		} catch (err) {
			sendResponse(res, "INTERNAL_SERVER_ERROR");
		}
	};

	static updateUsername = async (req, res) => {
		try {
			const { token, username } = req.body;

			if (!validator.isAlphanumeric(username)) {
				sendResponse(res, "INVALID_USERNAME");
				return;
			}

			const verified = jwt.verify(token.session, process.env.NEXT_PUBLIC_JWT_SECRET);

			if (!verified) {
				sendResponse(res, "UNAUTHORIZED");
				return;
			}

			const user = jwt.decode(token.session);
			const _id = new ObjectId(user.id);

			const userDoc = await users.findOne({
				_id: _id,
			});

			if (!userDoc) {
				sendResponse(res, "USER_NOT_FOUND");
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

			sendResponse(res, "UPDATED");
		} catch (err) {
			sendResponse(res, "INTERNAL_SERVER_ERROR");
		}
	};

	static updatePassword = async (req, res) => {
		try {
			const { token, password } = req.body;

			const verified = jwt.verify(token.session, process.env.NEXT_PUBLIC_JWT_SECRET);

			if (!verified) {
				sendResponse(res, "UNAUTHORIZED");
				return;
			}

			const user = jwt.decode(token.session);
			const _id = new ObjectId(user.id);

			const userDoc = await users.findOne({
				_id: _id,
			});

			if (!userDoc) {
				sendResponse(res, "USER_NOT_FOUND");
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

			sendResponse(res, "UPDATED");
		} catch (err) {
			sendResponse(res, "INTERNAL_SERVER_ERROR");
		}
	};
}
