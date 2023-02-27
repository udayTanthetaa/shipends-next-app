export const ShipCard = ({ ship }) => {
	return (
		<>
			<div className="flex flex-col bg-isWhite rounded-xl">
				<div className="p-2 text-sm text-isGrayLight">
					{ship.description}
				</div>
			</div>
		</>
	);
};
