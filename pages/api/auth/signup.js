import clientPromise from "../../../lib/mongodb";
import { hash } from "bcrypt";

const handler = async (req, res) => {
	if (req.method === "POST") {
		const client = await clientPromise;
		const db = client.db("shipends");

		const { username, email, password } = req.body;

		// checking user existence
		const checkExisitingUser = await db.collection("users").findOne({
			$or: [{ username: username }, { email: email }],
		});

		if (checkExisitingUser) {
			res.status(422).json({
				message: "User already exists.",
			});
		} else {
			const status = await db.collection("users").insertOne({
				username,
				email,
				password: await hash(password, 12),
			});

			res.status(201).json({
				message: "Account Created.",
				...status,
			});
		}
	} else {
		res.status(500).json({
			message: "Invalid Route.",
		});
	}
};

export default handler;
