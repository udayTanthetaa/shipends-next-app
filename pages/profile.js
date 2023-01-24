const Profile = () => {
	return (
		<>
			<div className="flex flex-col min-h-screen bg-isGrayLightEmphasis6 p-[12px] place-content-start w-full items-center">
				<div className="flex flex-col items-center w-full ">
					<form
						className="flex flex-col w-full max-w-2xl rounded-lg bg-isWhite md:rounded-xl lg:rounded-2xl
                    py-[12px] px-[20px] "
					>
						<div className="flex flex-col w-full py-[4px] px-[6px] md:px-[10px] lg:px-[12px] md:py-[8px] lg:py-[10px]">
							<div className="flex flex-row items-center ml-[2px] mb-[2px] md:ml-[3px] md:mb-[3px] lg:mb-[4px] lg:ml-[4px]">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="w-6 h-6 md:w-7 md:h-7 lg:h-8 lg:w-8"
								>
									<path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
									<path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
								</svg>

								<div
									className="text-md font-extrabold text-isGrayDarkEmphasis6 md:text-lg lg:text-xl
                                    ml-[12px]"
								>
									Email
								</div>
							</div>

							<input
								type="email"
								placeholder="you@email.com"
								className="w-full rounded-md appearance-none focus:outline-none bg-isGrayLightEmphasis6 md:rounded-lg lg:rounded-xl
                                py-[4px] px-[6px] md:px-[10px] lg:px-[12px] md:py-[8px] lg:py-[10px] font-medium text-isGrayLight
                                text-xs md:text-sm lg:text-md"
							/>
						</div>

						<div className="flex flex-col w-full py-[4px] px-[6px] md:px-[10px] lg:px-[12px] md:py-[8px] lg:py-[10px]">
							<div className="flex flex-row items-center ml-[2px] mb-[2px] md:ml-[3px] md:mb-[3px] lg:mb-[4px] lg:ml-[4px]">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-6 h-6 md:w-7 md:h-7 lg:h-8 lg:w-8"
								>
									<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
									<path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
								</svg>

								<div
									className="text-md font-extrabold text-isGrayDarkEmphasis6 md:text-lg lg:text-xl
                                    ml-[12px]"
								>
									Password
								</div>
							</div>

							<input
								type="password"
								placeholder="password"
								className="w-full rounded-md appearance-none focus:outline-none bg-isGrayLightEmphasis6 md:rounded-lg lg:rounded-xl
                                py-[4px] px-[6px] md:px-[10px] lg:px-[12px] md:py-[8px] lg:py-[10px] font-medium text-isGrayLight
                                text-xs md:text-sm lg:text-md"
							/>
						</div>

						<div className="flex flex-col w-full py-[4px] px-[6px] md:px-[10px] lg:px-[12px] md:py-[8px] lg:py-[10px] items-end">
							<button
								className="rounded-md appearance-none focus:outline-none bg-isGrayLightEmphasis6 md:rounded-lg lg:rounded-xl
                                py-[4px] px-[6px] md:px-[10px] lg:px-[12px] md:py-[8px] lg:py-[10px] font-medium text-isGrayLight
                                text-xs md:text-sm lg:text-md"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Profile;
