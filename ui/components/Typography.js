import { motion } from "framer-motion";
import { cx, cva } from "class-variance-authority";
import { intents, sizes, fonts, shadows, animates, ws, ps, motions, maxws } from "ui/base";

export const Typography = ({ cta, props }) => {
	const classes = cva(
		"flex flex-col text-center items-center justify-center place-content-center tracking-tight mx-auto",
		{
			variants: {
				intent: {
					...intents.props.typography,
				},
				size: {
					...sizes.props.typography,
				},
				font: {
					...fonts.props,
				},
				shadow: {
					...shadows.props.dropShadows,
				},
				w: {
					...ws.props,
				},
				maxw: {
					...maxws.props,
				},
				p: {
					...ps.props.primary,
				},
			},
			defaultVariants: {
				intent: "night",
				size: "4xl",
				font: "bold",
				shadow: "none",
				animate: "primary",
				w: "full",
				max: "5xl",
				p: "none",
			},
		}
	);

	return <div className={cx(classes({ ...props }))}>{cta}</div>;
};
