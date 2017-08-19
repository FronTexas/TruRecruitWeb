import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import _ from 'underscore';
import month from 'month';
import us from 'us';	

import Select from '../components/Select';

class ProfileSetUp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			school_begin_school_year: "2017",
			school_end_school_year: "2017",
			company_begin_month_employment:'January',
			company_begin_year_employment: "2017",
			company_end_month_employment:'January',
			company_end_year_employment:"2017",
			company_employment_state:'Alaska'
		};
	}

	componentWillReceiveProps(nextProps){
		const {upload_file_success,update_user_profile_success} = nextProps;
		if(upload_file_success && update_user_profile_success){
			this.props.push('/dashboard');
		}
	}

	handleFileUpload(event){
		const file = event.target.files[0];
		this.setState({
			resume: file
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

	handleSaveClick(event){
		console.log(this.state);
		this.props.updateUserProfile(this.state);
		if(this.state.resume){
			this.props.uploadResume(this.state.resume);
		}
	}

	render(){
		const months = _.map(_.range(1,12),(i)=>{return month(i)});
		return (
			<div class="col s12 tr-gray center-horizontal">
				<div class="card large card-width-medium form-box form-box-profile-set-up">
					<p class="tr-green-text" id="set-up-profile-text">Set up your profile</p>
					<form method="post">
						<p>Upload Resume</p>
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
						<p>Summary</p>
						<input value={this.state.summary} onChange={this.handleInputChange.bind(this)} type="text" name="summary" id="" cols="70" rows="2" placeholder="Graduating December 2017 from UT Austin" maxLength="140" required="required"></input>

						<p>Education</p>

						<label for="school">School</label>
						
						<input value={this.state.school_name} onChange={this.handleInputChange.bind(this)} type="text" name="school_name" id="" cols="70" rows="1" placeholder="School you go to" maxLength="140" required="required"></input>

						<label for="school_date">Dates Attended</label>
						<br/>
						<div class="input-field col s12 m6">
							<Select options= {_.range(1990,2018)} defaultValue={2017} value={this.state.school_begin_school_year} onChange={this.handleInputChange.bind(this)} name="school_begin_school_year" class="years">
							</Select>
						</div>
						<div class="input-field col s12 m6">
							<Select options = {_.range(1990,2030)} defaultValue={2017} value={this.state.school_end_school_year} onChange={this.handleInputChange.bind(this)} name="school_end_school_year" class="years" ></Select>
						</div>

						<label for="degree">Degree</label>
						<input value={this.state.school_degree} onChange={this.handleInputChange.bind(this)} type="text" name="school_degree" id="" cols="70" rows="1" placeholder="Degree" maxLength="140" required="required" class="materialize-input" type="text">
						</input>

						<label for="area_of_study">Area of Study</label>
						<input value={this.state.school_area_of_study} onChange={this.handleInputChange.bind(this)} type="text" name="school_area_of_study" id="" cols="70" rows="1" placeholder="Area of Study" maxLength="140" required="required">
						</input>

						<p>Employment History</p>

						<label for="company">Company</label>
						<input value={this.state.company_name} onChange={this.handleInputChange.bind(this)}  type="text" name="company_name" id="" cols="70" rows="1" required="required">
						</input>

						<label for="title">Title</label>
						<input value={this.state.company_title} onChange={this.handleInputChange.bind(this)} type="text" name="company_title" id="" cols="70" rows="1" required="required">
						</input>

						<label for="employment_date">Dates Attended</label>
						<Select options = {months} value={this.state.company_begin_month_employment} onChange={this.handleInputChange.bind(this)} name="company_begin_month_employment" class="months"></Select>
						<Select options = {_.range(1990,2018)} selected={2017} value={this.state.company_begin_year_employment} onChange={this.handleInputChange.bind(this)} name="company_begin_year_employment" class="years"></Select>
						<Select options = {months}  value={this.state.company_end_month_employment} onChange={this.handleInputChange.bind(this)} name="company_end_month_employment" class="months"></Select>
						<Select options = {_.range(1990,2018)} selected={2017} value={this.state.company_end_year_employment} onChange={this.handleInputChange.bind(this)} name="company_end_year_employment" class="years"></Select>

						<label>Location</label>
						<input value={this.state.company_employment_city} onChange={this.handleInputChange.bind(this)} type="text" name="company_employment_city" id="" cols="30" rows="1" placeholder="City" required="required">
						</input>
						<Select options={_.map(us.mapping('fips','name'),(name,fips) => {return name}).sort()} value={this.state.company_employment_state} onChange={this.handleInputChange.bind(this)} name="company_employment_state" id="employment_state">
							
						</Select>

						<p>Portfolio Link</p>
						<input value={this.state.portfolio_link} onChange={this.handleInputChange.bind(this)} type="text" name="portfolio_link" id="" cols="30" rows="1" placeholder="link to portfolio">
						</input>
						<button type="button" class="waves-effect waves-light btn tr-green" onClick={this.handleSaveClick.bind(this)}>Save</button>
					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	const {upload_file_success,update_user_profile_success} = state;
	return {upload_file_success,update_user_profile_success}
}

export default connect(mapStateToProps)(ProfileSetUp);