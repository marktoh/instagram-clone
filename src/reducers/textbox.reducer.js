import { SET_VALUE } from '../actions/textbox.actions';

const initialState = {
	value: '',
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_VALUE:
			return {
				...state,
				value: action.value,
			};
		default:
			return state;
	}
}