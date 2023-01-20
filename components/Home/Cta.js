import Socials from "./Socials";
import Header from "./Header";

const Cta = () => {
	return (
		<>
			<div className="flex flex-col items-center w-full min-h-screen text-center place-content-center bg-gradient-to-br from-black to-zeus">
				<Header />

				<div className="flex flex-row mt-4 space-x-6 md:mt-6">
					<Socials />
				</div>
			</div>
		</>
	);
};

export default Cta;
