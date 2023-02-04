import { useRouter } from "next/router";
import { Octokit } from "octokit";
import { Constants } from "../../../components";
import Link from "next/link";
import Image from "next/image";

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

	return (
		<>
			<div className="flex flex-col items-center w-full min-h-screen bg-isGrayLightEmphasis6 place-content-start">
				<div className="w-full h-full lg:max-w-[1200px] flex flex-col p-[12px] space-y-[12px] ">
					<div className="w-full -mt-[16px] relative">
						<img
							src={index.banner}
							alt={`${index.parent} banner`}
							layout={"fill"}
							className="mt-[12px] blur-2xl absolute w-full object-cover object-center rounded-md md:rounded-lg lg:rounded-xl h-[150px] md:h-[200px] lg:h-[250px]"
						/>
						<div
							className="absolute place-content-center h-[150px] md:h-[200px] lg:h-[250px] z-20 flex flex-col items-center w-full
                        mt-[12px] text-5xl md:text-8xl lg:text-11xl font-black text-isWhite drop-shadow-md capitalize"
						>
							{index.parent}
						</div>
					</div>

					<img
						src={index.banner}
						alt={`${index.parent} banner`}
						layout={"fill"}
						className="z-10 w-full object-cover object-center rounded-md md:rounded-lg lg:rounded-xl h-[150px] md:h-[200px] lg:h-[250px]"
					/>

					{index.sections.map((section, key) => {
						return (
							<Link href={`${index.parent}/${index[section].path}`} key={key} passHref className="group">
								<div
									className="w-full rounded-md bg-isWhite transition duration-300 ease-in-out delay-50 group-hover:bg-isBlueLightEmphasis md:rounded-lg lg:rounded-xl
                                shadow-sm flex flex-col p-[15px] md:p-[20px] lg:p-[25px]"
								>
									<div className="text-lg font-bold leading-3 transition duration-300 ease-in-out group-hover:text-isWhite group-hover:text-is md:text-xl lg:text-2xl text-isGrayDarkEmphasis4 delay-50">
										{index[section].title}
									</div>
									<div
										className="mt-[2px] text-xs font-medium md:text-sm lg:text-md text-isGrayDark2
                                     group-hover:text-isWhite transition duration-300 ease-in-out delay-50"
									>
										100+ Shippers . 904 Likes . 5 min
									</div>
									<hr className="mt-[4px] w-full transition duration-300 ease-in-out delay-50 border-isGrayLightEmphasis4 group-hover:border-isWhite" />
									<div
										className="leading-5 text-sm font-medium md:text-md lg:text-lg mt-[10px] md:mt-[15px] lg:mt-[20px] text-isGrayDarkEmphasis
                                    group-hover:text-isWhite transition duration-300 ease-in-out delay-50"
									>
										Build-Time Syntax Highlighting: Zero Client-Side JS, Support for 100+ Languages
										and Any VSCode Theme
									</div>
									{/* <div className="flex flex-col w-full md:w-auto md:items-center md:flex-row">
										<div className="shadow-sm flex flex-row w-fit items-center group bg-isBlueDark group-hover:bg-isWhite delay-50 duration-300 ease-in-out py-[3px] md:py-[4px] lg:py-[5px] px-[7px] md:px-[8px] lg:px-[9px] rounded-md md:rounded-lg lg:rounded-xl">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="mr-[6px] w-4 h-4 md:h-5 md:w-5 lg:h-6 lg:w-6 fill-isWhite
                                            group-hover:fill-isBlueDark
                                            stroke-none delay-50 duration-300 ease-in-out"
											>
												<path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
											</svg>

											<div className="text-sm font-bold transition duration-300 ease-in-out delay-50 md:text-md lg:text-lg text-isWhite group-hover:text-isBlueDark ">
												100+ shippers
											</div>

											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 461.941 461.941"
												className="ml-[6px] w-4 h-4 md:h-5 md:w-5 lg:h-6 lg:w-6 fill-isWhite
                                            group-hover:fill-isBlueDark stroke-none delay-50 duration-300 ease-in-out"
											>
												<path
													d="M226.496,190.563c2.862-0.638,5.832-0.639,8.695-0.001l113.612,25.286l-10.658-67.5c-1.112-7.041-7.171-12.233-14.3-12.252
		l-31.675-0.085l-5.185-64.064c-0.609-7.523-6.882-13.325-14.43-13.345l-21.56-0.058l0.1-37.157
		c0.03-11.045-8.9-20.024-19.946-20.054c-0.019,0-0.036,0-0.055,0c-11.02,0-19.969,8.919-19.999,19.946l-0.1,37.157l-20.988-0.056
		c-7.548-0.021-13.852,5.747-14.501,13.268l-5.529,64.036l-31.26-0.084c-7.128-0.019-13.216,5.14-14.365,12.175l-11.116,68.028
		L226.496,190.563z"
												/>
												<path
													d="M110.416,375.186c17.402-12.674,38.307-19.514,60.277-19.514c21.969,0,42.875,6.841,60.277,19.514
		c17.402-12.674,38.307-19.514,60.277-19.514c21.969,0,42.872,6.84,60.275,19.512c7.392-5.388,15.418-9.711,23.883-12.916
		l27.664-76.601c1.417-3.924,1.077-8.268-0.932-11.924c-2.01-3.656-5.495-6.27-9.567-7.177l-161.721-35.994L69.365,266.558
		c-4.071,0.907-7.556,3.522-9.565,7.178c-2.009,3.656-2.348,7.999-0.931,11.922l27.675,76.632
		C95.007,365.49,103.029,369.806,110.416,375.186z"
												/>
												<path
													d="M456.083,413.984c-11.828-11.828-27.554-18.342-44.281-18.342s-32.453,6.514-44.281,18.342
		c-4.273,4.273-9.954,6.626-15.997,6.626c-6.043,0-11.724-2.353-15.996-6.626c-12.209-12.208-28.246-18.312-44.282-18.312
		c-16.036,0-32.072,6.104-44.28,18.312c-4.273,4.273-9.954,6.626-15.997,6.626c-6.043,0-11.724-2.353-15.996-6.626
		c-12.209-12.208-28.246-18.312-44.282-18.312c-16.036,0-32.072,6.104-44.28,18.312c-4.41,4.41-10.204,6.615-15.996,6.615
		c-5.794,0-11.586-2.205-15.997-6.615c-12.208-12.208-28.245-18.312-44.281-18.312c-16.036,0-32.072,6.104-44.28,18.312
		c-7.811,7.811-7.811,20.474,0,28.284c7.81,7.81,20.473,7.811,28.284,0c4.41-4.41,10.203-6.615,15.997-6.615
		s11.586,2.205,15.997,6.616c12.208,12.208,28.244,18.312,44.28,18.312s32.073-6.104,44.281-18.312
		c4.41-4.411,10.204-6.616,15.997-6.616s11.586,2.205,15.996,6.616c11.827,11.827,27.554,18.341,44.28,18.341c0,0,0,0,0,0h0
		c16.727,0,32.453-6.514,44.281-18.342c4.41-4.41,10.204-6.615,15.997-6.615s11.586,2.205,15.996,6.616
		c11.827,11.827,27.554,18.341,44.28,18.341h0h0c16.727,0,32.453-6.514,44.281-18.342c4.273-4.272,9.954-6.626,15.997-6.626
		c6.043,0,11.724,2.354,15.997,6.626c7.811,7.81,20.473,7.811,28.284,0C463.894,434.458,463.894,421.794,456.083,413.984z"
												/>
											</svg>
										</div>

										<div
											className="md:ml-[12px] mt-[6px] md:mt-[0px] font-semibold text-md md:text-lg lg:text-xl text-isGrayDarkEmphasis2
                                        transition duration-300 ease-in-out delay-50
                                    group-hover:text-isWhite"
										>
											{index[section].title}
										</div>
									</div>

									<div className="md:flex shadow-sm hidden flex-row w-fit items-center group bg-isGreenDark group-hover:bg-isWhite delay-50 duration-300 ease-in-out py-[3px] md:py-[4px] lg:py-[5px] px-[7px] md:px-[8px] lg:px-[9px] rounded-md md:rounded-lg lg:rounded-xl">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											className="mr-[6px] w-4 h-4 md:h-5 md:w-5 lg:h-6 lg:w-6 fill-isWhite
                                            group-hover:fill-isGreenDark stroke-none delay-50 duration-300 ease-in-out"
										>
											<path
												fillRule="evenodd"
												d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
												clipRule="evenodd"
											/>
										</svg>

										<div className="text-sm font-bold transition duration-300 ease-in-out delay-50 md:text-md lg:text-lg text-isWhite group-hover:text-isGreenDark ">
											{index[section].takes} min.
										</div>
									</div> */}
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Ship;
