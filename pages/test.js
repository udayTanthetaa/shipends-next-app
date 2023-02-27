const Test = () => {
	const fetchThis = async () => {
		try {
			const res = await fetch("");

			const data = await res.json();

			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<button
				onClick={() => {
					fetchThis();
				}}
				className="mt-60"
			>
				Fetch Data
			</button>
		</>
	);
};

export default Test;
