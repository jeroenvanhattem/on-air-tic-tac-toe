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
	_moves.push(lastMove);
	const board = updateBoard({ gridSize, moves: _moves });

	let move: MoveType | boolean = {
		position: [0, 0],
		mover: "o",
	};

	if (_moves.length === gridSize * gridSize - 1) {
		return false;
	}

	move = checkForWinningMove({ board: board, gridSize, lastMove });
	if (!move) move = checkForBlockingMove({ board: board, gridSize, lastMove });
	if (!move) move = checkForCenterMove({ board, gridSize, lastMove });
	if (!move) move = checkForCornerMove({ board, gridSize, lastMove });
	if (!move) move = checkForEdgeMove({ board, gridSize, lastMove });
	if (!move) move = makeRandomMove({ board, gridSize, lastMove });

	console.log("AI making move: ", move);

	return move;
};

const checkForWinningMove = ({
	board,
	gridSize,
	lastMove,
}: {
	board: any;
	gridSize: number;
	lastMove: MoveType;
}) => {
	let move: MoveType | false = {
		position: [0, 0],
		mover: "o",
	};
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (board[i][j] === "") {
				if (i !== lastMove.position[0] && j !== lastMove.position[1]) {
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
	}
	return false;
};

const checkForBlockingMove = ({
	board,
	gridSize,
	lastMove,
}: {
	board: any;
	gridSize: number;
	lastMove: MoveType;
}) => {
	let move: MoveType | false = {
		position: [0, 0],
		mover: "o",
	};

	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			// console.log("Checking position: ", i, j, board[i][j]);
			if (board[i][j] === "") {
				// console.log("This cell is blockable");
				if (i !== lastMove.position[0] && j !== lastMove.position[1]) {
					// console.log("Blocking move not taken yet");
					let tempBoard = [];
					for (let i = 0; i < board.length; i++) {
						tempBoard.push([...board[i]]);
					}
					tempBoard[i][j] = "x";
					console.log("AI is contemplating move", i, j);
					const win = checkWin({ board: tempBoard, currentMover: "x" });
					if (win) {
						console.log("AI is making a blocking move");
						// console.log(tempBoard);
						move.position = [i, j];
						return move;
					}
				}
			}
		}
	}
	return false;
};

const checkForCenterMove = ({
	board,
	gridSize,
	lastMove,
}: {
	board: any;
	gridSize: number;
	lastMove: MoveType;
}) => {
	return false;
};

const checkForCornerMove = ({
	board,
	gridSize,
	lastMove,
}: {
	board: any;
	gridSize: number;
	lastMove: MoveType;
}) => {
	return false;
};

const checkForEdgeMove = ({
	board,
	gridSize,
	lastMove,
}: {
	board: any;
	gridSize: number;
	lastMove: MoveType;
}) => {
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
