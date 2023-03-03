import { cva } from "class-variance-authority";
import { cx } from "class-variance-authority";
import { getIcon } from "ui/icons";

export const IconInput = ({ onChange, value, type, placeholder, iconName, inputProps, iconProps }) => {
	const inputClasses = cva("flex flex-col items-center place-content-center outline-none focus:outline-none", {
		variants: {
			input: {
				white: "bg-isWhite placeholder-isGrayDarkEmphasis text-isGrayDarkEmphasis3",
				light: "bg-isGrayLightEmphasis6 placeholder-isGrayDarkEmphasis text-isGrayDarkEmphasis3",
				gray: "bg-isGrayDark placeholder-isGrayLightEmphasis6 text-isWhite",
				dark: "bg-isGrayDarkEmphasis3 placeholder-isGrayLightEmphasis6 text-isWhite",
				night: "bg-isGrayDarkEmphasis6 placeholder-isGrayLightEmphasis6 text-isWhite",
				black: "bg-isBlack placeholder-isGrayLightEmphasis6 text-isWhite",
				primary: "bg-isBlueDark placeholder-isGrayLightEmphasis6 text-isWhite",
				secondary: "bg-isPurpleDark placeholder-isGrayLightEmphasis6 text-isWhite",
				tertiary: "bg-isMintDark placeholder-isGrayLightEmphasis6 text-isWhite",
				info: "bg-isCyanDark placeholder-isGrayLightEmphasis6 text-isWhite",
				error: "bg-isRedDark placeholder-isGrayLightEmphasis6 text-isWhite",
				warning: "bg-isOrangeDark placeholder-isGrayLightEmphasis6 text-isWhite",
				success: "bg-isGreenDark placeholder-isGrayLightEmphasis6 text-isWhite",
				none: "",
			},
			size: {
				xs: "text-xs rounded-lg",
				sm: "text-sm md:text-md rounded-lg",
				md: "text-md md:text-lg rounded-xl",
				lg: "text-lg rounded-xl",
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
			p: {
				sm: "py-1 px-4",
				none: "",
			},
			w: {
				fit: "w-fit",
				full: "w-full",
				none: "",
			},
			h: {
				fit: "h-fit",
				full: "h-full",
				none: "",
			},
		},
		defaultVariants: {
			intent: "white",
			size: "md",
			font: "normal",
			shadow: "sm",
			w: "full",
			h: "full",
			p: "sm",
		},
	});

	const iconClasses = cva("flex flex-col items-center place-content-center", {
		variants: {
			intent: {
				white: "bg-isWhite",
				light: "bg-isGrayLightEmphasis6",
				gray: "bg-isGrayDark",
				dark: "bg-isGrayDarkEmphasis3",
				night: "bg-isGrayDarkEmphasis6",
				black: "bg-isBlack",
				primary: "bg-isBlueDark",
				secondary: "bg-isPurpleDark",
				tertiary: "bg-isMintDark",
				info: "bg-isCyanDark",
				error: "bg-isRedDark",
				warning: "bg-isOrangeDark",
				success: "bg-isGreenDark",
				none: "",
			},
			size: {
				md: "w-11 h-9 rounded-xl",
				none: "",
			},
			p: {
				sm: "p-1",
				none: "",
			},
			shadow: {
				sm: "shadow-sm shadow-isGrayLightEmphasis3",
				md: "shadow-md shadow-isGrayLightEmphasis3",
				lg: "shadow-lg shadow-isGrayLightEmphasis3",
				xl: "shadow-xl shadow-isGrayLightEmphasis3",
				none: "",
			},
		},
		defaultVariants: {
			intent: "primary",
			size: "md",
			p: "sm",
			shadow: "sm",
		},
	});

	return (
		<>
			<div className="flex flex-row items-center w-full h-9">
				<div className={cx(iconClasses({ ...iconProps }))}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-isWhite">
						{getIcon[iconName]}
					</svg>
				</div>

				<input
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					type={type}
					className={cx(inputClasses({ ...inputProps }), "ml-2")}
				/>
			</div>
		</>
	);
};
