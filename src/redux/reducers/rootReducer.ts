import { combineReducers } from "redux";
import { boardReducer } from "./board";
import { gameReducer } from "./game";
import { mainReducer } from "./main";

export const rootReducer = combineReducers({
	main: mainReducer,
	board: boardReducer,
	game: gameReducer,
});
