import React from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends React.Component{
	constructor(){
		super();
	}

	handleSignOutClick(){
		this.props.signOut();
	}

	render(){
		const {pathname} = this.props.location;
		return(
			<nav>
				<div className="nav-wrapper">
					<div class="brand-logo">
						<Link to="/" class="nav-logo" href="./">
							<span><img class="nav-tr-icon" src={require("../../imgs/icon.png")}></img></span>
							<span class="trurecruit-text-logo white-text">Tru<b>Recruit</b></span>
						</Link>
					</div>
					<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
					<ul className="right hide-on-med-and-down">
						{
							pathname == '/' || pathname == '/sign_in' || pathname == '/sign_up' ? 
							(	
								<div>
									<li><Link class="waves-effect waves-light btn tr-green" to="sign_up">Sign Up</Link></li>	
				        			<li><Link class="waves-effect waves-light btn tr-green mt10" to="sign_in">Sign In</Link></li>	
								</div>
				        	)
							: 
							(
								<li><button class="waves-effect waves-light btn tr-green" onClick={this.handleSignOutClick.bind(this)} style={{'margin-right':10}}>Sign Out</button></li>	
							)
						}
						
					</ul>
					<ul className="side-nav" id="mobile-demo">
						<li><Link class="waves-effect waves-light btn tr-green" to="sign_up">Sign Up</Link></li>	
				        <li><Link class="waves-effect waves-light btn tr-green mt10" to="sign_in">Sign In</Link></li>
					</ul>
				</div>
			</nav>
		)
	}
}