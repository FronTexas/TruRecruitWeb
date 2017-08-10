import {connect} from 'react-redux';
import React from 'react';


class SignUp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			firstName:'',
			lastName:'',
			password:'',
			email:''
		};
	}

	componentWillReceiveProps(nextProps){
		const {activeUser} = nextProps;
		console.log("Signup componentWillReceiveProps",JSON.stringify(activeUser));
		this.props.push('/profile_set_up');
	}

	handleSignUpClick(){
		const {firstName,lastName,email,password} = this.state;
		this.props.createNewUser({firstName,lastName,email,password});
	}

	handleInputChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render(){
		return (
			<div>
				<div class="col s12">
					<p class="p-medium center-align">Create your TruRecruit Account.</p>
				</div>
				<div class="col s12 center-horizontal-vertical">
				
				<div class="card large signup-form-box">
						<label for="firstName">First Name</label>
						<input type="text" name="firstName" required="required" value={this.state.firstName} onChange={this.handleInputChange.bind(this)}/>

						<label for="lastName">Last Name</label>
						<input type="text" name="lastName" required="required" value={this.state.lastName} onChange={this.handleInputChange.bind(this)}/>

						<label for="email">Email</label>
						<input type="email" name="email" required="required"value={this.state.email} onChange={this.handleInputChange.bind(this)}/>

						<label for="password">Password</label>
						<input type="password" name="password" id="password" required="required" value={this.state.password} onChange={this.handleInputChange.bind(this)}/>

						<label for="confirm_password">Confirm Password</label>
						<input type="password" name="confirm_password" id="confirm_password" required="required"/>
						<button class="waves-effect waves-light btn tr-green" onClick={this.handleSignUpClick.bind(this)}>Sign Up</button>
				</div>
			</div>
		</div>
		)
	}
}

function mapStateToProps(state){
	const {activeUser} = state;
	return {activeUser};
}

export default connect(mapStateToProps)(SignUp);
