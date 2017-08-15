import React from 'react';
import {Link} from 'react-router-dom';


export default class SignIn extends React.Component{
	render(){
		return (
			<div>
				<div class="col s12">
					<p class="p-medium center-align">Sign In to TruRecruit</p>
				</div>
				<div class="col s12 center-horizontal-vertical">
				
				<div class="card large form-box form-box-sign-up">
					<form method="post">
						<label for="email">Email</label>
						<input type="email" name="email" required="required"/>

						<label for="password">Password</label>
						<input type="password" name="password" id="password" required="required"/>
						
						<Link to="profile_set_up" class="waves-effect waves-light btn tr-green">Sign In</Link>
					</form>
				</div>
			</div>
		</div>
		)
	}
}