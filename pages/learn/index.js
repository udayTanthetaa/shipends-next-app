import Link from "next/link";
import styled from "@emotion/styled";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

import { Image } from "next/image";
import { Octokit } from "octokit";

import { Constants } from "../../components";

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
			<div className="flex min-h-screen text-xs font-normal place-content-center bg-isWhite md:text-sm ">
				<div className="mx-auto max-w-7xl flex-1 p-[12px]">
					<div className="mb-[12px] w-full bg-gradient-to-r from-isZeus to-isZeus bg-clip-text text-center text-xl font-bold text-transparent md:text-2xl lg:text-3xl">
						choose your&nbs2p;
						<span className="rounded-md bg-gradient-to-r from-isZeus to-isZeus py-[0px] px-[6px] font-extrabold text-isWhite md:py-[1px] md:px-[8px] lg:py-[2px] lg:px-[10px]">
							next
						</span>
						&nbsp;
						<span className="font-black">superpower!</span>
					</div>
					<div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 md:grid-cols-3">
						{ships.map((ship, index) => {
							return (
								<div
									key={index}
									className="flex h-full w-full flex-col rounded-lg border-[1px] border-isGreyMuted text-isZeus "
								>
									<div className="-mx-[1px] -mt-[1px] h-36 rounded-t-lg border-[1px] border-transparent bg-aqua md:h-40 lg:h-44" />

									<div className="my-[12px] mx-[12px] flex flex-row items-center">
										<div className="w-6 h-6 rounded-md bg-violet md:h-7 md:w-7 lg:h-8 lg:w-8 " />
										<div className="ml-[12px] text-lg font-bold md:text-xl lg:text-2xl">
											{ship.name}
										</div>
									</div>

									<hr className="border-t-[1px] border-isGreyMuted" />

									<div className="m-[12px] text-sm leading-4 text-isGrey md:m-[12px] md:text-md lg:text-lg">
										{ship.description}
									</div>

									<div className="mt-auto mb-[12px] mr-[12px] flex flex-col items-end">
										<Link href={`/learn/${ship.path}/prologue`} passHref>
											{ship.status === "active" ? (
												<button
													className="delay-50 rounded-lg bg-gWater py-[4px]
                                                    px-[10px] text-sm font-bold text-isGhost transition duration-200 ease-in-out
                                                    hover:bg-isGhost hover:text-isWhite md:text-md lg:text-lg
                                                	"
												>
													Let&apos;s Ship!
												</button>
											) : (
												<button
													disabled
													className="delay-50 cursor-not-allowed rounded-lg bg-isGreyMuted py-[4px]
                                                    px-[10px] text-sm font-bold text-isGhost transition duration-200 ease-in-out
                                                    hover:bg-isGhost hover:text-isWhite md:text-md lg:text-lg
                                                	"
												>
													Coming Soon.
												</button>
											)}
										</Link>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Learn;
