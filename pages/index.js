import Head from "next/head";
import Image from "next/image";

import { Button, InvisibleNavbar } from "ui";

const Home = () => {
	return (
		<>
			<Head>
				<title>Shipends</title>
				<meta name="description" content="Ship cool products, without reading docs." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex flex-col items-center w-full min-h-screen p-3 bg-isGrayLightEmphasis6 place-content-start">
				<InvisibleNavbar />

				<div className="flex flex-col items-center w-full max-w-6xl mt-3">
					<div className="flex flex-col items-center w-full min-h-[60vh] place-content-center bg-isWhite rounded-2xl shadow-sm shadow-isGrayLightEmphasis3">
						<div>build cool products</div>
						<div>without reading docs</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
