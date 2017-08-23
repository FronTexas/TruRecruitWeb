import {connect} from 'react-redux';
import React from 'react';
import {Link} from 'react-router-dom';


class SignIn extends React.Component{

	constructor(props){
		super(props);
		this.state={}
	}


	handleSignInClick(e){
		this.props.signIn(this.state.email,this.state.password);
	}

	handleInputChange(e){
		const {target} = e;
		const {name,value} = target;
		this.setState({
			[name]:value
		});
	}

	render(){
		return (
			<div>
				<div class="col s12">
					<p class="p-medium center-align">Sign In to TruRecruit</p>
				</div>
				<div class="col s12 center-horizontal-vertical">
				
				<div class="card large form-box form-box-sign-up">
					<label for="email">Email</label>
					<input type="email" name="email" required="required" onChange={this.handleInputChange.bind(this)}/>

					<label for="password">Password</label>
					<input type="password" name="password" id="password" required="required" onChange={this.handleInputChange.bind(this)}/>
					
					<button 
						class="waves-effect waves-light btn tr-green"
						onClick={this.handleSignInClick.bind(this)}
					>Sign In</button>
				</div>
			</div>
		</div>
		)
	}
}

function mapsStateToProps(state){
	const {active_user} = state;
	return {active_user}
}

export default connect(mapsStateToProps)(SignIn);