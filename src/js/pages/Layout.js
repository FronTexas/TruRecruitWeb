import React from 'react';
import { Link } from 'react-router';

import Nav from '../components/layout/Nav';

export default class Layout extends React.Component{
	render(){
		return(
				<div>
					<Nav></Nav>
					<div className="row">
						<div className="col s12">
							{this.props.children}
						</div>
					</div>
				</div>
		)
	}
}

