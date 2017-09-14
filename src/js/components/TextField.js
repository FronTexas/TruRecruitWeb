import React , {Component} from 'react';
import OptionallyDisplayed from './OptionallyDisplayed';
import PropTypes from 'prop-types';

export default class TextField extends Component{
	constructor(props){
		super(props);
		this.shouldDisplayError = this.shouldDisplayError.bind(this);
	}

	shouldDisplayError(){
		return this.props.showError && this.props.errorText && this.props.errorText !== "";
	}

	render(){
		return (
			<div>
				<input 
					class={this.shouldDisplayError() ? 'invalid' : ''}
					type={this.props.type || "text"}
					placeholder={this.props.placeholder || ""}
					value={this.props.value || null}
					onChange={this.props.onFieldChanged}
					{...this.props}/>
				<OptionallyDisplayed display={this.shouldDisplayError()}>
				  <div>
		          	<label class="red-text">{this.props.errorText}</label>
		          </div>
				</OptionallyDisplayed>
			</div>
		)
	}
}

TextField.propTypes = {
	errorText: PropTypes.string,
	showError: PropTypes.bool.isRequired,
	type: PropTypes.string,
	onFieldChanged: PropTypes.func.isRequired,
}