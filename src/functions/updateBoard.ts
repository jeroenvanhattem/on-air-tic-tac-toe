import { MoveType } from "../types/Game";
import { generateBoard } from "./generateBoard";

export const updateBoard = ({
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
	return board;
};
