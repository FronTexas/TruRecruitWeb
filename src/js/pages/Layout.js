import React from 'react';
import { Link } from 'react-router';
import {withRouter} from 'react-router';

import Nav from '../components/layout/Nav';

const NavWrapped = withRouter(props=><Nav{...props}></Nav>);

export default class Layout extends React.Component{
	render(){
		return(
				<div class="tr-gray main-container">
					<NavWrapped {...this.props}>></NavWrapped>					
					<div className="col s12">
						{this.props.children}
					</div>
				</div>
		)
	}
}

