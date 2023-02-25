import { tailwind } from "../utilities";

export const animates = new tailwind({
	props: {
		primary: {
			xs: "transition ease-in-out duration-100",
			sm: "transition ease-in-out duration-200",
			md: "transition ease-in-out duration-300",
			none: "",
		},
	},
});
