import { getPosts, setPosts } from './posts';

const createComment = () => ({
	owner: '',
	text: '',
	likes: 0,
	liked_by_viewer: false,
	replies: [],
});

/**
 * Creates a new post comment in the data store
 * 
 * @param {Number} postId Id of post 
 * @param {String} owner Owner of the comment
 * @param {String} text Text of the comment
 */
export const postComment = (postId, owner, text) => {
	try {
		const posts = getPosts();
		const post = posts.find(post => post.id === postId);
		const newComment = { ...createComment(), owner, text};
		post.comments.push(newComment);
		setPosts(posts);
	} catch (error) {
		alert(error);
		console.error(error);
	}
}

export const postCommentLike = (postId, commentId, isLiked) => {
	try {
		const posts = getPosts();
		const post = posts.find(post => post.id === postId);
		const comment = post.comments.find(comment => comment.id === commentId);
		if (isLiked) comment.likes += 1;
		else comment.likes -=1 ;
		comment.liked_by_viewer = isLiked;
		setPosts(posts);
	} catch (error) {
		alert(error);
		console.error(error);
	}
}