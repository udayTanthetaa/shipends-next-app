import { MongoClient } from "mongodb";
import { hash } from "bcrypt";

const handler = async (req, res) => {
	if (req.method === "POST") {
		const { username, email, password } = req.body;

		if (!email || !email.includes("@") || !password) {
			res.status(422).json({
				message: "Invalid Data.",
			});

			return;
		}

		const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		const db = client.db();

		const checkExisitingEmail = await db.collection("users").findOne({
			email: email,
		});

		if (checkExisitingEmail) {
			res.status(422).json({
				message: "Email already exists.",
			});
		}

		const checkExisitingUsername = await db.collection("users").findOne({
			username: username,
		});

		if (checkExisitingUsername) {
			res.status(422).json({
				message: "Username already exists.",
			});
		}

		const status = await db.collection("users").insertOne({
			username,
			email,
			password: await hash(password, 12),
		});

		res.status(201).json({
			message: "Account created",
			...status,
		});

		client.close();
	} else {
		res.status(500).json({
			message: "Invalid Route.",
		});
	}
};

export default handler;
