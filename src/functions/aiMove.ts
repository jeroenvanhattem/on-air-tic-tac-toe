import { MoveType } from "../types/Game";
import { checkWin } from "./checkWin";
import { generateBoard } from "./generateBoard";

export const _aiMoves = ({
	moves,
	gridSize,
}: {
	moves: MoveType[];
	gridSize: number;
}) => {
	console.log("AI grid size: ", gridSize);
	let board = generateBoard(gridSize);
	moves.map((move) => {
		board[move.position[0]][move.position[1]] = move.mover;
	});

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

	// Check for winning move
	checkForWinningMove({ board, gridSize });
	checkForBlockingMove({ board, gridSize });
	checkForCenterMove({ board, gridSize });
	checkForCornerMove({ board, gridSize });
	checkForEdgeMove({ board, gridSize });
	makeRandomMove({ board, gridSize });

	return false;
};

const checkForWinningMove = ({
	board,
	gridSize,
}: {
	board: any;
	gridSize: number;
}) => {
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (board[i][j] === "") {
				let tempBoard = board;
				tempBoard[i][j] = "o";
				console.log("AI is contemplating move", i, j);
				const win = checkWin({ board: tempBoard, currentMover: "o" });
				if (win) {
					console.log("AI is making a winning move");
					console.log(tempBoard);
					return [i, j];
				}
			}
		}
	}
};

const checkForBlockingMove = ({
	board,
	gridSize,
}: {
	board: any;
	gridSize: number;
}) => {};

const checkForCenterMove = ({
	board,
	gridSize,
}: {
	board: any;
	gridSize: number;
}) => {};

const checkForCornerMove = ({
	board,
	gridSize,
}: {
	board: any;
	gridSize: number;
}) => {};

const checkForEdgeMove = ({
	board,
	gridSize,
}: {
	board: any;
	gridSize: number;
}) => {};

const makeRandomMove = ({
	board,
	gridSize,
}: {
	board: any;
	gridSize: number;
}) => {};

// let the cpu make a move based on the current board
export const aiMoves = ({
	moves,
	gridSize,
}: {
	moves: MoveType[];
	gridSize: number;
}) => {
	console.log("AI grid size: ", gridSize);
	let board = generateBoard(gridSize);
	moves.map((move) => {
		board[move.position[0]][move.position[1]] = move.mover;
	});

	let move: MoveType = {
		position: [0, 0],
		mover: "o",
	};
	let moveMade = false;
	while (!moveMade) {
		let row = Math.floor(Math.random() * gridSize);
		let column = Math.floor(Math.random() * gridSize);
		if (board[row][column] === "") {
			move.position = [row, column];
			moveMade = true;
		}
	}
	return move;
};
