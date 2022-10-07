import { BoardType } from "../types/Board";

export const checkWin = ({
	board,
	currentMover,
}: {
	board: BoardType | any;
	currentMover: string;
}) => {
	console.log(board);
	const gridSize = board.length;
	console.log("gridSize", gridSize);

	let win = false;
	win = checkRow({ board, currentMover });
	console.log("Row win:", win);

	if (!win) {
		win = checkColumn({ board, currentMover });
		console.log("Column win:", win);
	}

	if (!win) {
		win = checkDiagonal({ board, currentMover });
		console.log("Diagonal win:", win);
	}

	if (!win) {
		win = checkInvertedDiagonal({ board, currentMover });
		console.log("Inverted diagonal win:", win);
	}

	return win;
};

const checkRow = ({
	board,
	currentMover,
}: {
	board: BoardType | any;
	currentMover: string;
}) => {
	const gridSize = board.length;

	let win = false;

	for (let i = 0; i < gridSize; i++) {
		let row = board[i];
		let allThis = true;
		for (let j = 0; j < gridSize; j++) {
			if (row[j] !== currentMover) {
				allThis = false;
				break;
			}
		}
		if (allThis) {
			win = true;
		}
	}

	return win;
};

const checkColumn = ({
	board,
	currentMover,
}: {
	board: BoardType | any;
	currentMover: string;
}) => {
	const gridSize = board.length;
	let win = false;

	for (let i = 0; i < gridSize; i++) {
		let allThis = true;
		for (let j = 0; j < gridSize; j++) {
			if (board[j][i] !== currentMover) {
				allThis = false;
				break;
			}
		}
		if (allThis) {
			win = true;
		}
	}

	return win;
};

const checkDiagonal = ({
	board,
	currentMover,
}: {
	board: BoardType | any;
	currentMover: string;
}) => {
	const gridSize = board.length;

	let win = false;
	let allThis = true;

	for (let i = 0; i < gridSize; i++) {
		if (board[i][i] !== currentMover) {
			allThis = false;
			return false;
		}
		if (allThis) {
			win = true;
		}
	}

	return win;
};

const checkInvertedDiagonal = ({
	board,
	currentMover,
}: {
	board: BoardType | any;
	currentMover: string;
}) => {
	const gridSize = board.length;
	let win = false;

	let allThis = true;
	for (let i = 0; i < gridSize; i++) {
		if (board[gridSize - 1 - i][i] !== currentMover) {
			allThis = false;
			return false;
		}
		if (allThis) {
			win = true;
		}
	}

	return win;
};
