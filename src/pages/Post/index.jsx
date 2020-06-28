import React, { Component } from 'react'
import { connect } from 'react-redux';

import Post from '../../components/Post'

import { POST_NUMBER } from '../../fixtures/constants';

import './index.scss';



type Props = {
	posts: {},
}
class PostPage extends Component<Props> {
	componentDidUpdate = (prevProps, nextState) => {
		console.log(prevProps);
		console.log(nextState);
		console.log(this);
	}
	render() {
		const { post, comments } = this.props;
		console.log('heyy');
		return (
			<main className="PostPage">
				<Post />
			</main>
		)
	}
}

const mapStateToProps = (state) => ({
	post: state.posts.posts.find(post => post.id === POST_NUMBER),
	comments: state.posts.posts.find(post => post.id === POST_NUMBER).comments,
})

export default connect(mapStateToProps)(PostPage);