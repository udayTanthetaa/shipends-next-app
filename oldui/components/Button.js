import { motion } from "framer-motion";
import { cx, cva } from "class-variance-authority";
import { intents, sizes, fonts, shadows, animates, ws, ps, motions } from "../base";

export const Button = ({ onClick, cta, disabled, loading, props }) => {
	const classes = cva(
		"flex flex-col items-center justify-center place-content-center outline-none focus:outline-none",
		{
			variants: {
				intent: {
					...intents.props.button,
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
				animate: {
					...animates.props.primary,
				},
				w: {
					...ws.props,
				},
				p: {
					...ps.props.primary,
				},
			},
			defaultVariants: {
				intent: "primary",
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
				...motions.whileTap1,
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
