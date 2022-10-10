import { MoveType } from "../types/Game";
import { checkWin } from "./checkWin";
import { generateBoard } from "./generateBoard";
import { updateBoard } from "./updateBoard";

export const aiMoves = ({
	board: _board,
	moves: _moves,
	gridSize,
	lastMove,
}: {
	board: any;
	moves: MoveType[];
	gridSize: number;
	lastMove: MoveType | null;
}) => {
	const moves = _moves;

	if (lastMove) moves.push(lastMove);
	if (moves.length === gridSize * gridSize) return false;

	const board = updateBoard({ gridSize, moves: moves });
	if (checkWin({ board: board, currentMover: "x" }) === "x") return false;

	let move: MoveType | boolean = {
		position: [0, 0],
		mover: lastMove ? "o" : "x",
	};

	// If there's no lastMove, the player has decided for the AI to make a move.
	// So the AI will play as "x"
	const mover = lastMove ? "o" : "x";

	move = checkForWinningMove({ board: board, gridSize, mover });
	if (!move) move = checkForBlockingMove({ board: board, gridSize, mover });
	if (!move) move = checkForCenterMove({ board, gridSize, mover });
	if (!move) move = checkForCornerMove({ board, gridSize, mover });
	if (!move) move = checkForEdgeMove({ board, gridSize, mover });
	if (!move) move = makeRandomMove({ board, gridSize, lastMove, mover });

	return move;
};

const checkForWinningMove = ({
	board,
	gridSize,
	mover,
}: {
	board: any;
	gridSize: number;
	mover: string;
}) => {
	let move: MoveType | false = {
		position: [0, 0],
		mover,
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
	mover,
}: {
	board: any;
	gridSize: number;
	mover: string;
}) => {
	let move: MoveType | false = {
		position: [0, 0],
		mover,
	};

	// I know it's unnecessary to check for multiple blocking moves, because 99% chance that the user will make another winning move when possible.
	// This is just to confuse the user if they use the same strategy multiple times.
	// This way they might not anticipate the AI to block their previously used winning move and they might slip up and lose anyway.

	const optionalMoves: any[] = [];

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
					optionalMoves.push([i, j]);
				}
			}
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

const checkForCenterMove = ({
	board,
	gridSize,
	mover,
}: {
	board: any;
	gridSize: number;
	mover: string;
}) => {
	let move: MoveType | false = {
		position: [0, 0],
		mover,
	};

	const optionalMoves: any[] = [];

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
			optionalMoves.push([center1, center1]);
		}
		if (board[center1][center2] === "") {
			optionalMoves.push([center1, center2]);
		}
		if (board[center2][center1] === "") {
			optionalMoves.push([center2, center1]);
		}
		if (board[center2][center2] === "") {
			optionalMoves.push([center2, center2]);
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
	}

	return false;
};

const checkForCornerMove = ({
	board,
	gridSize,
	mover,
}: {
	board: any;
	gridSize: number;
	mover: string;
}) => {
	let move: MoveType | false = {
		position: [0, 0],
		mover,
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
	mover,
}: {
	board: any;
	gridSize: number;
	mover: string;
}) => {
	let move: MoveType | false = {
		position: [0, 0],
		mover,
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
	mover,
	lastMove,
}: {
	board: any;
	gridSize: number;
	mover: string;
	lastMove: MoveType | null;
}) => {
	let move: MoveType = {
		position: [0, 0],
		mover,
	};
	let moveMade = false;
	while (!moveMade) {
		let row = Math.floor(Math.random() * gridSize);
		let column = Math.floor(Math.random() * gridSize);
		if (lastMove) {
			while (row === lastMove.position[0] && column === lastMove.position[1]) {
				row = Math.floor(Math.random() * gridSize);
				column = Math.floor(Math.random() * gridSize);
			}
		}
		if (board[row][column] === "") {
			move.position = [row, column];
			moveMade = true;
		}
	}
	return move;
};
