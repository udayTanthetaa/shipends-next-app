import { ObjectId } from "mongodb";
import clientPromise from "../../../mongodb";
import UsersDAO from "../../../mongodb/dao/usersDAO";
import { isToken, isTokenValid } from "mongodb/utilities";
import { sendKeyResponse } from "responses";
import * as jwt from "jsonwebtoken";

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			// setting client
			const client = await clientPromise;
			await UsersDAO.injectDB(client);

			// checking validation
			const { token } = req.body;
			if (!isToken(res, token)) return;
			if (!isTokenValid(res, token)) return;

			// validating request
			const user = jwt.decode(token);
			if (!user.id) {
				sendKeyResponse(res, "INVALID_AUTH_TOKEN");
				return;
			}

			// getting user
			const _id = new ObjectId(user.id);
			await UsersDAO.getUser(_id, res);
		} catch (err) {
			sendKeyResponse(res, "BAD_REQUEST");
		}
	} else {
		sendKeyResponse(res, "INVALID_ROUTE");
	}
};

export default handler;
