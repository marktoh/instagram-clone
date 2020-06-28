import React, { Component } from 'react'
import { connect } from 'react-redux';

import { setValue } from '../../actions/textbox.actions';

import './index.scss';
class Textbox extends Component {
	constructor(props) {
		super(props);

		this.textboxRef = React.createRef();
	}

	componentDidUpdate = (prevProps, prevState) => {
		this.focus();
		return true;
	}

	focus = () => {
		this.textboxRef.current.focus();
	}

	handleChange = (event) => {
		this.props.setValue(event.target.value);
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.handleSubmit({ value: this.props.value });
	}

	render() {
		const { placeholder, buttonText } = this.props;
		return (
			<div className="Textbox">
				<form onSubmit={this.handleSubmit}>
					<textarea placeholder={placeholder} value={this.props.value} onChange={this.handleChange} ref={this.textboxRef}>
					</textarea>
					<button className="blue" type="submit">
						{buttonText}
					</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	value: state.textbox.value,
})

export default connect(mapStateToProps, { setValue })(Textbox);
