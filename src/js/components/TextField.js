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
					placeholder={this.props.placeholder}
					value={this.props.value}
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
	showError: PropTypes.bool.isRequired,
	onFieldChanged: PropTypes.func.isRequired
}