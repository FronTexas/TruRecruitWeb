import React from 'react';
import ReactDOM from 'react-dom';
import { 
	Switch, 
	Route
} from 'react-router';
import {
	BrowserRouter,
} from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions';


import Dashboard from './Dashboard';
import Landing from './Landing';
import Layout from './Layout';
import ProfileSetUp from './ProfileSetUp';
import SignIn from './SignIn';
import SignUp from './SignUp';

class AppContainer extends React.Component{
	render(){
		return (
			<BrowserRouter>
				<Layout>
					<Switch>
						<Route exact path="/" component={Landing}></Route>
						<Route path="/sign_up" component={SignUp}></Route>
						<Route path="/sign_in" component={SignIn}></Route>
						<Route path="/profile_set_up" component={ProfileSetUp}></Route>
						<Route path="/dashboard" component={Dashboard}></Route>
					</Switch>
				</Layout>
			</BrowserRouter>
		)
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(ActionCreators,dispatch);
}

export default connect(()=>{return {}},mapDispatchToProps)(AppContainer)
