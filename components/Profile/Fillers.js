import Link from "next/link";

export const Welcome = () => {
	return (
		<div className="mt-[6px] text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl text-isGrayDarkEmphasis6">
			Welcome to Shipends!
		</div>
	);
};

export const EmptyDiv = () => {
	return <div className="mt-[6px] md:[12px] lg:mt-[16px]" />;
};

export const Subtitle = ({ headline, cta, path }) => {
	return (
		<div className="mt-[4px] text-xs font-medium  sm:text-sm md:text-md lg:text-lg text-isGrayLightEmphasis">
			{headline}&nbsp;
			<Link
				href={{
					pathname: `/profile/${path}`,
				}}
				className="text-isBlueDark"
			>
				{cta}
			</Link>
		</div>
	);
};
