// import { MongoClient } from "mongodb";

// if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
// 	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// }

// if (!process.env.NEXT_PUBLIC_MONGODB_NS) {
// 	throw new Error('Invalid/Missing environment variable: "MONGODB_NS"');
// }

// const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
// const ns = process.env.NEXT_PUBLIC_MONGODB_NS;

// let cached = global.mongo;

// if (!cached) {
// 	cached = global.mongo = { conn: null, promise: null };
// }

// export const connectToDatabase = async () => {
// 	if (cached.conn) {
// 		return cached.conn;
// 	}

// 	if (!cached.promise) {
// 		const options = {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 		};

// 		cached.promise = MongoClient.connect(uri, options).then((client) => {
// 			return {
// 				client,
// 				db: client.db(ns),
// 			};
// 		});
// 	}

// 	cached.conn = await cached.promise;
// 	return cached.conn;
// };

import { MongoClient } from "mongodb";

if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

let client;
let clientPromise;

if (process.env.NEXT_PUBLIC_NODE_ENV === "DEVELOPMENT") {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

export default clientPromise;
