import {connect} from 'react-redux';
import React from 'react';


class SignUp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			firstName:'',
			lastName:'',
			password:'',
			email:'',
			sign_up_button_got_clicked:false
		};
	}

	componentWillReceiveProps(nextProps){
		const {active_user,sign_up_just_finished} = nextProps;
		if(active_user != null && this.state.sign_up_button_got_clicked){
			this.props.push('/profile_set_up');
		}
	}

	handleSignUpClick(){
		const {firstName,lastName,email,password} = this.state;
		this.setState({sign_up_button_got_clicked:true})
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
					<p class="p-medium center-align text-create-tr-account" data-reactid=".0.1.1.0.0">Create your TruRecruit Account.</p>
				</div>
				<div class="col s12 center-horizontal-vertical">
				
				<div class="card large form-box form-box-sign-up">
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
	const {active_user,sign_up_just_finished} = state;
	return {active_user,sign_up_just_finished};
}

export default connect(mapStateToProps)(SignUp);
