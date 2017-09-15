import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ReactPhoneInput from 'react-phone-input';

import _ from 'underscore';
import EditProfilePicture from '../components/EditProfilePicture';
import EducationInputForm from '../components/EducationInputForm';
import EmploymentInputForm from '../components/EmploymentInputForm';
import Select from '../components/Select';
import InputWithValidation from '../components/InputWithValidation'
import update from 'immutability-helper';
import {run,ruleRunner,ruleRunnerOnFormArray} from '../lib/Validation/ruleRunner'
import {required} from '../lib/Validation/rules';
import $ from 'jquery'

const fieldValidations = [
	ruleRunner("summary","Summary",required),
	ruleRunner("resume_url","Resume",required),
	ruleRunnerOnFormArray("educations","school_name","School name",required),
	ruleRunnerOnFormArray("educations","school_degree","Degree",required),
	ruleRunnerOnFormArray("educations","school_area_of_study","Area of study",required)
]

class ProfileSetUp extends React.Component{
	constructor(props){
		super(props);
		this.handleAddMoreFields = this.handleAddMoreFields.bind(this);
		this.handleFieldsArrayChange = this.handleFieldsArrayChange.bind(this);
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
			this.props.resetUploadStatus();
			this.props.resetUpdateUserProfileStatus();
			this.props.push('/dashboard');
		}
	}

	errorForArrayForm(field){
		return this.state.validationErrors[field] || [];
	}

	errorFor(field){
		return this.state.validationErrors[field] || "";
	}

	handleAddMoreFields(field,defaultVal){
		return (e)=>{
			if(!this.state.active_user_profile) return
			let fields = this.state.active_user_profile[field];
			fields.push(defaultVal)
			this.setState({active_user_profile:{[field]:fields}})
		}
	}

	handleFieldsArrayChange(field_name){
		return (index)=>{
				return (e) => {
					let name = e.target.name;
					let value = e.target.value;
					let newState = this.state; 
					let newFields = newState['active_user_profile'][field_name];
					newFields[index][name] = value;
					newState['active_user_profile'][field_name] = newFields
					newState.validationErrors = run(newState['active_user_profile'],fieldValidations);
					this.setState(newState)
				}
		}
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

	handleFileUploadChange(event){
		const file = event.target.files[0];
		let newState = this.state;
		newState['active_user_profile']['resume_url'] = file;
		newState['validationErrors'] = run(newState['active_user_profile'],fieldValidations);
		this.setState(newState);
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
		if(this.state.active_user_profile.resume_url){
			this.props.uploadResume(this.state.active_user_profile.resume_url);
		}
		
	}

	handleSubmitClicked(){
		this.setState({showErrors:true});
		console.log('valudationErrors = ',this.state.validationErrors);
		if($.isEmptyObject(this.state.validationErrors) === false) return null;
		if(this.state.active_user_profile && this.state.active_user_profile.resume_url){
			this.props.uploadResume(this.state.active_user_profile.resume_url);
		}
	}

	render(){
		const {active_user_profile} = this.state;
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
						<div>
							<p><b>Upload Resume</b></p>
							<div class="file-field input-field">
						      <InputWithValidation
						      	type="file"
						      	errorText={this.errorFor("resume_url")}
      							showError={this.state.showErrors}
						      	onFieldChanged={this.handleFileUploadChange.bind(this)}
						      	>
						      	<div class="btn tr-green">
							        <span>File</span>
							      </div>
							      <div class="file-path-wrapper">
							        <input class="file-path validate" type="text">
							        </input>
						      	</div>
						      </InputWithValidation>
						      
						    </div>
							<p><b>Summary</b></p>

							<InputWithValidation
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
							</InputWithValidation>

							<div className="input-phone-number">
								<p><b>Phone Number</b></p>
								<ReactPhoneInput 
									value={active_user_profile ? active_user_profile.phone_number : ''} 
									defaultCountry={'us'} 
									onChange={this.handlePhoneNumberChange.bind(this)}></ReactPhoneInput>,
							</div>

							<p><b>Education</b></p>
							<EducationInputForm 
								{...this.props} 
								educations = {active_user_profile ?  active_user_profile.educations : [{
									school_begin_school_year: "2017",
									school_end_school_year: "2017"
								}]} 
								onFieldsArrayChange={this.handleFieldsArrayChange("educations")}
								onAddMoreFields={this.handleAddMoreFields("educations",{
									school_begin_school_year: "2017",
									school_end_school_year: "2017"
								})}
								errorTexts={this.errorForArrayForm("educations")}
								showError={this.state.showErrors}
								></EducationInputForm>

							<p><b>Portfolio Link</b></p>
							<input value={active_user_profile ? active_user_profile.portfolio_link : ''} onChange={this.handleInputChange.bind(this)} type="text" name="portfolio_link" id="" cols="30" rows="1" placeholder="link to portfolio">
							</input>
							<button type="button" class="waves-effect waves-light btn tr-green" onClick={this.handleSubmitClicked}>{this.state.show_saved_text ? 'Saved!' : 'Save'}</button>
						</div>
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