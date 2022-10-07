import { combineReducers } from "redux";
import { mainReducer } from "./main";

export const rootReducer = combineReducers({
	main: mainReducer,
});
