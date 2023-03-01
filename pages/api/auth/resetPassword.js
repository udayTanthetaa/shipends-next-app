import clientPromise from "../../../mongodb";
import UsersDAO from "../../../mongodb/dao/usersDAO";
import { sendKeyResponse } from "responses";

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			const client = await clientPromise;

			await UsersDAO.injectDB(client);
			await UsersDAO.resetPassword(req, res);
		} catch (err) {
			sendKeyResponse(res, "BAD_REQUEST");
		}
	} else {
		sendKeyResponse(res, "INVALID_ROUTE");
	}
};

export default handler;
