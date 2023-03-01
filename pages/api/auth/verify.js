import clientPromise from "../../../mongodb";
import UsersDAO from "../../../mongodb/dao/usersDAO";
import { sendResponse } from "../../../responseCodes";

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			const client = await clientPromise;

			await UsersDAO.injectDB(client);
			await UsersDAO.verify(req, res);
		} catch (err) {
			sendResponse(res, "BAD_REQUEST");
		}
	} else {
		sendResponse(res, "INVALID_ROUTE");
	}
};

export default handler;
