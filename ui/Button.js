import { motion } from "framer-motion";
import { cx, cva } from "class-variance-authority";

export const Button = ({ onClick, cta, disabled, loading, props }) => {
	const classes = cva(
		"flex flex-col text-center items-center outline-none focus:outline-none",
		{
			variants: {
				intent: {
					white: "bg-isWhite hover:bg-isGrayLightEmphasis6 text-isGrayDarkEmphasis3",
					light: "bg-isGrayLightEmphasis6 hover:bg-isGrayLightEmphasis5 text-isGrayDarkEmphasis2",
					gray: "bg-isGrayDark hover:bg-isGrayDarkEmphasis text-isWhite ",
					dark: "bg-isGrayDarkEmphasis3 hover:bg-isGrayDarkEmphasis6 text-isWhite",
					primary:
						"bg-isBlueDark hover:bg-isBlueDarkEmphasis text-isWhite",
					secondary:
						"bg-isPurpleDark hover:bg-isPurpleDarkEmphasis text-isWhite",
					tertiary:
						"bg-isMintDark hover:bg-isMintDarkEmphasis text-isWhite",
					info: "bg-isCyanDark hover:bg-isCyanDarkEmphasis text-isWhite",
					error: "bg-isRedDark hover:bg-isRedDarkEmphasis text-isWhite",
					warning:
						"bg-isOrangeDark hover:bg-isOrangeDarkEmphasis text-isWhite",
					success:
						"bg-isGreenDark hover:bg-isGreenDarkEmphasis text-isWhite",
					none: "",
				},
				size: {
					xs: "text-xs rounded-lg",
					sm: "text-sm md:text-md rounded-lg",
					md: "text-md rounded-lg",
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
					sm: "shadow-sm",
					md: "shadow-md",
					lg: "shadow-lg",
					xl: "shadow-xl",
					none: "",
				},
				animate: {
					xs: "transition ease-in-out duration-100",
					sm: "transition ease-in-out duration-200",
					md: "transition ease-in-out duration-300",
					none: "",
				},
				w: {
					fit: "w-fit",
					full: "w-full",
					none: "",
				},
				p: {
					sm: "py-1 px-4",
					none: "",
				},
			},
			defaultVariants: {
				intent: "light",
				size: "sm",
				font: "bold",
				shadow: "sm",
				animate: "md",
				w: "fit",
				p: "sm",
			},
		}
	);

	return (
		<motion.button
			whileTap={{
				scale: 0.9,
				transition: { duration: 0.03 },
			}}
			onClick={onClick}
			disabled={disabled}
			loading={loading}
			className={cx(classes({ ...props }))}
		>
			{cta}
		</motion.button>
	);
};
