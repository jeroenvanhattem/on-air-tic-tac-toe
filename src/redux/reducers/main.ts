import * as t from "../types";

const initialState = {
	test: "yeah",
};

export const mainReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case t.SET_TEST:
			return {
				...state,
				test: action.payload,
			};
		default:
			return { ...state };
	}
};
