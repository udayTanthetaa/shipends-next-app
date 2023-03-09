import { tailwind } from "../utilities";

export const shadows = new tailwind({
	props: {
		dropShadows: {
			sm: "drop-shadow-sm",
			md: "drop-shadow-md",
			lg: "drop-shadow-lg",
			xl: "drop-shadow-xl",
			none: "",
		},
	},
});
