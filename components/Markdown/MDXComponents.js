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
				<h2
					className="py-1 md:py-2 text-lg md:text-xl font-semibold text-isGrayDarkEmphasis5"
					{...props}
				/>
				<hr className="pb-2 md:pb-3 border-t-2 border-isGrayLightEmphasis5" />
			</>
		);
	},
	h3: (props) => {
		return (
			<>
				<h3
					className="py-1 md:py-2 text-lg md:text-xl font-semibold text-isGrayDarkEmphasis5 rounded-xl text-center"
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
					className="inline-block transition duration-300 ease-in-out text-isBlueDarkEmphasis hover:cursor-pointer border-b-2 border-transparent hover:border-isBlueDarkEmphasis"
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
					<Link
						target="_self"
						rel="noopener noreferrer"
						passHref
						{...props}
					/>
					&nbsp;
					<div className="hidden font-bold text-isGrayDark2 group-hover:block">
						#
					</div>
				</div>
			);
		} else {
			return (
				<Link
					className="inline-block transition duration-300 ease-in-out text-isBlueDarkEmphasis hover:cursor-pointer border-b-2 border-transparent hover:border-isBlueDarkEmphasis"
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
				<div className="pb-3 flex flex-col w-full">
					<blockquote className="flex flex-col items-start text-sm md:text-md px-2 py-1 leading-tight tracking-wide border-l-4 rounded-r-xl border-isGrayLightEmphasis4 bg-isGrayLightEmphasis6">
						<div
							className="mt-3 ml-2 mr-2 text-isGrayDark3"
							{...props}
						/>
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
			<div className="mb-2 ml-3 list-disc leading-tight">
				<div className="mb-2" {...props} />
			</div>
		);
	},
	ol: (props) => {
		return (
			<div className="mb-2 ml-3 list-decimal leading-tight">
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
				className="inline-block px-2 py-0 font-mono text-sm font-medium align-middle rounded-md md:text-md bg-isGrayLightEmphasis6 text-isGrayDarkEmphasis3"
				{...props}
			/>
		);
	},
	pre: (props) => {
		return (
			<pre className="p-3 mb-3 overflow-x-auto text-sm rounded-xl md:text-md bg-isGrayLightEmphasis6">
				<code className="font-mono" {...props} />
			</pre>
		);
	},
};

export default MDXComponents;
