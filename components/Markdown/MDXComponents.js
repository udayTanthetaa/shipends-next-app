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
			<>
				<h2 className="py-1 text-lg font-semibold md:py-2 md:text-xl text-isGrayDarkEmphasis5" {...props} />
				<hr className="pb-2 border-t-2 md:pb-3 border-isGrayLightEmphasis5" />
			</>
		);
	},
	h3: (props) => {
		return (
			<>
				<h3
					className="w-full px-3 py-2 text-lg font-semibold leading-tight text-center bg-isGrayLightEmphasis3 md:text-xl text-isGrayDarkEmphasis5 rounded-xl"
					{...props}
				/>
			</>
		);
	},
	p: (props) => {
		return <div className="pb-2 md:pb-3" {...props} />;
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
					className="inline-block transition duration-300 ease-in-out border-b-2 border-transparent text-isBlueDarkEmphasis hover:cursor-pointer hover:border-isBlueDark"
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
					className="inline-block transition duration-300 ease-in-out border-b-2 border-transparent text-isBlueDarkEmphasis hover:cursor-pointer hover:border-isBlueDark"
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
			<>
				<div className="flex flex-col w-full pb-3">
					<blockquote className="flex flex-col items-start px-2 py-1 text-xs leading-tight tracking-wide border-l-4 md:text-sm rounded-r-xl border-isGrayLightEmphasis4 bg-isGrayLightEmphasis6">
						<div className="mt-3 ml-2 mr-2 text-isGrayDark3" {...props} />
					</blockquote>
				</div>
			</>
		);
	},
	li: (props) => {
		return <li className="mb-1 leading-tight" {...props} />;
	},
	ul: (props) => {
		return (
			<div className="mb-2 ml-3 leading-tight list-disc">
				<div className="mb-2" {...props} />
			</div>
		);
	},
	ol: (props) => {
		return (
			<div className="mb-2 ml-3 leading-tight list-decimal">
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
			<pre className="p-3 mb-3 overflow-x-auto text-xs rounded-xl md:text-sm bg-isGrayLightEmphasis6">
				<code className="font-mono text-xs sm:text-sm" {...props} />
			</pre>
		);
	},
};

export default MDXComponents;
