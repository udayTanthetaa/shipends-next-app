// Definitions -- https://mdxjs.com/table-of-components/

import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const MDXComponents = {
	h1: (props) => {
		return <></>;
	},
	h2: (props) => {
		return (
			<h2
				className="my-2 text-lg font-semibold border-b-2 md:text-xl text-isGrayDarkEmphasis5 border-isGrayLightEmphasis5"
				{...props}
			/>
		);
	},
	h3: (props) => {
		return (
			<h3
				className="flex flex-col items-center mt-[8px] md:mt-[12px] lg:mt-[16px] mb-[8px] md:mb-[12px] lg:mb-[16px]
				text-md md:text-lg lg:text-xl
				font-bold text-center"
				{...props}
			/>
		);
	},
	p: (props) => {
		return <div className="mb-2" {...props} />;
	},
	em: (props) => {
		return <span className="italic" {...props} />;
	},
	strong: (props) => {
		return <span className="font-semibold" {...props} />;
	},
	a: (props) => {
		const GetRouter = () => {
			const Router = useRouter();
			return Router;
		};

		const Router = GetRouter();

		if (props.href.slice(0, 2) === "./") {
			return (
				<Link
					className="inline-block transition duration-300 ease-in-out text-isBlueDark hover:cursor-pointer hover:border-b-2 hover:border-isBlueDark"
					href={{
						pathname: "/learn/[ship]/[sail]",
						query: {
							ship: Router.query.ship,
							sail: props.href.slice(2, -3),
						},
					}}
				>
					{props.children}
				</Link>
			);
		} else if (props.href.charAt(0) === "#") {
			return (
				<div className="flex flex-row group">
					<Link target="_self" rel="noopener noreferrer" passHref {...props} />
					&nbsp;
					<div className="hidden font-bold text-isGrayDark2 group-hover:block">#</div>
				</div>
			);
		} else {
			return (
				<Link
					className="text-isBlueDarkEmphasis hover:cursor-pointer hover:border-b-[2px] hover:border-isBlueDarkEmphasis"
					target="_blank"
					rel="noopener noreferrer"
					passHref
					{...props}
				/>
			);
		}
	},
	blockquote: (props) => {
		return (
			<blockquote className="px-2 py-1 my-2 mb-2 leading-tight tracking-wide border-l-4 rounded-r-lg border-isGrayLightEmphasis4 bg-isGrayLightEmphasis6">
				<div className="mt-2 ml-2 mr-2 text-isGrayDark3" {...props} />
			</blockquote>
		);
	},
	li: (props) => {
		return <li className="mb-1 leading-tight" {...props} />;
	},
	ul: (props) => {
		return (
			<div className="mb-2 ml-3 list-disc leading-tight md:ml-[20px]">
				<div className="mb-2" {...props} />
			</div>
		);
	},
	ol: (props) => {
		return (
			<div className="mb-2 ml-3 list-decimal leading-tight md:ml-[20px]">
				<div className="mb-2" {...props} />
			</div>
		);
	},
	img: (props) => {
		return <Image {...props} alt="image" className="rounded-lg" />;
	},
	code: (props) => {
		return (
			<span
				className="inline-block px-2 py-0 font-mono text-xs font-medium align-middle rounded-md md:text-sm bg-isGrayLightEmphasis6 text-isGrayDarkEmphasis3"
				{...props}
			/>
		);
	},
	pre: (props) => {
		return (
			<pre className="p-3 overflow-x-auto text-xs rounded-xl md:text-sm bg-isGrayLightEmphasis6">
				<code className="font-mono" {...props} />
			</pre>
		);
	},
};

export default MDXComponents;
