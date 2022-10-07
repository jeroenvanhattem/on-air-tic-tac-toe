import { MoveType } from "../types/Game";
import { generateBoard } from "./generateBoard";

export const aiMoves = ({
	moves,
	gridSize,
}: {
	moves: MoveType[];
	gridSize: number;
}) => {
	let board = generateBoard(gridSize);
	moves.map((move) => {
		board[move.position[0]][move.position[1]] = move.mover;
	});

	console.log("AI is thinking");

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
};
