import ObjectID from "mongodb";

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

	static addUser = async (req, res) => {
		try {
			const { username, email, password } = req.body;

			const userDoc = {
				email: email,
				username: username,
				password: password,
			};

			const checkExisitingUser = await users.findOne({
				$or: [{ username: username }, { email: email }],
			});

			if (checkExisitingUser) {
				res.status(409).json({
					code: 409,
					message: "User already exists.",
				});

				return;
			}

			const receipt = await users.insertOne(userDoc);

			receipt.insertedId
				? res.status(201).json({
						code: 201,
						message: "Account created.",
						id: receipt.insertedId,
				  })
				: res.status(500).json({
						code: 500,
						message: "Something went wrong.",
				  });
		} catch (err) {
			console.error(`Unable to post user => ${err}`);

			return {
				error: err,
			};
		}
	};

	static putUser = async (req, res) => {
		try {
			const { username, email, password } = req.body;
		} catch (err) {
			console.error(`Unable to put user => ${err}`);

			return {
				error: err,
			};
		}
	};
}
