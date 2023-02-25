import { tailwind } from "../utilities";

export const sizes = new tailwind({
	props: {
		button: {
			sm: "text-sm rounded-lg",
			md: "text-md rounded-lg",
			lg: "text-lg rounded-xl",
			xl: "text-xl rounded-2xl",
			none: "",
		},
		typography: {
			sm: "text-sm sm:text-md lg:text-lg",
			md: "text-md sm:text-lg lg:text-xl",
			lg: "text-lg sm:text-xl lg:text-2xl",
			xl: "text-xl sm:text-2xl lg:text-3xl",
			"2xl": "text-2xl sm:text-3xl lg:text-4xl",
			"3xl": "text-3xl sm:text-4xl lg:text-5xl",
			"4xl": "text-4xl sm:text-5xl lg:text-6xl",
		},
	},
});
