import * as _firebase from '../lib/firebaseWrapper';
window._firebase = _firebase;
import history from '../lib/history';
import React from 'react';
import ReactDOM from 'react-dom';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Match,Redirect,Switch,Route} from 'react-router';



import Dashboard from './Dashboard';
import Landing from './Landing';
import Layout from './Layout';
import ProfileSetUp from './ProfileSetUp';
import SignIn from './SignIn';
import SignUp from './Signup';
import UidProvider from '../components/UidProvider';

const currently_not_need_this_check = false;

const RouteWhenAuthorized = ({component:Component,...rest,hoc_props}) => (
	<Route {...rest} render={props=>(		
		_firebase.isAuthenticated() || currently_not_need_this_check ? (
			<Component {...hoc_props} {...props} ></Component>
		) : (
			<Redirect to={{
				pathname:'/sign_in',
				state: {from:props.location}
			}}>
			</Redirect>
		)
	)}></Route>
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
				<Layout>
					<Route exact path="/" render={(props) =><Landing {...this.props} {...props}></Landing>}></Route>					
					<Route path="/sign_up" render={(props) => <SignUp {...this.props} {...props}></SignUp>}></Route>
					<Route path="/sign_in" render={(props) => <SignIn{...this.props} {...props}></SignIn>}></Route>
					<RouteWhenAuthorized path="/profile_set_up" hoc_props={this.props} component={ProfileSetUp}></RouteWhenAuthorized>
					<RouteWhenAuthorized path="/dashboard" hoc_props={this.props} component={Dashboard}></RouteWhenAuthorized>
				</Layout>
			</BrowserRouter>
		)
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(ActionCreators,dispatch);
}

export default connect(()=>{return {}},mapDispatchToProps)(AppContainer)
