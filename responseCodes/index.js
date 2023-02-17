import { Codemap } from "./codemap";

const getResponse = (name) => {
	return Codemap[name];
};

const sendResponse = (res, key) => {
	const response = getResponse(key);
	res.status(response.code).json(response);
};

export { getResponse, sendResponse };
