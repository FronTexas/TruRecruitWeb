import React from 'react';
import ReactDOM from 'react-dom';
import { 
	Switch, 
	Route
} from 'react-router';
import {
	BrowserRouter,
} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Layout from './pages/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProfileSetUp from './pages/ProfileSetUp';

const app = document.getElementById("app");
console.log(app);

ReactDOM.render(
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
,app);


