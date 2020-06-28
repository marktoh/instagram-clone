import React, { Component } from 'react'

import './index.scss'

class UserText extends Component {
	render() {
		return (
			<h3 className="UserText">
				{this.props.username}
			</h3>
		)
	}
}

export default UserText
