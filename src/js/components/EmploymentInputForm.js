import React, {Component} from 'react';
import {connect} from 'react-redux';


import _ from 'underscore';
import month from 'month';
import us from 'us';	
import Select from './Select';
import InputWithValidation from '../components/InputWithValidation';


export default class EmploymentInputForm extends Component{
	constructor(props){
		super(props);
		this.state = {}
	}

	render(){
		const months = _.map(_.range(1,12),(i)=>{return month(i)});
		const employmentInputView = this.props.employments.map((employment,index)=>{
			return (
				<div key={`employment${index}`}>
					<div class="col m12 s12">
						<label for="company">Company</label>
						<InputWithValidation
							value={employment.company_name} 
							key={`company_name${index}`} 
							onFieldChanged={this.props.onFieldsArrayChange(index)}
							showError={this.props.showError}
							errorText={this.props.errorTexts[index] ? this.props.errorTexts[index]['company_name'] : ''}
							type="text"
							name="company_name"
							id="" cols="70" rows="1" required="required"
						>
						</InputWithValidation>

						<label for="title">Title</label>
						<InputWithValidation
							value={employment.company_title} 
							key={`company_title${index}`} 
							onFieldChanged={this.props.onFieldsArrayChange(index)}
							showError={this.props.showError}
							errorText={this.props.errorTexts[index] ? this.props.errorTexts[index]['company_title'] : ''}
							type="text"
							name="company_title"
							id="" cols="70" rows="1" required="required"
						>
						</InputWithValidation>

						<label>Dates Attended</label>
						<Select 
							options = {months} 
							key={`company_begin_month_employment${index}`} 
							value={employment.company_begin_month_employment} 
							onChange={this.props.onFieldsArrayChange(index)} 
							name="company_begin_month_employment" 
							class="months"></Select>
						<Select 
							options = {_.range(1990,2018)} 
							key={`company_begin_year_employment${index}`} 
							selected={2017} 
							value={employment.company_begin_year_employment} 
							onChange={this.props.onFieldsArrayChange(index)} 
							name="company_begin_year_employment" 
							class="years"></Select>
						<Select 
							options = {months} 
							key={`company_end_month_employment${index}`}  
							value={employment.company_end_month_employment} 
							onChange={this.props.onFieldsArrayChange(index)} 
							name="company_end_month_employment" 
							class="months"></Select>
						<Select 
							options = {_.range(1990,2018)} 
							key={`company_end_year_employment${index}`}  
							selected={2017} 
							value={employment.company_end_year_employment} 
							onChange={this.props.onFieldsArrayChange(index)} 
							name="company_end_year_employment" 
							class="years"></Select>


						<label class="col s12 m6">Location</label>
						<InputWithValidation
							value={employment.company_employment_city} 
							key={`company_employment_city${index}`} 
							onFieldChanged={this.props.onFieldsArrayChange(index)}
							showError={this.props.showError}
							errorText={this.props.errorTexts[index] ? this.props.errorTexts[index]['company_employment_city'] : ''}
							type="text"
							name="company_employment_city"
							id="" cols="70" rows="1" required="required"
						>
						</InputWithValidation>
						<Select 
							options={_.map(us.mapping('fips','name'),(name,fips) => {return name}).sort()} 
							key={`company_employment_state${index}`} 
							value={employment.company_employment_state} 
							onChange={this.props.onFieldsArrayChange(index)} 
							name="company_employment_state" id="employment_state">
						</Select>
					</div>
					{index != this.props.employments.length -1  ? <hr/> : ''}
				</div>
			)
		});
	  return (
	  	<div>
	  			{employmentInputView}
	  			<button 
	  				className="waves-effect waves-light btn tr-blue"
	  				onClick={this.props.onAddMoreFields}
	  				>Add more Employment</button>
	  	</div>
	  	)
	}
}