import { MDXRemote } from "next-mdx-remote";
import MDXComponents from "./MDXComponents";

const Content = ({ frontmatter, source }) => {
	return (
		<>
			<div className="w-full px-3 py-1 text-lg font-bold text-center md:text-xl rounded-t-xl bg-isBlueDark text-isWhite">
				{frontmatter.title}&nbsp;&nbsp;
				<span className="px-2 font-bold rounded-md bg-isWhite text-isBlueDark">
					--takes {frontmatter.takes} min.
				</span>
			</div>

			<div className="flex flex-col items-start w-full place-content-center">
				<div className="flex flex-col w-full rounded-b-xl bg-isWhite text-isGrayDarkEmphasis3 ">
					<div className="px-3 text-sm break-words md:text-md md:px-9 md:py-3">
						<MDXRemote components={MDXComponents} {...source} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Content;
