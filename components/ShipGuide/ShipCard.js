import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const ShipCard = ({ ship }) => {
	const [loading, setLoading] = useState(true);

	const LoadingImage = () => {
		return (
			<>
				<div
					className={`w-full h-full rounded-lg md:rounded-xl lg:rounded-2xl bg-isWhite p-[12px]
					${loading ? "block" : "hidden"}`}
				>
					<div className="w-full h-full rounded-lg bg-isGrayLightEmphasis5 md:rounded-xl lg:rounded-2xl animate-pulse"></div>
				</div>
			</>
		);
	};

	return (
		<>
			<Link
				href={`/learn/${ship.path}/content`}
				passHref
				className=" 
			w-full h-[140px] md:h-[170px] lg:h-[200px] group"
			>
				<div className="relative flex flex-col items-center w-full h-[140px] md:h-[170px] lg:h-[200px]">
					<div className="absolute flex flex-col w-full h-[140px] md:h-[170px] lg:h-[200px]">
						<div className="relative w-full h-full">
							<LoadingImage />

							<Image
								src={ship.banner}
								alt={`${ship.name} banner`}
								layout={"fill"}
								className={`object-cover object-center border-transparent rounded-lg md:rounded-xl lg:rounded-2xl`}
								onLoadingComplete={() => {
									setLoading(false);
								}}
							/>
						</div>
					</div>

					<div className="absolute w-full h-full transition duration-300 ease-in-out rounded-lg opacity-20 z-90 group-hover:opacity-0 delay-50 bg-isGrayDarkEmphasis6 md:rounded-xl lg:rounded-2xl"></div>

					<div className="absolute right-0 flex flex-col place-content-center px-[12px] py-[12px]">
						<div
							className="flex flex-row items-center rounded-md md:rounded-lg lg:rounded-xl bg-isWhite
							p-[2px] bg-opacity-90 group-hover:bg-opacity-95 backdrop-blur-sm
							delay-50 transition duration-300 ease-in-out"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className=" fill-isGreenDark mr-[2px]
								delay-50 transition duration-300 ease-in-out group-hover:fill-isGreenLight
									w-[18px] h-[18px] md:w-[20px] md:h-[20px] lg:w-[22px] lg:h-[22px]"
							>
								<path
									fillRule="evenodd"
									d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="mr-[2px] font-semibold delay-50 transition duration-300 ease-in-out text-isGrayDarkEmphasis3 group-hover:text-isGrayDarkEmphasis6">
								{ship.takes} min.
							</div>
						</div>
					</div>

					<div className="absolute bottom-0 flex flex-row items-center w-full transition duration-300 ease-in-out place-content-end delay-50 text-isGrayDarkEmphasis3 group-hover:text-isGrayDarkEmphasis6">
						<div
							className="flex flex-col w-full h-full bg-isWhite 
							delay-50 transition duration-300 ease-in-out bg-opacity-90 group-hover:bg-opacity-95
							mb-[12px] py-[4px] px-[12px] backdrop-blur-sm items-center
							"
						>
							<div className="w-full text-sm font-semibold leading-3 tracking-tight text-center md:text-md lg:text-lg">
								{ship.name}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default ShipCard;
