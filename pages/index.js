import Head from "next/head";
import Image from "next/image";

import { Cta } from "../components";
import { Button } from "ui";

const Home = () => {
	return (
		<>
			<Head>
				<title>Shipends</title>
				<meta
					name="description"
					content="Ship cool products, without reading docs."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex flex-col w-full min-h-screen bg-isGrayLightEmphasis6 place-content-center items-center"></main>
		</>
	);
};

export default Home;
