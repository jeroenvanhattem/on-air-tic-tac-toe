export const generateBoard = (gridSize: number) => {
	const board: any = [];
	for (let i = 0; i < gridSize; i++) {
		const row = [];
		for (let j = 0; j < gridSize; j++) {
			row.push("");
		}
		board.push(row);
	}
	return board;
};
