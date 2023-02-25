import { tailwind } from "../utilities";

export const ps = new tailwind({
	props: {
		primary: {
			sm: "px-3 py-1",
			md: "px-4 py-2",
			lg: "px-5 py-3",
			xl: "px-6 py-4",
			none: "",
		},
	},
});
