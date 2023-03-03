import { Octokit } from "octokit";
import { Constants } from "../../components";
import { ShipCard, InvisibleNavbar } from "ui";

export const getStaticProps = async () => {
	const octokit = new Octokit({
		auth: process.env.NEXT_PUBLIC_GIT_TOKEN,
	});

	const owner = Constants.owner;
	const repo = Constants.repo;
	const path = "index.json";

	const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}{?ref}", {
		owner: owner,
		repo: repo,
		path: path,
	});

	const json = JSON.parse(Buffer.from(response.data.content, "base64"));
	const ships = json.ships;

	return {
		props: {
			ships: ships,
		},
	};
};

const Learn = ({ ships }) => {
	return (
		<>
			<div className="flex flex-col items-center w-full min-h-screen p-3 place-content-start bg-isGrayLightEmphasis6">
				<InvisibleNavbar />

				<div className="grid w-full max-w-6xl grid-cols-1 gap-3  sm:grid-cols-2 md:grid-cols-3">
					{ships.map((ship, index) => {
						return <ShipCard key={index} ship={ship} />;
					})}
				</div>
			</div>
		</>
	);
};

export default Learn;
