import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ReactPhoneInput from 'react-phone-input';

import _ from 'underscore';
import EditProfilePicture from '../components/EditProfilePicture';
import EducationInputForm from '../components/EducationInputForm';
import EmploymentInputForm from '../components/EmploymentInputForm';
import Select from '../components/Select';
import TextField from '../components/TextField'
import update from 'immutability-helper';
import {run,ruleRunner} from '../lib/Validation/ruleRunner'
import {required} from '../lib/Validation/rules';
import $ from 'jquery'

const fieldValidations = [
	ruleRunner("summary","Summary",required)
]

class ProfileSetUp extends React.Component{
	constructor(props){
		super(props);
		this.handleFieldChanged = this.handleFieldChanged.bind(this);
		this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
		this.errorFor = this.errorFor.bind(this);
		this.state = {
			showErrors: false,
			validationErrors:{}
		};
	}

	componentDidMount(){
		this.props.fetchActiveUserProfile();
	}

	componentWillMount(){
		this.setState({validationErrors: run(this.state,fieldValidations)});
	}

	componentWillReceiveProps(nextProps){
		var {upload_file_success,update_user_profile_success,active_user_profile} = nextProps;
		
		if(active_user_profile != null){
			let new_state = this.state;
			new_state['active_user_profile'] = active_user_profile;
			new_state['validationErrors'] = run(new_state['active_user_profile'], fieldValidations);
			new_state['showErrors'] = true;
			this.setState(new_state)
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

	errorFor(field){
		return this.state.validationErrors[field] || "";
	}

	handleFieldChanged(field){
		return (e) => {
			let newState = update(this.state,{
				active_user_profile:{ 
					[field]: {$set: e.target.value}
				}
			});
			newState.validationErrors = run(newState['active_user_profile'],fieldValidations);
			this.setState(newState)
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

	handleSubmitClicked(){
		this.setState({showErrors:true});
		if($.isEmptyObject(this.state.validationErrors) === false) return null;
		// handle success
	}

	/*
		- Replace each field with react-form
		- Handle data validation 
		- Handle state's update 
		- Handle data posting to firebase 
	*/

	render(){
		const {active_user_profile} = this.state
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
							<TextField
								id="summary"
								type="text"
								name="summary"
								value={active_user_profile ? active_user_profile.summary : ''} 
								onFieldChanged={this.handleFieldChanged("summary")}
								cols="70"
								row="2"
								placeholder="Graduating December 2017 from UT Austin" 
								maxLength="140"
								errorText={this.errorFor("summary")}
								showError={this.state.showErrors}
							>
							</TextField>

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
							<button type="button" class="waves-effect waves-light btn tr-green" onClick={this.handleSubmitClicked}>{this.state.show_saved_text ? 'Saved!' : 'Save'}</button>
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