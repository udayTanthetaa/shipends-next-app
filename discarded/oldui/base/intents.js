import { tailwind } from "../utilities";

export const intents = new tailwind({
	props: {
		button: {
			white: "bg-isWhite hover:bg-isGrayLightEmphasis6 text-isGrayDarkEmphasis3",
			light: "bg-isGrayLightEmphasis6 hover:bg-isGrayLightEmphasis5 text-isGrayDarkEmphasis3",
			gray: "bg-isGrayDark hover:bg-isGrayDarkEmphasis text-isWhite",
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
		typography: {
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
		links: {
			white: "text-isWhite hover:text-isGrayLightEmphasis6",
			light: "text-isGrayLightEmphasis6 hover:text-isWhite",
			gray: "text-isGrayDark hover:text-isGrayDarkEmphasis3",
			dark: "text-isGrayDarkEmphasis3 hover:text-isGrayDarkEmphasis6",
			night: "text-isGrayDarkEmphasis6 hover:text-isBlack",
			black: "text-isBlack hover:text-isGrayDarkEmphasis3",
			primary: "text-isBlueDark hover:text-isBlueDarkEmphasis",
			secondary: "text-isPurpleDark hover:text-isPurpleDarkEmphasis",
			tertiary: "text-isMintDark hover:text-isMintDarkEmphasis",
			info: "text-isCyanDark hover:text-isCyanDarkEmphasis",
			error: "text-isRedDark hover:text-isRedDarkEmphasis",
			warning: "text-isOrangeDark hover:text-isOrangeDarkEmphasis",
			success: "text-isGreenDark hover:text-isGreenDarkEmphasis",
			none: "",
		},
	},
});
