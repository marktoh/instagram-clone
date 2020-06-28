import React, { Component } from 'react'

import { IoIosHeart as LikeIcon } from 'react-icons/io';
import { FiHeart as EmptyLikeIcon, FiUser as AvatarIcon } from 'react-icons/fi';

import UserText from '../UserText';

import './index.scss';

const LikeButton = ({ numLikes }) => {
	var text;
	if (numLikes === 1) text = '1 like';
	else text = `${numLikes} likes`;

	return <button className="LikeButton">
		{text}
	</button>
}

type Props = {
	id: number,
	owner: string,
	text: string,
	isLiked: boolean,
	numLikes: number,
	dateCreated: string,
	pic: object,
}
class Comment extends Component<Props> {
	constructor(props) {
		super(props);

		this.state = {
			showReplies: false,
		}
	}

	handleShowReplies = () => {
		this.setState(state => ({
			showReplies: !state.showReplies,
		}))
	}
	onLikeClick = () => this.props.onLikeClick(this.props.id, !this.props.isLiked);

	renderReplies = () => this.props.replies.map(reply => <Comment pic={<AvatarIcon className="Avatar" />} {...reply} onLikeClick={() => alert('to be implemented')}/>);

	render() {
		const { id, pic, owner, text, numLikes, isLiked, dateCreated, replies } = this.props;
		return (
			<div className="Comment">
				<div className="Comment-Owner">
					{pic}
				</div>
				<div className="Comment-Body">
					<div className="Comment-Body-Text">
						<UserText username={owner} />
						<span className="Comment-Body-Text-Description">
							{text}
						</span>
					</div>
					<div className="Comment-Body-Actions">
						<time>{dateCreated}</time>
						{numLikes > 0 ? <LikeButton numLikes={numLikes} /> : null}
						<span onClick={() => this.props.onReply(id, owner)}>Reply</span>
					</div>
					{/* {replies && replies.length > 0 && <div className="Comment-Body-Replies">
						<div className="Comment-Body-Replies-Button" onClick={this.handleShowReplies}>
							--- {this.state.showReplies ? 'Hide Replies' : `View Replies (${replies.length})`}
							{this.state.showReplies && <div className="Comment-Body-Replies-List">{this.renderReplies()}</div>}
						</div>
					</div>} */}
				</div>
				<button className="Comment-Like" onClick={this.onLikeClick}>
					{isLiked ? <LikeIcon className="Like-Icon active" /> : <EmptyLikeIcon className="Like-Icon" />}
				</button>
			</div>
		)
	}
}

export default Comment
