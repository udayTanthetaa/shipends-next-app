import { cva } from "class-variance-authority";
import { cx } from "class-variance-authority";
import { motion } from "framer-motion";
import { intents, sizes, fonts, shadows, ws, ps } from "ui/base";

export const Input = ({ onChange, value, type, placeholder, props }) => {
	const classes = cva("flex flex-col items-center place-content-center outline-none focus:outline-none", {
		variants: {
			intent: {
				...intents.props.input,
			},
			size: {
				...sizes.props.button,
			},
			font: {
				...fonts.props,
			},
			shadow: {
				...shadows.props.dropShadows,
			},
			p: {
				...ps.props.primary,
			},
			w: {
				...ws.props,
			},
		},
		defaultVariants: {
			intent: "white",
			size: "md",
			font: "semibold",
			shadow: "sm",
			p: "md",
			w: "full",
		},
	});

	return (
		<input
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			type={type}
			className={cx(classes({ ...props }))}
		/>
	);
};
