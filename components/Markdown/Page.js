import NavigationPanel from "./NavigationPanel";
import SectionPanel from "./SectionPanel";
import Content from "./Content";
import { motion } from "framer-motion";
import { InvisibleNavbar } from "ui";

const Page = ({ frontmatter, source, index }) => {
	const container = {
		hidden: { opacity: 1, scale: 0 },

		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.2,
				staggerChildren: 0.2,
			},
		},
	};

	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	return (
		<>
			<div className="flex flex-col items-center w-full min-h-screen p-3 bg-isGrayLightEmphasis6 place-content-start ">
				<InvisibleNavbar />

				<div className="flex flex-col w-full h-full max-w-6xl shadow-sm shadow-isGrayLightEmphasis3 rounded-xl">
					{/* <SectionPanel index={index} /> */}
					<Content className="" frontmatter={frontmatter} source={source} />
				</div>
			</div>

			{/* <NavigationPanel frontmatter={frontmatter} index={index} /> */}
		</>
	);
};

export default Page;
