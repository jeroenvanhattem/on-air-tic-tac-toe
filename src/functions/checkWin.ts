import { BoardType } from "../types/Board";

export const checkWin = ({
	board,
	currentMover,
}: {
	board: BoardType | any;
	currentMover: string;
}) => {
	const gridSize = board.length;

	let win = false;
	win = checkDiagonal({ board, currentMover });
	if (!win) win = checkInvertedDiagonal({ board, currentMover });
	if (!win) win = checkColumn({ board, currentMover });
	if (!win) win = checkRow({ board, currentMover });

	return win ? currentMover : false;
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
