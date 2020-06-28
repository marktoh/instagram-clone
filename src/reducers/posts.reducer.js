import { GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAILURE } from '../actions/comments.actions';
import testPosts from '../fixtures/posts.json';
import { getPosts, setPosts } from '../api/posts';

const getDefaultPosts = () => {
	// TODO: For testing only.
	const posts = getPosts();
	if (posts) return posts;
	setPosts(testPosts);
	return testPosts;
}
const initialState = {
	posts: [...getDefaultPosts()],
	isRequesting: false,
	error: undefined,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS_REQUEST:
			return {
				...state,
				isRequesting: true,
				error: undefined,
			};
		case GET_POSTS_SUCCESS:
			return {
				...state,
				posts: action.posts,
				isRequesting: false,
				error: undefined,
			};
		case GET_POSTS_FAILURE:
			return {
				isRequesting: false,
				error: action.error,
			}
		default:
			return state;
	}
}