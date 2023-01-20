import styled from "@emotion/styled";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import Link from "next/link";

const Header = () => {
	const cssConfig = resolveConfig(tailwindConfig);

	const Neon = styled.span`
		text-shadow: 0 0 5px ${cssConfig.theme.colors.bianca};
	`;

	return (
		<>
			{/* TAGLINE */}
			<div className="flex flex-col -space-y-4 p-3 text-[40px] font-black drop-shadow-lg md:-space-y-10 md:text-[80px]">
				<div className="text-transparent bg-gradient-to-r from-golden to-magenta bg-clip-text">
					Build Cool Products
				</div>
				<div>
					{/* <span className="italic text-grey">@</span>&nbsp; */}
					<Neon>
						<span className="mt-5 italic text-transparent bg-gradient-to-br from-bianca to-white bg-clip-text">
							without reading docs
						</span>
					</Neon>
				</div>
			</div>
			{/* TAGLINE */}

			{/* DESCRIPTION */}
			<div className="mt-2 max-w-xl p-3 text-[25px] font-bold leading-[30px] text-grey md:mt-3 md:max-w-4xl md:text-[40px] md:leading-[50px]">
				{/* We simplify Web3 docs that you can explain your mum + ship with
				her together. */}
				We go through Web3 docs, simplify them and create notes, so you can start building <br />{" "}
				<span className="italic text-amour">-- within 5 min.</span>
			</div>
			{/* DESCRIPTION */}

			{/* GET STARTED */}
			<Link href="/learn">
				<div className="px-3 py-1 mt-4 rounded-xl bg-gradient-to-r from-golden to-magenta md:mt-6 md:py-2 md:px-4">
					<div className="text-2xl font-extrabold text-transparent bg-gradient-to-br from-bianca to-white bg-clip-text md:text-4xl">
						{/* Get Started */}
						Lesgoo!
					</div>
				</div>
			</Link>
			{/* GET STARTED */}
		</>
	);
};

export default Header;
