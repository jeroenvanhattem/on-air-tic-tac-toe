import { combineReducers } from "redux";
import { boardReducer } from "./board";
import { gameReducer } from "./game";

export const rootReducer = combineReducers({
	board: boardReducer,
	game: gameReducer,
});
