import { cx, cva } from "class-variance-authority";

export const RelativeNotification = ({ text, props }) => {
	const classes = cva("absolute flex flex-col items-center w-full text-center", {
		variants: {
			intent: {
				white: "bg-isWhite hover:bg-isGrayLightEmphasis6 text-isGrayDarkEmphasis3",
				light: "bg-isGrayLightEmphasis6 hover:bg-isGrayLightEmphasis5 text-isGrayDarkEmphasis2",
				gray: "bg-isGrayDark hover:bg-isGrayDarkEmphasis text-isWhite ",
				dark: "bg-isGrayDarkEmphasis3 hover:bg-isGrayDarkEmphasis6 text-isWhite",
				primary: "bg-isBlueDark hover:bg-isBlueDarkEmphasis text-isWhite",
				secondary: "bg-isPurpleDark hover:bg-isPurpleDarkEmphasis text-isWhite",
				tertiary: "bg-isMintDark hover:bg-isMintDarkEmphasis text-isWhite",
				info: "bg-isCyanDark hover:bg-isCyanDarkEmphasis text-isWhite",
				error: "bg-isRedDark hover:bg-isRedDarkEmphasis text-isWhite",
				warning: "bg-isOrangeDark hover:bg-isOrangeDarkEmphasis text-isWhite",
				success: "bg-isGreenDark hover:bg-isGreenDarkEmphasis text-isWhite",
				none: "",
			},
			size: {
				xs: "text-xs rounded-lg",
				sm: "text-sm md:text-md rounded-lg",
				md: "text-md md:text-lg rounded-lg",
				lg: "text-lg md:text-xl rounded-xl",
				xl: "text-xl rounded-2xl",
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

			shadow: {
				sm: "shadow-sm shadow-isGrayLightEmphasis3",
				md: "shadow-md shadow-isGrayLightEmphasis3",
				lg: "shadow-lg shadow-isGrayLightEmphasis3",
				xl: "shadow-xl shadow-isGrayLightEmphasis3",
				none: "",
			},
			animate: {
				xs: "transition ease-in-out duration-100",
				sm: "transition ease-in-out duration-200",
				md: "transition ease-in-out duration-300",
				none: "",
			},
			maxw: {
				sm: "max-w-sm",
				none: "",
			},
			p: {
				sm: "py-1 px-4",
				none: "",
			},
		},
		defaultVariants: {
			intent: "error",
			size: "lg",
			font: "bold",
			maxw: "sm",
			shadow: "sm",
			animate: "md",
			w: "fit",
			p: "sm",
		},
	});

	return (
		<div
			className={`relative flex-col items-center w-full
            ${text === "" ? "hidden" : "flex"} transition duration-300 ease-in-out
            `}
		>
			<div className={cx(classes({ ...props }))}>{text}</div>
		</div>
	);
};
