import { ObjectId } from "mongodb";
// import { hash, compare } from "bcrypt";
import * as jwt from "jsonwebtoken";
import validator from "validator";
// import { json } from "express";

let users;

export default class UsersDAO {
	static injectDB = async (conn) => {
		if (users) {
			return;
		}

		try {
			users = await conn.db(process.env.NEXT_PUBLIC_MONGODB_NS).collection("users");
		} catch (err) {
			console.error(`Unable to establish connection handle in reviewDAO => ${err}`);
		}
	};

	static addUser = async ({ username, email, password }) => {
		try {
			if (!validator.isEmail(email)) {
				return {
					code: 400,
					message: "Invalid Email",
				};

				res.status(400).json({
					code: 400,
					message: "Invalid Email",
				});

				return;
			}

			if (!validator.isAlphanumeric(username)) {
				res.status(400).json({
					code: 400,
					message: "Invalid Username",
				});

				return;
			}

			if (password === "") {
				res.status(400).json({
					code: 400,
					message: "Invalid Password",
				});

				return;
			}

			const checkExisitingUsername = await users.findOne({
				username: username,
			});

			if (checkExisitingUsername) {
				res.status(409).json({
					code: 409,
					message: "Username Unavailable",
				});

				return;
			}

			const checkExisitingEmail = await users.findOne({
				email: email,
			});

			if (checkExisitingEmail) {
				res.status(409).json({
					code: 409,
					message: "Email Already Exists",
				});

				return;
			}

			const userDoc = {
				email: email,
				username: username,
				password: await hash(password, 12),
			};

			const receipt = await users.insertOne(userDoc);

			receipt.insertedId
				? res.status(200).json({
						code: 200,
						message: "Account Created",
						id: receipt.insertedId,
				  })
				: res.status(500).json({
						code: 500,
						message: "Something Went Wrong",
				  });
		} catch (err) {
			console.error(`Unable to post user => ${err}`);

			return {
				error: err,
			};
		}
	};

	static verifyUser = async (req, res) => {
		try {
			const { username, password } = req.body;

			if (!validator.isAlphanumeric(username)) {
				res.status(400).json({
					code: 400,
					message: "Invalid Username",
				});

				return;
			}

			const userDoc = await users.findOne({
				username: username,
			});

			if (!userDoc) {
				res.status(404).json({
					code: 404,
					message: "User Not Found",
				});

				return;
			}

			const checkPassword = await compare(password, userDoc.password);

			if (!checkPassword) {
				res.status(401).json({
					code: 401,
					message: "Incorrect Password",
				});
			} else {
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

				res.status(200).json({
					code: 200,
					message: "Login Success",
					token: token,
				});
			}
		} catch (err) {
			console.error(`Unable to put user => ${err}`);

			return {
				error: err,
			};
		}
	};

	static updateEmail = async (req, res) => {
		try {
			const { token, email } = req.body;

			if (!validator.isEmail(email)) {
				res.status(400).json({
					code: 400,
					message: "Invalid Email",
				});

				return;
			}

			const verified = jwt.verify(token.session, process.env.NEXT_PUBLIC_JWT_SECRET);

			if (!verified) {
				res.status(401).json({
					code: 401,
					message: "Unauthorized.",
				});

				return;
			}

			const user = jwt.decode(token.session);
			const _id = new ObjectId(user.id);

			const userDoc = await users.findOne({
				_id: _id,
			});

			if (!userDoc) {
				res.status(404).json({
					code: 404,
					message: "User not found.",
				});

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

			res.status(200).json({
				code: 200,
				message: "Updated",
			});
		} catch (err) {
			console.error(`Unable to put email => ${err}`);

			return {
				error: err,
			};
		}
	};

	static updateUsername = async (req, res) => {
		try {
			const { token, username } = req.body;

			if (!validator.isAlphanumeric(username)) {
				res.status(400).json({
					code: 400,
					message: "Invalid Username",
				});

				return;
			}

			const verified = jwt.verify(token.session, process.env.NEXT_PUBLIC_JWT_SECRET);

			if (!verified) {
				res.status(401).json({
					code: 401,
					message: "Unauthorized",
				});

				return;
			}

			const user = jwt.decode(token.session);
			const _id = new ObjectId(user.id);

			const userDoc = await users.findOne({
				_id: _id,
			});

			if (!userDoc) {
				res.status(404).json({
					code: 404,
					message: "User Not Found",
				});

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

			res.status(200).json({
				code: 200,
				message: "Updated",
			});
		} catch (err) {
			console.error(`Unable to put username => ${err}`);

			return {
				error: err,
			};
		}
	};

	static updatePassword = async (req, res) => {
		try {
			const { token, password } = req.body;

			const verified = jwt.verify(token.session, process.env.NEXT_PUBLIC_JWT_SECRET);

			if (!verified) {
				res.status(401).json({
					code: 401,
					message: "Unauthorized",
				});

				return;
			}

			const user = jwt.decode(token.session);
			const _id = new ObjectId(user.id);

			const userDoc = await users.findOne({
				_id: _id,
			});

			if (!userDoc) {
				res.status(404).json({
					code: 404,
					message: "User Not Found",
				});

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

			res.status(200).json({
				code: 200,
				message: "Updated",
			});
		} catch (err) {
			console.error(`Unable to put password => ${err}`);

			return {
				error: err,
			};
		}
	};

	static isUser = async (req, res) => {
		try {
			const { username } = req.body;

			if (!validator.isAlphanumeric(username)) {
				res.status(400).json({
					code: 400,
					message: "Invalid Username",
				});

				return;
			}

			const userDoc = await users.findOne({
				username: username,
			});

			if (userDoc) {
				res.status(200).json({
					code: 200,
					message: "FOUND",
				});
			} else {
				res.status(404).json({
					code: 404,
					message: "NOT_FOUND",
				});
			}
		} catch (err) {
			console.error(`Unable to validate user => ${err}`);

			return {
				error: err,
			};
		}
	};
}
