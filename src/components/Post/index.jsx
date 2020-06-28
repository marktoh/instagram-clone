import React, { Component } from 'react'
import { connect } from 'react-redux';

import { FiUser as AvatarIcon, FiSend as ShareIcon, FiBookmark as BookmarkIcon, FiMessageCircle as CommentIcon, FiImage as ImageIcon, FiHeart as EmptyLikeIcon } from 'react-icons/fi';

import Comment from '../Comment';
import UserText from '../UserText';
import Textbox from '../Textbox';

import { postComment, postCommentLike } from '../../api/comment';
import { getPosts } from '../../api/posts';

import { getPostsRequest, getPostsSuccess } from '../../actions/post.actions';
import { setValue } from '../../actions/textbox.actions';

import { POST_NUMBER } from '../../fixtures/constants';


import './index.scss';

const PostHeader = ({ pic, owner, location, isFollowing }) => (
	<header className="Post-Header">
		<div className="Post-Header-Picture">
			{pic}
		</div>
		<div className="Post-Header-Body">
			<div className="Post-Header-Body-Content">
				<UserText username={owner} />
				<div className="Post-Header-Follow">
					<span className="Post-Header-Separator">•</span>
					{isFollowing ? <button>Following</button> : <button className="blue">Follow</button>}
				</div>
			</div>
			<div className="Post-Header-Location">
				{location}
			</div>
		</div>
		<div className="Post-Header-Footer">
			...
		</div>
	</header>
)

type Props = {
	id: number,
	numLikes: number,
	dateCreated: string,
	username: string,
}
class Post extends Component<Props> {
	constructor(props) {
		super(props);

		this.state = {
			input: '',
			replyId: '',
			replyUsername: '',
		}
	}

	onLikeClick = (commentId, isLiked) => {
		postCommentLike(this.props.id, commentId, isLiked);
		// TODO: Remove the line below once refreshing data from data store is properly implemented.
		window.location.reload();
	}

	onReplyClick = (id, owner) => {
		this.props.setValue(this.createMention(owner))
		this.setState({
			replyId: id,
			replyUsername: owner,
		})
	}


	createMention = (username) => `@${username} `;

	updatePosts = () => {
		// NOTE: This would typically be handled in a middleware.
		// Success or failure actions should be considered.
		// On success, update the global store with the response.
		// On failure, log the response error.
		this.props.getPostsRequest();
		const posts = getPosts();
		this.props.getPostsSuccess(posts);
		// TODO: Remove the line below once refreshing data from data store is properly implemented.
		window.location.reload();
	}

	handleSubmit = (e) => {
		// TODO: Reply functionality is temporarily disabled due to incompleteness.
		// let isReply = false;
		// const words = this.props.value.split(' ');
		// if (words.length > 0) {
		// 	const firstWord = words[0];
		// 	if (firstWord.startsWith('@')) {
		// 		isReply = true;
		// 	}
		// }

		// if (isReply) {
		// 	// TODO: create reply
		// } else {
		// 	// createComment
		// 	const { id, username, value } = this.props;
		// 	postComment(id, username, value);
		// }

		const { id, username, value } = this.props;
		postComment(id, username, value);
		this.props.setValue('');
		this.updatePosts();
	}

	render() {
		const { numLikes, dateCreated, comments } = this.props;

		return (
			<article className="Post">
				<div className="Post-Image">
					<ImageIcon />
				</div>
				<div className="Post-Sidebar">
					<PostHeader pic={<AvatarIcon className="Avatar" />} owner='alicedubin' location='Four Seasons Hotel Hampshire, England' isFollowing={false} />
					<div className="Post-Sidebar-Comments">
						{comments && comments.map(comment => 
							<Comment
								key={comment.id}
								id={comment.id}
								pic={<AvatarIcon className="Avatar" />}
								owner={comment.owner}
								text={comment.text}
								isLiked={comment.liked_by_viewer}
								numLikes={comment.likes}
								onLikeClick={this.onLikeClick}
								dateCreated={comment.dateCreated}
								onReply={this.onReplyClick}
								replies={comment.replies}
							/>)
						}
					</div>
					<section className="Post-Sidebar-Footer">
						<div className="Post-Sidebar-Meta">
							<div className="Post-Sidebar-Meta-Actions">
								<span>
									<button>
										<EmptyLikeIcon/>
									</button>
								</span>
								<span>
									<button>
										<CommentIcon/>
									</button>
								</span>
								<span>
									<button>
										<ShareIcon />
									</button>
								</span>
								<span className="bookmark">
									<button>
										<BookmarkIcon />
									</button>
								</span>
							</div>
							<div className="Post-Sidebar-Meta-Likes">
								<div>
									{numLikes > 0 ? `${numLikes} likes` : 'Be the first to like'}
								</div>
							</div>
							<div className="Post-Sidebar-Meta-Date">
								<time>{dateCreated}</time>
							</div>
						</div>
						<div className="Post-Sidebar-Textbox">
							<Textbox value={this.state.input} placeholder='Add a comment...' buttonText='Post' handleSubmit={this.handleSubmit} />
						</div>
					</section>
				</div>
			</article>
		)
	}
}

const mapStateToProps = (state) => ({
	username: state.user.username,
	value: state.textbox.value,
	post: state.posts.posts.find(post => post.id === POST_NUMBER),
	comments: state.posts.posts.find(post => post.id === POST_NUMBER).comments,
	id: POST_NUMBER,
})
export default connect(mapStateToProps, { setValue, getPostsRequest, getPostsSuccess })(Post);

