import React from 'react';


export default class SignUp extends React.Component{
	render(){
		return (
			<div>
				<div class="col s12">
					<p class="p-medium center-align">Create your TruRecruit Account.</p>
				</div>
				<div class="col s12 center-horizontal-vertical">
				
				<div class="card large signup-form-box">
					<form method="post">
						<label for="first_name">First Name</label>
						<input type="text" name="first_name" required="required"/>

						<label for="last_name">Last Name</label>
						<input type="text" name="last_name" required="required"/>

						<label for="email">Email</label>
						<input type="email" name="email" required="required"/>

						<label for="password">Password</label>
						<input type="password" name="password" id="password" required="required"/>

						<label for="confirm_password">Confirm Password</label>
						<input type="password" name="confirm_password" id="confirm_password" required="required"/>
						<button class="waves-effect waves-light btn tr-green">Sign Up</button>
					</form>
				</div>
			</div>
		</div>
		)
	}
}