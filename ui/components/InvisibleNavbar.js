import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "ui";

export const InvisibleNavbar = () => {
	return (
		<>
			<div className="flex flex-col items-center w-full pb-3 place-content-center">
				<div className="flex flex-row items-center justify-between w-full max-w-6xl px-3 py-2 bg-transparent rounded-xl">
					<motion.svg
						whileTap={{
							scale: 0.9,
							transition: { duration: 0.03 },
						}}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						className="transition duration-300 ease-in-out cursor-pointer w-9 h-9 fill-transparent "
					>
						<path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
						<path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
					</motion.svg>

					<motion.svg
						whileTap={{
							scale: 0.9,
							transition: { duration: 0.03 },
						}}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						className="transition duration-300 ease-in-out cursor-pointer w-9 h-9 fill-transparent "
					>
						<path
							fillRule="evenodd"
							d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z"
							clipRule="evenodd"
						/>
					</motion.svg>

					<motion.svg
						whileTap={{
							scale: 0.9,
							transition: { duration: 0.03 },
						}}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						className="transition duration-300 ease-in-out cursor-pointer w-9 h-9 fill-transparent "
					>
						<path
							fillRule="evenodd"
							d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
							clipRule="evenodd"
						/>
					</motion.svg>
				</div>
			</div>
		</>
	);
};
