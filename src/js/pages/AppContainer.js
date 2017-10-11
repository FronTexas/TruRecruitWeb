import * as _firebase from '../lib/firebaseWrapper';
window._firebase = _firebase;
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import history from '../lib/history';
import {Match,Redirect,Switch,Route} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';




import Dashboard from './Dashboard';
import Landing from './Landing';
import Layout from './Layout';
import ProfileSetUp from './ProfileSetUp';
import SignIn from './SignIn';
import SignUp from './Signup';
import UidProvider from '../components/UidProvider';
import Onboarding from './Onboarding';

import ScratchPad from './ScratchPad';

const currently_not_need_this_check = false;

const RouteWrapper = ({component:Component,...rest,hoc_props,has_to_be_authenticated,redirect_to,path,history}) => (
	<Route {...rest} render={props => {
			if(has_to_be_authenticated == _firebase.isAuthenticated()){
				return (<Component {...hoc_props} {...props} history={history?history:null} ></Component>)
			}else{
				return (
					<Redirect to={{
						pathname:redirect_to,
						state: {from:props.location}
					}}>
					</Redirect>)
			}
		}
	}></Route>
);

class AppContainer extends React.Component{
	static childContextTypes = {
		uid:React.PropTypes.string
	}

	constructor(props){
		super(props);
	    this.props.setFirebaseRef(_firebase.firebaseRef);
	    this.state = {
	    	uid: null
	    }
	}

	componentDidMount(){
		_firebase.auth.onAuthStateChanged(user=>{
			if(user){
				this.props.setActiveUser(user.uid)
				window.localStorage.setItem('uid',user.uid);
				this.setState({uid:user.uid});
			}else{
				this.props.setActiveUser(null);
				window.localStorage.removeItem('uid');
				this.setState({uid:null});
			}
		})
	}

	getChildContext(){
		return {uid:this.state.uid};
	}

	render(){
		return (
			<BrowserRouter history={history}>
				<Layout {...this.props}>

					<RouteWrapper
						component={Dashboard}
						path="/dashboard" 
						redirect_to="/sign_in"  
						has_to_be_authenticated = {true}
						hoc_props={this.props} 
						></RouteWrapper>	

					<RouteWrapper
						exact
						component={Landing}
						path="/" 
						redirect_to="/dashboard"  
						has_to_be_authenticated = {false}
						hoc_props={this.props} 
						></RouteWrapper>

					<RouteWrapper
						component={ProfileSetUp}
						path="/profile_set_up" 
						redirect_to="/sign_in"  
						has_to_be_authenticated = {true}
						hoc_props={this.props} 
						></RouteWrapper>

					<RouteWrapper
						component={SignIn}
						path="/sign_in" 
						redirect_to="/dashboard"  
						has_to_be_authenticated = {false}
						hoc_props={this.props} 
						></RouteWrapper>

					<RouteWrapper
						component={SignUp}
						path="/sign_up" 
						redirect_to="/dashboard"  
						has_to_be_authenticated = {false}
						hoc_props={this.props}
						></RouteWrapper>

					<RouteWrapper
						component={ScratchPad}
						path="/scratch_pad" 
						has_to_be_authenticated = {false}
						hoc_props={this.props} 
						></RouteWrapper>

					<RouteWrapper
						component={Onboarding}
						path="/onboarding" 
						has_to_be_authenticated = {true}
						hoc_props={this.props} 
						></RouteWrapper>			
	
				</Layout>
			</BrowserRouter>
		)
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(ActionCreators,dispatch);
}

export default connect(()=>{return {}},mapDispatchToProps)(AppContainer)
