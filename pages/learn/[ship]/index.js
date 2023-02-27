import { useRouter } from "next/router";
import { Octokit } from "octokit";
import { Constants } from "../../../components";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export const getStaticProps = async (context) => {
	const octokit = new Octokit({
		auth: process.env.NEXT_PUBLIC_GIT_TOKEN,
	});

	const { params } = context;

	const owner = Constants.owner;
	const repo = Constants.repo;

	const pathIndex = `${params.ship}/index.json`;
	const responseIndex = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}{?ref}", {
		owner: owner,
		repo: repo,
		path: pathIndex,
	});

	const index = JSON.parse(Buffer.from(responseIndex.data.content, "base64"));

	return {
		props: {
			index: index,
		},
		revalidate: 86400,
	};
};

export const getStaticPaths = async () => {
	const paths = [
		{
			params: {
				ship: "hardhat",
			},
		},
	];

	return {
		paths: paths,
		fallback: true,
	};
};

const Ship = ({ index }) => {
	const Router = useRouter();

	if (Router.isFallback) {
		return <>Loading...</>;
	}

	const getColorSet = (num) => {
		return (
			<>
				<div className="z-20 w-5 h-5 p-0 rounded-full drop-shadow-sm bg-isGolden" />
				<div className="z-30 w-5 h-5 p-0 -ml-2 rounded-full drop-shadow-sm bg-isMagenta" />
				<div className="z-40 w-5 h-5 p-0 -ml-2 rounded-full drop-shadow-sm bg-isCyan" />
			</>
		);
	};

	return (
		<>
			<div className="flex flex-col items-center w-full min-h-screen p-3 bg-isGrayLightEmphasis6 place-content-start">
				<div className="w-full h-full max-w-6xl flex flex-col space-y-[12px] mt-[64px] sm:mt-[64px] md:mt-[68px] lg:mt-[74px]">
					{/* <div className="w-full -mt-[16px] relative">
						<img
							src={index.banner}
							alt={`${index.parent} banner`}
							layout={"fill"}
							className="mt-[12px] blur-2xl absolute w-full object-cover object-center rounded-md md:rounded-lg lg:rounded-xl h-[150px] md:h-[200px] lg:h-[250px]"
						/>
						<div
							className="absolute place-content-center h-[150px] md:h-[200px] lg:h-[250px] z-[2] flex flex-col items-center w-full
                        mt-[12px] text-5xl md:text-8xl lg:text-11xl font-black text-isWhite drop-shadow-lg capitalize"
						>
							{index.parent}
						</div>
					</div>

					<img
						src={index.banner}
						alt={`${index.parent} banner`}
						layout={"fill"}
						className="z-[1] w-full object-cover object-center rounded-md md:rounded-lg lg:rounded-xl h-[150px] md:h-[200px] lg:h-[250px]
						"
					/> */}

					{index.sections.map((section, key) => {
						return (
							<Link
								href={`${index.parent}/${index[section].path}`}
								key={key}
								passHref
								className="z-3 group"
							>
								<motion.div
									whileTap={{
										scale: 0.9,
										transition: { duration: 0.03 },
									}}
									className="flex flex-col w-full transition duration-300 ease-in-out shadow-sm shadow-isGrayLightEmphasis3 bg-isWhite group-hover:bg-isBlueDark rounded-xl"
								>
									<div className="px-3 pt-3 pb-2 text-lg font-bold leading-5 transition duration-300 ease-in-out group-hover:text-isWhite text-isGrayDarkEmphasis3">
										{index[section].title}
									</div>

									<div className="flex flex-row items-center px-3 text-sm font-medium transition duration-300 ease-in-out text-isGrayDark2 group-hover:text-isWhite">
										<div className="flex flex-row items-center">
											{getColorSet(Math.floor(Math.random() * 2 + 1).toString())}
										</div>
										&nbsp;
										{Math.floor(Math.random() * 100 + 100)}+ Shippers&nbsp;--&nbsp;
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											className="w-6 h-6 transition duration-300 ease-in-out drop-shadow-sm fill-isRedLight group-hover:fill-isRedDark stroke-none"
										>
											<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
										</svg>
										&nbsp;
										{Math.floor(Math.random() * 100 + 100)}
										&nbsp;--&nbsp;
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											className="w-6 h-6 transition duration-300 ease-in-out drop-shadow-sm fill-isGreenLight group-hover:fill-isGreenDark stroke-none delay-50"
										>
											<path
												fillRule="evenodd"
												d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
												clipRule="evenodd"
											/>
										</svg>
										&nbsp;
										{index[section].takes} min
									</div>

									<hr className="w-full my-2 transition duration-300 ease-in-out border-t-2 border-isGrayLightEmphasis5 group-hover:border-isGrayLightEmphasis6" />

									<div className="px-3 pb-2 font-medium leading-5 transition duration-300 ease-in-out text-md text-isGrayDarkEmphasis group-hover:text-isWhite">
										{index[section].description}
									</div>
								</motion.div>
							</Link>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Ship;
