import NavigationPanel from "./NavigationPanel";
import SectionPanel from "./SectionPanel";
import Content from "./Content";
import { motion } from "framer-motion";

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
			<div className="flex flex-col items-center w-full min-h-screen bg-isGrayLightEmphasis6 place-content-start p-3 ">
				<div className="w-full h-full max-w-6xl flex flex-col  mt-[62px] md:mt-[64px] lg:mt-[70px] ">
					{/* <SectionPanel index={index} /> */}
					<Content
						className=""
						frontmatter={frontmatter}
						source={source}
					/>
				</div>
			</div>

			{/* <NavigationPanel frontmatter={frontmatter} index={index} /> */}
		</>
	);
};

export default Page;
