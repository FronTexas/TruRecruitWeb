import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

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
	ruleRunner("phone_number","Phone Number",required),
	ruleRunnerOnFormArray("educations","school_name","School name",required),
	ruleRunnerOnFormArray("educations","school_degree","Degree",required),
	ruleRunnerOnFormArray("educations","school_area_of_study","Area of study",required)
]

/*
	A set of fields with it's default value
*/
const ACTIVE_USER_PROFILE_DEFAULT_VALUES = {
	educations:[{
		school_begin_school_year: '2017',
		school_end_school_year:'2017'
	}]
}

class ProfileSetUp extends React.Component{
	constructor(props){
		super(props);
		this.handleAddMoreFields = this.handleAddMoreFields.bind(this);
		this.handleFieldsArrayChange = this.handleFieldsArrayChange.bind(this);
		this.handleFieldChanged = this.handleFieldChanged.bind(this);
		this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
		this.handleSaveClick = this.handleSaveClick.bind(this);
		this.formatNumber = this.formatNumber.bind(this);
		this.updateStatesActiveUserProfile = this.updateStatesActiveUserProfile.bind(this);

		this.inputProcessor = {
			"phone_number": this.formatNumber
		}

		this.errorFor = this.errorFor.bind(this);
		this.state = {
			showErrors: false,
			validationErrors:run(ACTIVE_USER_PROFILE_DEFAULT_VALUES, fieldValidations),
			active_user_profile: ACTIVE_USER_PROFILE_DEFAULT_VALUES
		};
	}

	componentDidMount(){
		// Just when the ProfileSetUp is mounted, it has to run validation againts empty object so that every field has error
		this.props.fetchActiveUserProfile();
	}

	componentWillReceiveProps(nextProps){
		var {upload_file_success,update_user_profile_success,active_user_profile} = nextProps;
		
		if(active_user_profile != null){
			let new_active_user_profile = {...this.state.active_user_profile,...active_user_profile}
			this.updateStatesActiveUserProfile(new_active_user_profile)
			this.setState({
				showErrors: active_user_profile.is_profile_set_up_already,
			})
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

	formatNumber(input){
        // Strip all characters from the input except digits
        input = input.replace(/\D/g,'');

        // Trim the remaining input to ten characters, to preserve phone number format
        input = input.substring(0,10);

        // Based upon the length of the string, we add formatting as necessary
        var size = input.length;
        if(size == 0){
                input = input;
        }else if(size < 4){
                input = '('+input;
        }else if(size < 7){
                input = '('+input.substring(0,3)+') '+input.substring(3,6);
        }else{
                input = '('+input.substring(0,3)+') '+input.substring(3,6)+' - '+input.substring(6,10);
        }
        return input; 
	}

	handleAddMoreFields(field,defaultVal){
		return (e)=>{
			if(!this.state.active_user_profile) return
			let fields = this.state.active_user_profile[field];
			fields.push(defaultVal)
			let new_active_user_profile = {...this.state.active_user_profile,[field]:fields}
			this.updateStatesActiveUserProfile(new_active_user_profile)
		}
	}

	handleFieldsArrayChange(field_name){
		return (index)=>{
				return (e) => {
					let name = e.target.name;
					let value = e.target.value;
					/* 
						If the field with key of 'field_name' does not exist in active user profile,
						it defaulted to array with with one empty object
					*/
					if(!this.state.active_user_profile) return
					
					let newFields = this.state.active_user_profile[field_name] || [{}];
					
					if(index in newFields){
						newFields[index][name] = value;
					}
					let new_active_user_profile = {...this.state.active_user_profile,[field_name]:newFields};
					this.updateStatesActiveUserProfile(new_active_user_profile);
				}
		}
	}

	handleFieldChanged(field){
		return (e) => {
			let value = e.target.value;
			if (field in this.inputProcessor){
				value = this.inputProcessor[field](value)
			}
			let new_active_user_profile = {...this.state.active_user_profile,[field]:value}
			this.updateStatesActiveUserProfile(new_active_user_profile)
		}
	}

	handleFileUploadChange(event){
		const file = event.target.files[0];
		if (!this.state.active_user_profile) return 
		let new_active_user_profile = {...this.state.active_user_profile,['resume_url']:file};
		this.updateStatesActiveUserProfile(new_active_user_profile);
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
		let new_active_user_profile = {...this.state.active_user_profile,phone_number:phone}
		this.updateStatesActiveUserProfile(new_active_user_profile)
	}

	handleSaveClick(event){
		this.setState({showErrors:true});
		console.log('validationErrors = ',this.state.validationErrors);
		if($.isEmptyObject(this.state.validationErrors) === false) return null;

		let active_user_profile_to_be_dispatched = this.state.active_user_profile;
		active_user_profile_to_be_dispatched['is_profile_set_up_already'] = true;
		
		this.props.updateUserProfile(active_user_profile_to_be_dispatched);
		
		if(active_user_profile_to_be_dispatched.resume_url){
			this.props.uploadResume(active_user_profile_to_be_dispatched.resume_url);
		}
	}

	updateStatesActiveUserProfile(new_active_user_profile){
		this.setState({
				active_user_profile: new_active_user_profile,
				validationErrors:run(new_active_user_profile,fieldValidations)
		})
	}

	render(){
		const {active_user_profile} = this.state;
		let phone_number = ''
		if (active_user_profile){
			phone_number = active_user_profile.phone_number;
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
								<InputWithValidation
									type="text"
									name="phone_number"
									value={phone_number ? phone_number : ''}
									onFieldChanged = {this.handleFieldChanged("phone_number")}
									errorText={this.errorFor("phone_number")}
									showError={this.state.showErrors}
								>
								</InputWithValidation>
							</div>

							<p><b>Education</b></p>
							<EducationInputForm 
								{...this.props} 
								educations = {active_user_profile && active_user_profile.educations ?  active_user_profile.educations : [{
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
								<input value={active_user_profile ? active_user_profile.portfolio_link : ''} onChange={this.handleFieldChanged("portfolio_link")} type="text" name="portfolio_link" id="" cols="30" rows="1" placeholder="link to portfolio">
							</input>
							<button type="button" class="waves-effect waves-light btn tr-green" onClick={this.handleSaveClick}>{this.state.show_saved_text ? 'Saved!' : 'Save'}</button>
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