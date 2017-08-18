import React, {Component} from 'react';
import {connect} from 'react-redux';

import RecruiterCard from '../components/RecruiterCard';

class RecruiterActivity extends Component{
	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount(){
		this.props.fetchRecruiterWhoScannedYou();
	}

	componentWillReceiveProps(nextProps){
		const {recruiter_who_scanned_you} = nextProps;
		this.setState({recruiter_who_scanned_you})
	}
	render(){
		return(
			<div>
				<h4><b>Recruiters Who Scanned You</b></h4>
				<ul>
					{
						this.state.recruiter_who_scanned_you ?
						this.state.recruiter_who_scanned_you
						.map((recruiter)=>{
							return(
								<div clasName="hvr-shadow">
									<li clasName="col s12">
										<RecruiterCard {...recruiter}></RecruiterCard>
										</li>
										<hr/>
								</div>
								)
						}) : 
						<p>No body scanned your profile yet</p>
					}
				</ul>
			</div>
			
		);
	}
}

function mapsStateToProps(state){
	const {recruiter_who_scanned_you} = state;
	return {recruiter_who_scanned_you};
}

export default connect(mapsStateToProps)(RecruiterActivity);