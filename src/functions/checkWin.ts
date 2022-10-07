import { BoardType } from "../types/Board";

export const checkWin = ({ board }: { board: BoardType | any }) => {
	const gridSize = board.length;
	console.log("gridSize", gridSize);
	return true;
};

const checkRow = ({ board }: { board: BoardType | any }) => {};

const checkColumn = ({ board }: { board: BoardType | any }) => {};

const checkDiagonal = ({ board }: { board: BoardType | any }) => {};

const checkInvertedDiagonal = ({ board }: { board: BoardType | any }) => {};
