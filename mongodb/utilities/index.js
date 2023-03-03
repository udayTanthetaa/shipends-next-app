import { ObjectId } from "mongodb";
import { hash, compare } from "bcrypt";
import * as jwt from "jsonwebtoken";
import validator from "validator";
import { sendCustomResponse, sendKeyResponse } from "responses";

export const isEmailValid = (res, email) => {
	if (email === undefined || email === "" || email.length > 350 || !validator.isEmail(email)) {
		sendKeyResponse(res, "INVALID_EMAIL");
		return false;
	}

	return true;
};

export const isUsernameValid = (res, username) => {
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

export const isPasswordValid = (res, password) => {
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

export const isTokenValid = (res, token) => {
	try {
		const verified = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

		if (!verified) {
			sendKeyResponse(res, "UNAUTHORIZED");
			return false;
		}

		return true;
	} catch (err) {
		sendKeyResponse(res, "UNAUTHORIZED");
		return false;
	}
};

export const isToken = (res, token) => {
	if (!token) {
		sendKeyResponse(res, "AUTH_TOKEN_MISSING");
		return false;
	}

	return true;
};
