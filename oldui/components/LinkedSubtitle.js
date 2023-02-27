import { motion } from "framer-motion";
import { cx, cva } from "class-variance-authority";
import {
	intents,
	sizes,
	fonts,
	shadows,
	animates,
	ws,
	ps,
	motions,
	maxws,
} from "oldui/base";
import Link from "next/link";

export const LinkedSubtitle = ({ cta, linkText, href, props }) => {
	const classes = cva("flex flex-row items-center place-content-center", {
		variants: {
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
			p: {
				...ps.props.primary,
			},
		},
		defaultVariants: {
			size: "md",
			font: "bold",
			shadow: "none",
			w: "full",
			p: "none",
		},
	});

	const ctaClasses = cva("", {
		variants: {
			intent: {
				...intents.props.typography,
			},
		},
		defaultVariants: {
			intent: "error",
		},
	});

	const linkClasses = cva("hover:cursor-pointer", {
		variants: {
			link: {
				...intents.props.links,
			},
			animate: {
				...animates.props.primary,
			},
		},
		defaultVariants: {
			link: "primary",
			animate: "xs",
		},
	});

	return (
		<div className={cx(classes({ ...props }))}>
			<span className={cx(ctaClasses({ ...props }))}>{cta}</span>

			<span className={cx(linkClasses({ ...props }), "ml-1")}>
				<Link href={href}>{linkText}</Link>
			</span>
		</div>
	);
};
