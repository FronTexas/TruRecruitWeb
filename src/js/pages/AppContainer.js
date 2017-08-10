import React from 'react';
import ReactDOM from 'react-dom';
import { 
	Switch, 
	Route
} from 'react-router';
import {
	BrowserRouter,
} from 'react-router-dom';

import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import history from '../lib/history';


import Dashboard from './Dashboard';
import Landing from './Landing';
import Layout from './Layout';
import ProfileSetUp from './ProfileSetUp';
import SignIn from './SignIn';
import SignUp from './SignUp';

const firebase = require('firebase');


class AppContainer extends React.Component{
	constructor(props){
		super(props);
		var config = {
	      apiKey: "AIzaSyCOwfUwf2-GqcacgkBopnwXb8-HG5Km7hY",
	      authDomain: "trurecruit-dd63b.firebaseapp.com",
	      databaseURL: "https://trurecruit-dd63b.firebaseio.com",
	      storageBucket: "trurecruit-dd63b.appspot.com",
	      messagingSenderId: "117008567602"
	    };
	    firebase.initializeApp(config);
	    this.props.setFirebaseRef(firebase);
	}
	render(){
		return (
			<BrowserRouter history={history}>
				<Layout>
					<Switch>
						<Route exact path="/" render={(props) =><Landing {...this.props} {...props}></Landing>}></Route>
						<Route path="/sign_up" render={(props) => <SignUp {...this.props} {...props}></SignUp>}></Route>
						<Route path="/sign_in" render={(props) => <SignIn{...this.props} {...props}></SignIn>}></Route>
						<Route path="/profile_set_up" render ={(props)=><ProfileSetUp {...this.props} {...props}></ProfileSetUp>}></Route>
						<Route path="/dashboard" render={(props) => <Dashboard {...this.props} {...props}></Dashboard>}></Route>
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
