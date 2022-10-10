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
	console.log("\n-----------------------------------------");

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
	if (!move) move = makeRandomMove({ board, gridSize });

	console.log("AI making move: ", move);

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
					console.log("AI is making a blocking move");
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
			console.log("Making center move");
			move.position = [center, center];
			return move;
		}
	} else {
		// Find center of grid when even
		const center1 = Math.floor(gridSize / 2) - 1;
		const center2 = Math.floor(gridSize / 2);
		if (board[center1][center1] === "") {
			console.log("Making center move");
			move.position = [center1, center1];
			return move;
		} else if (board[center1][center2] === "") {
			console.log("Making center move");
			move.position = [center1, center2];
			return move;
		} else if (board[center2][center1] === "") {
			console.log("Making center move");
			move.position = [center2, center1];
			return move;
		} else if (board[center2][center2] === "") {
			console.log("Making center move");
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

	for (let i = 0; i < corners.length; i++) {
		const [x, y] = corners[i];
		if (board[x][y] === "") {
			console.log("Making corner move");
			move.position = [x, y];
			return move;
		}
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
	for (let i = 0; i < gridSize; i++) {
		if (board[0][i] === "") {
			console.log("Making edge move");
			move.position = [0, i];
			return move;
		} else if (board[gridSize - 1][i] === "") {
			console.log("Making edge move");
			move.position = [gridSize - 1, i];
			return move;
		} else if (board[i][0] === "") {
			console.log("Making edge move");
			move.position = [i, 0];
			return move;
		} else if (board[i][gridSize - 1] === "") {
			console.log("Making edge move");
			move.position = [i, gridSize - 1];
			return move;
		}
	}

	return false;
};

// Random move working
const makeRandomMove = ({
	board,
	gridSize,
}: {
	board: any;
	gridSize: number;
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
