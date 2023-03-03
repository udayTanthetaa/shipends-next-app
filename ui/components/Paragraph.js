import { cx, cva } from "class-variance-authority";

export const Paragraph = ({ content, props }) => {
	const classes = cva("", {
		variants: {
			intent: {
				white: "text-isWhite",
				light: "text-isGrayLightEmphasis6",
				subtle: "text-isGrayLightEmphasis",
				gray: "text-isGrayDark",
				dark: "text-isGrayDarkEmphasis3",
				primary: "text-isBlueDark ",
				secondary: "text-isPurpleDark",
				tertiary: "text-isMintDark",
				info: "text-isCyanDark",
				error: "text-isRedDark",
				warning: "text-isOrangeDark",
				success: "text-isGreenDark",
				none: "",
			},
			size: {
				xs: "text-xs md:text-sm",
				sm: "text-sm md:text-md",
				md: "text-md md:text-lg",
				lg: "text-lg md:text-xl",
				xl: "text-xl md:text-2xl",
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
			intent: "subtle",
			size: "sm",
			font: "medium",
			w: "full",
		},
	});

	return <div className={cx(classes({ ...props }))}>{content}</div>;
};
