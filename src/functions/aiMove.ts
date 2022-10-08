import { MoveType } from "../types/Game";
import { checkWin } from "./checkWin";
import { generateBoard } from "./generateBoard";
import { updateBoard } from "./updateBoard";

export const aiMoves = ({
	moves,
	gridSize,
	lastMove,
}: {
	moves: MoveType[];
	gridSize: number;
	lastMove: MoveType;
}) => {
	console.log("\n-----------------------------------------");
	console.log("AI grid size: ", gridSize);
	let board = updateBoard({ gridSize, moves });

	console.log("Moves: ", moves);
	console.log("AI is thinking");
	console.log("This is the board: ", board);

	// First check if the there's a winning move available.
	// If there is, make that move.
	// If there isn't, check if there's a blocking move available.
	// If there is, make that move.
	// If there isn't, check if there's a center move available.
	// If there is, make that move.
	// If there isn't, check if there's a corner move available.
	// If there is, make that move.
	// If there isn't, check if there's an edge move available.
	// If there is, make that move.
	// If there isn't, make a random move.

	let move: MoveType | boolean = {
		position: [0, 0],
		mover: "o",
	};

	move = checkForWinningMove({ board, gridSize, lastMove });
	if (!move) move = checkForBlockingMove({ board, gridSize, lastMove });
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
	console.log("Last move: ", lastMove);
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (board[i][j] === "") {
				if (i !== lastMove.position[0] && j !== lastMove.position[1]) {
					let tempBoard = board;
					tempBoard[i][j] = "o";
					console.log("AI is contemplating move", i, j);
					const win = checkWin({ board: tempBoard, currentMover: "o" });
					if (win) {
						console.log("AI is making a winning move");
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
	console.log("Checking for blocking move");
	let move: MoveType | false = {
		position: [0, 0],
		mover: "o",
	};
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (board[i][j] === "") {
				if (i !== lastMove.position[0] && j !== lastMove.position[1]) {
					let tempBoard = board;
					tempBoard[i][j] = "x";
					console.log("AI is contemplating move", i, j);
					const win = checkWin({ board: tempBoard, currentMover: "x" });
					if (win) {
						console.log("AI is making a blocking move");
						console.log(tempBoard);
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

const makeRandomMove = ({
	board,
	gridSize,
	lastMove,
}: {
	board: any;
	gridSize: number;
	lastMove: MoveType;
}) => {
	console.log("Making random move");
	console.log("Last move: ", lastMove);
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
			console.log("Random move at: " + row + " | " + column);
			console.log("We can make this move!");
			move.position = [row, column];
			moveMade = true;
		}
	}
	return move;
};
