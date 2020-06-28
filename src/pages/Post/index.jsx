import React, { Component } from 'react'

import Post from '../../components/Post'

import './index.scss';



type Props = {
	posts: {},
}
class PostPage extends Component<Props> {
	render() {
		return (
			<main className="PostPage">
				<Post />
			</main>
		)
	}
}

export default PostPage;