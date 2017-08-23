import {connect} from 'react-redux';
import React from 'react';
import {Link} from 'react-router-dom';

class Nav extends React.Component{
	constructor(){
		super();
		this.state = {
			active_user_profile: null
		}
	}

	componentDidMount(){
		this.props.fetchActiveUserProfile();
	}

	componentWillReceiveProps(nextProps){
		const {active_user_profile} = nextProps;
		this.setState({active_user_profile});
	}

	handleSignOutClick(){
		this.props.signOut();
	}

	inNonAuthenticatedPages(pathname){
		const non_authenticated_page = {"/":true,"/sign_in":true,"/sign_up":true}
		return pathname in non_authenticated_page;
	}

	render(){
		const {pathname} = this.props.location;
		
		if (!this.inNonAuthenticatedPages(pathname)){
			$(".dropdown-button").dropdown({constrainWidth: false });
		}

		return(
			<div>
				<ul id="dropdown" class="dropdown-content nav-dropdown-ul">
					<li class="nav-dropdown-list disabled">
						<div>
							<span>Signed in as</span>
							<br/>
							<span style={{fontSize:20}}><b>{this.state.active_user_profile ? this.state.active_user_profile.name : ''}</b></span>
						</div>
						
					</li>
					<li className="nav-dropdown-list">
						<Link to="/profile_set_up" class="printshare-button hvr-shadow">
                          <i class="fa fa-cog" style={{fontSize:20}}></i>
                          <span style={{fontSize:15}}>Profile Set Up</span>
                         </Link>
					</li>
					<li className="divider"></li>
					<li className="nav-dropdown-list">
						<div class="printshare-button hvr-shadow" onClick={this.handleSignOutClick.bind(this)}>
                          	<span style={{fontSize:15}}>Sign Out</span>
                         </div>
					</li>
				</ul>
				<nav>
					<div className="nav-wrapper">
						<div class={this.inNonAuthenticatedPages(pathname) ? "brand-logo" : "brand-logo center"}>
							{
								this.inNonAuthenticatedPages(pathname) ? 
									<Link to="/" class="nav-logo" href="./">
										<span><img class="nav-tr-icon" src={require("../../imgs/icon.png")}></img></span>
										<span class="trurecruit-text-logo white-text">Tru<b>Recruit</b></span>
									</Link>
								:
									<div class="nav-logo" href="./">
										<span><img class="nav-tr-icon" src={require("../../imgs/icon.png")}></img></span>
										<span class="trurecruit-text-logo white-text">Tru<b>Recruit</b></span>
									</div>
							}

						</div>
						{
							this.inNonAuthenticatedPages(pathname) ? 
								<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
							:
								''

						}
						<ul className={this.inNonAuthenticatedPages(pathname) ? "right hide-on-med-and-down" : "right"}>
							{
								this.inNonAuthenticatedPages(pathname) ? 
								(	
									<div>
										<li><Link class="waves-effect waves-light btn tr-green" to="sign_up">Sign Up</Link></li>	
					        			<li><Link class="waves-effect waves-light btn tr-green mt10" to="sign_in">Sign In</Link></li>	
									</div>
					        	)
								: 
								(
									<li>
										<a href="#!" class="dropdown-button" data-activates="dropdown">
											<img src="http://www.radfaces.com/images/avatars/alan-frog.jpg"
												 class="profpic-nav"
												 alt=""
											/>
										</a>
									</li>	
								)
							}
							
						</ul>
						{
							!this.inNonAuthenticatedPages(pathname) ? 
								<ul className="left" style={{marginLeft:35}}>
									<li className={pathname == "/dashboard" ? "active":""} style={{position:'relative'}}>
										{
											pathname == '/dashboard' ?
												<div className="nav-active-marker"></div>
											:
											''
										}
										<Link to="/dashboard">
											<span style={{fontSize:20}}>Dashboard</span>
										</Link>

									</li>
								</ul>
							: ''
						}

						{
							this.inNonAuthenticatedPages(pathname) ? 
							<ul className="side-nav" id="mobile-demo">
								<li><Link class="waves-effect waves-light btn tr-green" to="sign_up">Sign Up</Link></li>	
					        	<li><Link class="waves-effect waves-light btn tr-green mt10" to="sign_in">Sign In</Link></li>
							</ul>
							:
								''
						}
						
					</div>
				</nav>
			</div>
		)
	}
}

function mapStateToProps(state){
	const {active_user_profile} = state;
	return {active_user_profile}
}

export default connect(mapStateToProps)(Nav);