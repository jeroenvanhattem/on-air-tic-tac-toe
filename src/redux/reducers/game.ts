import * as t from "../types";

const initialState = {
	currentMover: "x",
	moves: [],
	winner: false,
	cpu: false,
	started: false,
	finished: false,
};

export const gameReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case t.SET_GAME_STARTED:
			return {
				...state,
				started: action.payload,
			};
		case t.SET_CURRENT_MOVER:
			return {
				...state,
				currentMover: action.payload,
			};
		case t.ADD_MOVE:
			return {
				...state,
				moves: [...state.moves, action.payload],
			};
		case t.UNDO_MOVE:
			return {
				...state,
				moves:
					state.moves.length > 1
						? state.moves.slice(0, state.moves.length - 1)
						: [],
				currentMover: state.currentMover === "x" ? "o" : "x",
			};
		case t.SET_WINNER:
			return {
				...state,
				winner: action.payload,
				finished: true,
			};
		case t.CLEAR_GAME:
			return {
				currentMover: "x",
				moves: [],
				winner: false,
				started: true,
				finished: false,
			};
		case t.SET_CPU:
			return {
				...state,
				cpu: action.payload,
			};
		case t.SET_FINISHED:
			return {
				...state,
				finished: action.payload,
			};
		default:
			return { ...state };
	}
};
