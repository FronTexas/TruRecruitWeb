import React from 'react';
import {Link} from 'react-router-dom';

export default class ProfileSetUp extends React.Component{
	render(){
		return (
			<div class="col s12 tr-gray center-horizontal">
				<div class="card large card-width-medium setup-profile-card">
					<p class="tr-green-text" id="set-up-profile-text">Set up your profile</p>
					<form action="<?php echo $script?>" method="post">
						<p>Summary</p>
						<input type="text" name="summary" id="" cols="70" rows="2" placeholder="Graduating December 2017 from UT Austin" maxLength="140" required="required"></input>

						<p>Education</p>

						<label for="school">School</label>
						
						<input type="text" name="school[name]" id="" cols="70" rows="1" placeholder="School you go to" maxLength="140" required="required"></input>

						<label for="school_date">Dates Attended</label>
						<div class="input-field col s12 m6">
							<select name="school[begin_school_year]" class="years" value="2017"></select>
						</div>
						<div class="input-field col s12 m6">
							<select name="school[end_school_year]" class="years" value="2017"></select>
						</div>

						<label for="degree">Degree</label>
						<input type="text" name="school[degree]" id="" cols="70" rows="1" placeholder="Degree" maxLength="140" required="required" class="materialize-input" type="text">
						</input>

						<label for="area_of_study">Area of Study</label>
						<input type="text" name="school[area_of_study]" id="" cols="70" rows="1" placeholder="Area of Study" maxLength="140" required="required">
						</input>

						<p>Employment History</p>

						<label for="company">Company</label>
						<input type="text" name="company[name]" id="" cols="70" rows="1" required="required">
						</input>

						<label for="title">Title</label>
						<input type="text" name="company[title]" id="" cols="70" rows="1" required="required">
						</input>

						<label for="employment_date">Dates Attended</label>
						<select name="company[begin_month_employment]" class="months"></select>
						<select name="company[begin_year_employment]" class="years" value="2017"></select>
						<select name="company[end_month_employment]" class="months"></select>
						<select name="company[end_year_employment]" class="years" value="2017"></select>

						<label for="Location">Location</label>
						<input type="text" name="company[employment_city]" id="" cols="30" rows="1" placeholder="City" required="required">
						</input>
						<select name="company[employment_state]" id="employment_state">
							
						</select>

						<p>Portfolio Link</p>
						<input type="text" name="portfolio_link" id="" cols="30" rows="1" placeholder="link to portfolio">
						</input>

						<p>Upload Resume</p>
						<div class="file-field input-field">
					      <div class="btn tr-green">
					        <span>File</span>
					        <input type="file"></input>
					      </div>
					      <div class="file-path-wrapper">
					        <input class="file-path validate" type="text">
					        </input>
					      </div>
					    </div>

						<Link to="dashboard" class="waves-effect waves-light btn tr-green">Save</Link>
					</form>
				</div>
			</div>
		)
	}
}