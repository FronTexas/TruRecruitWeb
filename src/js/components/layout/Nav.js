import React from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends React.Component{
	constructor(){
		super();
	}
	toggleCollapse(){
		return 0
	}
	render(){
		return(
			<div className="row">
				<div class="col s12 nav tr-dark-blue">
					<div class="col s4 h50 valign-wrapper">
						<a href="./index.html" class="valign-wrapper">
						<span><img src={require("../../imgs/icon.png")} alt="" width="30px"></img></span>
						<span class="trurecruit-text-logo white-text">Tru<b>Recruit</b></span>
						</a>
					</div>
					<div class="col s4"></div>
					<div class="col s4 h50 right-align">
                		<Link class="waves-effect waves-light btn tr-green mt10" to="sign_up">Sign Up</Link>
                		<Link class="waves-effect waves-light btn tr-green mt10" to="sign_in">Sign In</Link>
					</div>
				</div>
			</div>
		)
	}
}