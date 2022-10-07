import * as t from "../types";

const initialState = {
	board: [],
	gridSize: 3,
};

export const boardReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case t.SET_GRID_SIZE:
			return {
				...state,
				gridSize: action.payload,
			};
		default:
			return { ...state };
	}
};
