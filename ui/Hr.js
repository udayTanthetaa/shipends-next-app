import { cx, cva } from "class-variance-authority";

export const Hr = ({ props }) => {
	const classes = cva("w-full", {
		variants: {
			intent: {
				white: "border-isWhite",
				light: "border-isGrayLightEmphasis6",
				subtle: "border-isGrayLightEmphasis5",
				gray: "border-isGrayDark",
				dark: "border-isGrayDarkEmphasis3",
				primary: "border-isBlueDark",
				secondary: "border-isPurpleDark",
				tertiary: "border-isMintDark",
				info: "border-isCyanDark",
				error: "border-isRedDark",
				warning: "border-isOrangeDark",
				success: "border-isGreenDark",
				none: "",
			},
			size: {
				sm: "border-t-2",
				md: "border-t-4",
				lg: "border-t-6",
			},
		},
		defaultVariants: {
			intent: "subtle",
			size: "md",
		},
	});

	return <hr className={cx(classes({ ...props }))} />;
};
