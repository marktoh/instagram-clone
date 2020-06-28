import { combineReducers } from 'redux';

import user from '../reducers/user.reducer';
import posts from '../reducers/posts.reducer';
import textbox from '../reducers/textbox.reducer';

const rootReducer = combineReducers({
	user,
	posts,
	textbox
})

export default rootReducer;