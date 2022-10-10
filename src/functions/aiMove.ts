import { MoveType } from "../types/Game";
import { checkWin } from "./checkWin";
import { generateBoard } from "./generateBoard";
import { updateBoard } from "./updateBoard";

export const aiMoves = ({
	board: _board,
	moves,
	gridSize,
	lastMove,
}: {
	board: any;
	moves: MoveType[];
	gridSize: number;
	lastMove: MoveType;
}) => {
	const _moves = moves;
	if (moves.length < gridSize * gridSize) {
		_moves.push(lastMove);
	}
	const board = updateBoard({ gridSize, moves: _moves });

	let move: MoveType | boolean = {
		position: [0, 0],
		mover: "o",
	};

	if (_moves.length === gridSize * gridSize) {
		return false;
	}

	move = checkForWinningMove({ board: board, gridSize });
	if (!move) move = checkForBlockingMove({ board: board, gridSize });
	if (!move) move = checkForCenterMove({ board, gridSize });
	if (!move) move = checkForCornerMove({ board, gridSize });
	if (!move) move = checkForEdgeMove({ board, gridSize });
	if (!move) move = makeRandomMove({ board, gridSize, lastMove });

	return move;
};

const checkForWinningMove = ({
	board,
	gridSize,
}: {
	board: any;
	gridSize: number;
}) => {
	let move: MoveType | false = {
		position: [0, 0],
		mover: "o",
	};
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (board[i][j] === "") {
				let tempBoard = [];
				for (let i = 0; i < board.length; i++) {
					tempBoard.push([...board[i]]);
				}
				tempBoard[i][j] = "o";
				const win = checkWin({ board: tempBoard, currentMover: "o" });
				if (win) {
					move.position = [i, j];
					return move;
				}
			}
		}
	}
	return false;
};

const checkForBlockingMove = ({
	board,
	gridSize,
}: {
	board: any;
	gridSize: number;
}) => {
	let move: MoveType | false = {
		position: [0, 0],
		mover: "o",
	};

	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (board[i][j] === "") {
				let tempBoard = [];
				for (let i = 0; i < board.length; i++) {
					tempBoard.push([...board[i]]);
				}
				tempBoard[i][j] = "x";
				const win = checkWin({ board: tempBoard, currentMover: "x" });
				if (win) {
					move.position = [i, j];
					return move;
				}
			}
		}
	}
	return false;
};

const checkForCenterMove = ({
	board,
	gridSize,
}: {
	board: any;
	gridSize: number;
}) => {
	let move: MoveType | false = {
		position: [0, 0],
		mover: "o",
	};

	// Find center of grid when odd
	if (gridSize % 2 !== 0) {
		const center = Math.floor(gridSize / 2);
		if (board[center][center] === "") {
			move.position = [center, center];
			return move;
		}
	} else {
		// Find center of grid when even
		const center1 = Math.floor(gridSize / 2) - 1;
		const center2 = Math.floor(gridSize / 2);
		if (board[center1][center1] === "") {
			move.position = [center1, center1];
			return move;
		} else if (board[center1][center2] === "") {
			move.position = [center1, center2];
			return move;
		} else if (board[center2][center1] === "") {
			move.position = [center2, center1];
			return move;
		} else if (board[center2][center2] === "") {
			move.position = [center2, center2];
			return move;
		}
	}
	return false;
};

const checkForCornerMove = ({
	board,
	gridSize,
}: {
	board: any;
	gridSize: number;
}) => {
	let move: MoveType | false = {
		position: [0, 0],
		mover: "o",
	};
	const corners = [
		[0, 0],
		[0, gridSize - 1],
		[gridSize - 1, 0],
		[gridSize - 1, gridSize - 1],
	];

	const optionalMoves = corners.filter((corner) => {
		return board[corner[0]][corner[1]] === "";
	});

	if (optionalMoves.length > 0) {
		const randomPosition = Math.floor(
			Math.random() * (optionalMoves.length - 0)
		);
		move.position = [
			optionalMoves[randomPosition][0],
			optionalMoves[randomPosition][1],
		];
		return move;
	}
	return false;
};

const checkForEdgeMove = ({
	board,
	gridSize,
}: {
	board: any;
	gridSize: number;
}) => {
	let move: MoveType | false = {
		position: [0, 0],
		mover: "o",
	};

	const optionalMoves: any[] = [];
	for (let i = 0; i < gridSize; i++) {
		if (board[0][i] === "") {
			optionalMoves.push([0, i]);
		} else if (board[gridSize - 1][i] === "") {
			optionalMoves.push([gridSize - 1, i]);
		} else if (board[i][0] === "") {
			optionalMoves.push([i, 0]);
		} else if (board[i][gridSize - 1] === "") {
			optionalMoves.push([i, gridSize - 1]);
		}
	}

	if (optionalMoves.length > 0) {
		const randomPosition = Math.floor(
			Math.random() * (optionalMoves.length - 0)
		);
		move.position = [
			optionalMoves[randomPosition][0],
			optionalMoves[randomPosition][1],
		];
		return move;
	}

	return false;
};

// Random move working
const makeRandomMove = ({
	board,
	gridSize,
	lastMove,
}: {
	board: any;
	gridSize: number;
	lastMove: MoveType;
}) => {
	let move: MoveType = {
		position: [0, 0],
		mover: "o",
	};
	let moveMade = false;
	while (!moveMade) {
		let row = Math.floor(Math.random() * gridSize);
		let column = Math.floor(Math.random() * gridSize);
		while (row === lastMove.position[0] && column === lastMove.position[1]) {
			row = Math.floor(Math.random() * gridSize);
			column = Math.floor(Math.random() * gridSize);
		}
		if (board[row][column] === "") {
			move.position = [row, column];
			moveMade = true;
		}
	}
	return move;
};
