import Link from "next/link";
import { motion } from "framer-motion";
import { Button, Hr, Paragraph } from "ui";
import Image from "next/image";
import { useState } from "react";

export const ShipCard = ({ ship }) => {
	const [loading, setLoading] = useState(true);

	const LoadingImage = () => {
		return (
			<>
				<div
					className={`w-full h-full shadow-sm rounded-t-lg md:rounded-t-xl lg:rounded-t-2xl bg-isWhite p-[12px]
					${loading ? "block" : "hidden"}`}
				>
					<div className="w-full h-full rounded-lg bg-isGrayLightEmphasis5 md:rounded-xl lg:rounded-2xl animate-pulse"></div>
				</div>
			</>
		);
	};

	return (
		<>
			<div className="flex flex-col shadow-sm bg-isWhite rounded-xl shadow-isGrayLightEmphasis3">
				<div className="relative flex flex-col w-full h-28 ">
					<div className="absolute w-full h-full">
						<LoadingImage />
						<Image
							src={ship.banner}
							alt={`${ship.name} banner`}
							layout={"fill"}
							className={`object-cover object-center rounded-t-xl shadow-sm`}
						/>
					</div>
				</div>

				<div className="flex flex-row items-center px-3 py-2">
					<div className="flex flex-col w-6 h-6">
						<div className="relative w-full h-full">
							<Image
								src={ship.logo}
								alt={`${ship.name} logo`}
								layout={"fill"}
								className="object-cover object-center rounded-lg shadow-sm shadow-isGrayLightEmphasis3"
							/>
						</div>
					</div>

					<div className="ml-2 text-lg font-bold md:text-xl text-isGrayDarkEmphasis3">{ship.name}</div>
				</div>

				<Hr />

				<Paragraph
					content={ship.description}
					props={{
						className: "px-3 py-2",
					}}
				/>

				<Link href={`/learn/${ship.path}`} className="flex flex-col items-end pb-3 pr-3 mt-auto" passHref>
					<Button
						cta={ship.status === "active" ? "Let's Ship!" : "Coming Soon."}
						disabled={ship.status === "active" ? false : true}
						props={{
							intent: ship.status === "active" ? "primary" : "light",
							disabled: ship.status === "active" ? "false" : "true",
							w: "none",
							className: "w-[130px]",
						}}
					/>
				</Link>
			</div>
		</>
	);
};
