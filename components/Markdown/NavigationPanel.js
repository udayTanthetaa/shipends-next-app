import { useRouter } from "next/router";
import Link from "next/link";

const NavigationPanel = ({ frontmatter, index }) => {
	const Router = useRouter();

	const nextIndex = index[frontmatter.section.toString()].nextIndex;
	const prevIndex = index[frontmatter.section.toString()].prevIndex;

	const nextSection = index[index[frontmatter.section.toString()].nextIndex].path;
	const prevSection = index[index[frontmatter.section.toString()].prevIndex].path;

	return (
		<>
			<div
				className="z-50 flex flex-col w-full place-content-center items-center sticky bottom-0
				  text-center py-[8px] px-[12px] 
				 "
			>
				<div
					className="flex flex-row w-full max-w-[1182px] justify-between 
			 	rounded-md md:rounded-lg lg:rounded-xl shadow-md
				bg-isWhite bg-opacity-50 backdrop-blur-md p-[12px]"
				>
					{prevIndex === "-1" ? (
						<div></div>
					) : (
						<Link
							href={{
								pathname: "/learn/[ship]/[sail]",
								query: {
									ship: index.parent,
									sail: prevSection,
								},
							}}
							target="_self"
							rel="noopener noreferrer"
						>
							<div
								className="px-[10px] md:px-[13px] lg:px-[16px] rounded-lg text-lg md:text-xl lg:text-2xl
                                    delay-50 transition duration-300 ease-in-out tracking-tight font-bold
									bg-isBlueDark text-isGrayLightEmphasis6 
									hover:bg-isBlueDarkEmphasis hover:text-isWhite flex flex-row items-center
									"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="mr-[6px] md:mr-[9px] lg:mr-[12px] fill-isGrayLightEmphasis6 
									stroke-[1px] md:stroke-[1.5px] lg:stroke-[2px] stroke-isGrayLightEmphasis6
									w-[20px] h-[20px] md:w-[22px] md:h-[22px] lg:w-[24px] lg:h-[24px]"
								>
									<title>Prev</title>
									<path d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" />
								</svg>
								Prev
							</div>
						</Link>
					)}

					{nextIndex === "-1" ? (
						<div></div>
					) : (
						<Link
							href={{
								pathname: "/learn/[ship]/[sail]",
								query: {
									ship: index.parent,
									sail: nextSection,
								},
							}}
							target="_self"
							rel="noopener noreferrer"
						>
							<div
								className="px-[10px] lg:px-[16px] rounded-lg text-lg md:text-xl lg:text-2xl
                                    delay-50 transition duration-300 ease-in-out tracking-tight font-bold
									bg-isBlueDark text-isGrayLightEmphasis6 
									hover:bg-isBlueDarkEmphasis hover:text-isWhite flex flex-row items-center
									
									"
							>
								Next
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="ml-[6px] md:ml-[9px] lg:ml-[12px] fill-isGrayLightEmphasis6 
									stroke-[1px] md:stroke-[1.5px] lg:stroke-[2px] stroke-isGrayLightEmphasis6
									w-[20px] h-[20px] md:w-[22px] md:h-[22px] lg:w-[24px] lg:h-[24px]"
								>
									<title>Next</title>
									<path d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" />
								</svg>
							</div>
						</Link>
					)}
				</div>
			</div>
		</>
	);
};

export default NavigationPanel;
