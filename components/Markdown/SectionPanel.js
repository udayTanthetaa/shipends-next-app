import { useRouter } from "next/router";
import Link from "next/link";
import { Constants } from "../Git/Constants";

const SectionPanel = ({ index }) => {
	const Router = useRouter();

	return (
		<>
			<div className="flex flex-col w-full mb-[12px] place-content-center items-center">
				<div
					className="flex flex-row bg-isGreySubtle border-[1px] border-isGrayLightEmphasis4 bg-isWhite
					            rounded-lg md:rounded-xl lg:rounded-2xl py-[6px] px-[6px] w-full max-w-[1208px] justify-between"
				>
					<div className="relative inline-block text-left">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="inline-flex w-6 h-6 md:h-7 md:w-7 lg:h-8 lg:w-8 fill-isGreenDark stroke-none hover:fill-isGreenDarkEmphasis "
							>
								<title>View Contents</title>
								<path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
							</svg>
						</div>

						<div
							className={`hidden focus-within:flex  absolute left-0 z-10 w-[200px] bg-isGrayLight6 mt-[12px] 
								rounded-lg md:rounded-xl lg:rounded-2xl drop-shadow-md  flex-col
								
								`}
						>
							<div className="flex flex-col my-[8px] font-medium w-full">
								{index.sections.map((section, sectionIndex) => {
									return (
										<div key={sectionIndex} className="grid content-center grid-cols-8">
											{sectionIndex === 0 ? (
												<></>
											) : (
												<div className="col-span-8 border-t-[1px] border-isGrayLightEmphasis4 w-full" />
											)}

											<Link
												className="col-span-8"
												href={{
													pathname: "/learn/[ship]/[sail]",
													query: {
														ship: index.parent,
														sail: index[section].path,
													},
												}}
											>
												<div
													className={`delay-50 cursor-pointer truncate 
								 px-[12px] transition duration-200 ease-in-out text-xs md:text-md lg:text-md py-[2px]
								${
									index[section].path === Router.query.sail
										? "bg-isGreenDark text-isWhite"
										: "text-isGrayDarkEmphasis4 hover:bg-isWhite hover:text-isBlack"
								}`}
												>
													{index[section].title}{" "}
												</div>
											</Link>
										</div>
									);
								})}
							</div>
						</div>
					</div>

					<Link
						href={`https://github.com/${Constants.owner}/${Constants.repo}/blob/main/${Router.query.ship}/${Router.query.sail}.md`}
						target="_blank"
						rel="noreferrer noopener"
						className="flex flex-col group"
					>
						<div className="flex flex-row items-center bg-isGrayDark2 group-hover:bg-isGrayDarkEmphasis6 delay-50 duration-300 ease-in-out py-[3px] md:py-[4px] lg:py-[5px] px-[7px] md:px-[8px] lg:px-[9px] rounded-md md:rounded-lg lg:rounded-xl">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className="mr-[6px] w-5 h-5 md:h-6 md:w-6 lg:h-7 lg:w-7 fill-isGrayLightEmphasis6 group-hover:fill-isWhite stroke-none delay-50 duration-300 ease-in-out"
							>
								<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
								<path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
							</svg>

							<div className="text-sm font-bold transition duration-300 ease-in-out delay-50 md:text-md lg:text-lg text-isGrayLightEmphasis6 group-hover:text-isWhite ">
								Edit on GitHub
							</div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="ml-[6px] w-5 h-5 md:h-6 md:w-6 lg:h-7 lg:w-7 fill-isGrayLightEmphasis6 group-hover:fill-isWhite stroke-none delay-50 duration-300 ease-in-out"
							>
								<title>Edit on GitHub</title>
								<path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"></path>
							</svg>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};

export default SectionPanel;
