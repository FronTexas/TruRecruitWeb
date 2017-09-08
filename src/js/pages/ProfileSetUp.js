import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ReactPhoneInput from 'react-phone-input';

import _ from 'underscore';
import EditProfilePicture from '../components/EditProfilePicture';
import EducationInputForm from '../components/EducationInputForm';
import EmploymentInputForm from '../components/EmploymentInputForm';
import Select from '../components/Select';

class ProfileSetUp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
		};
	}

	componentDidMount(){
		this.props.fetchActiveUserProfile();
	}

	componentWillReceiveProps(nextProps){
		var {upload_file_success,update_user_profile_success,active_user_profile} = nextProps;
		
		if(active_user_profile != null){
			this.setState({active_user_profile})
		}

		if(update_user_profile_success){
			this.setState({show_saved_text:true})
			setTimeout(()=>{
				this.setState({show_saved_text:false})
			},1000)
		}

		if(upload_file_success && update_user_profile_success){
			this.props.push('/dashboard');
		}
	}


	handleFileUpload(event){
		const file = event.target.files[0];
		this.setState({
			private:{
				resume: file
			}
		})
	}

	handleInputChange(event){
		var target = event.target;
		var name = target.name;
		var value = target.value;

		this.setState({
			[name]:value
		});	
	}

	handlePhoneNumberChange(phone){
		this.setState({
			active_user_profile:{
				phone_number:phone
			}
		});
	}

	handleSaveClick(event){
		this.props.updateUserProfile(this.state.active_user_profile);
		if(this.state.resume){
			this.props.uploadResume(this.state.resume);
		}
		
	}

	/*
		- Replace each field with react-form
		- Handle data validation 
		- Handle state's update 
		- Handle data posting to firebase 
	*/

	render(){
		const {active_user_profile} = this.state
		console.log('active_user_profile in ProfileSetUp = ',active_user_profile)
		const phone_number = null;
		if (active_user_profile){
			const phone_number = active_user_profile.phone_number;
		}
		return (
			<div className="row">
				<div class="col l12 tr-gray center-horizontal">
					<div class="card card-width-medium form-box form-box-profile-set-up">
						<p class="tr-green-text" id="set-up-profile-text">Set up your profile</p>
						<EditProfilePicture
							active_user_profile={active_user_profile}
							{...this.props}
						></EditProfilePicture>
						<form method="post">
							<p><b>Upload Resume</b></p>
							<div class="file-field input-field">
						      <div class="btn tr-green">
						        <span>File</span>
						        <input type="file" onChange={this.handleFileUpload.bind(this)}></input>
						      </div>
						      <div class="file-path-wrapper">
						        <input class="file-path validate" type="text">
						        </input>
						      </div>
						    </div>
							<p><b>Summary</b></p>
							<input value={active_user_profile ? active_user_profile.summary : ''} onChange={this.handleInputChange.bind(this)} type="text" name="summary" id="" cols="70" rows="2" placeholder="Graduating December 2017 from UT Austin" maxLength="140" required="required"></input>

							<div className="input-phone-number">
								<p><b>Phone Number</b></p>
								<ReactPhoneInput 
									value={active_user_profile ? active_user_profile.phone_number : ''} 
									defaultCountry={'us'} 
									onChange={this.handlePhoneNumberChange.bind(this)}></ReactPhoneInput>,
							</div>

							<p><b>Education</b></p>
							<EducationInputForm {...this.props} educations = {active_user_profile ?  active_user_profile.educations : null}></EducationInputForm>

							<p><b>Employment History</b></p>

							<EmploymentInputForm {...this.props} employments={active_user_profile ? active_user_profile.employments : null}></EmploymentInputForm>

							<p><b>Portfolio Link</b></p>
							<input value={active_user_profile ? active_user_profile.portfolio_link : ''} onChange={this.handleInputChange.bind(this)} type="text" name="portfolio_link" id="" cols="30" rows="1" placeholder="link to portfolio">
							</input>
							<button type="button" class="waves-effect waves-light btn tr-green" onClick={this.handleSaveClick.bind(this)}>{this.state.show_saved_text ? 'Saved!' : 'Save'}</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	const {upload_file_success,update_user_profile_success,active_user_profile} = state;
	return {upload_file_success,update_user_profile_success,active_user_profile}
}

export default connect(mapStateToProps)(ProfileSetUp);