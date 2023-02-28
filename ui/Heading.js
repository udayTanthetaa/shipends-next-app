import { cx, cva } from "class-variance-authority";

export const Heading = ({ cta, props }) => {
	const classes = cva(
		"flex flex-col text-center items-center justify-center place-content-center tracking-tight mx-auto",
		{
			variants: {
				intent: {
					white: "text-isWhite",
					light: "text-isGrayLightEmphasis6",
					gray: "text-isGrayDark",
					dark: "text-isGrayDarkEmphasis3",
					night: "text-isGrayDarkEmphasis6",
					black: "text-isBlack",
					primary: "text-isBlueDark",
					secondary: "text-isPurpleDark",
					tertiary: "text-isMintDark",
					info: "text-isCyanDark",
					error: "text-isRedDark",
					warning: "text-isOrangeDark",
					success: "text-isGreenDark",
					none: "",
				},
				size: {
					xs: "text-xs",
					sm: "text-sm md:text-md ",
					md: "text-md md:text-lg",
					lg: "text-lg md:text-xl",
					xl: "text-xl md:text-2xl",
					"2xl": "text-2xl md:text-3xl",
					"3xl": "text-3xl md:text-4xl",
					"4xl": "text-4xl md:text-5xl",
					"5xl": "text-5xl md:text-6xl",
					none: "",
				},
				font: {
					ultralight: "font-ultralight",
					extralight: "font-extralight",
					light: "font-light",
					normal: "font-normal",
					medium: "font-medium",
					semibold: "font-semibold",
					bold: "font-bold",
					extrabold: "font-extrabold",
					black: "font-black",
					none: "",
				},
				w: {
					fit: "w-fit",
					full: "w-full",
					none: "",
				},
			},
			defaultVariants: {
				intent: "night",
				size: "3xl",
				font: "bold",
				w: "full",
			},
		}
	);

	return <div className={cx(classes({ ...props }))}>{cta}</div>;
};
