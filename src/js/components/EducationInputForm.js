import React, {Component} from 'react';
import {connect} from 'react-redux';


import _ from 'underscore';
import Select from './Select';
import InputWithValidation from '../components/InputWithValidation';

export default class EducationInputForm extends Component{
	constructor(props){
		super(props);
	}


	render(){
		const educationInputView = this.props.educations.map((education,index)=>{
			return (
				<div>
					<label for="school">School</label>
					<InputWithValidation 
						value={education.school_name} 
						key={`school_name${index}`} 
						onFieldChanged={this.props.onFieldsArrayChange(index)} 
						showError={this.props.showError}
						errorText={this.props.errorTexts[index] ? this.props.errorTexts[index]['school_name'] : ''}
						type="text" 
						name="school_name" 
						id="" cols="70" rows="1" placeholder="School you go to" maxLength="140" required="required">
					</InputWithValidation>

					<label for="school_date">Dates Attended</label>
					<br/>
					
					<div class="input-field col s12 m6">
						<Select 
							options= {_.range(1990,2018)} 
							key={`school_begin_school_year${index}`} 
							defaultValue={2017} 
							value={education.school_begin_school_year} 
							onChange={this.props.onFieldsArrayChange} 
							name="school_begin_school_year" 
							class="years">
						</Select>
					</div>
					<div class="input-field col s12 m6">
						<Select 
							options = {_.range(1990,2030)} 
							id={index} 
							key={`school_end_school_year${index}`}  
							defaultValue={2017} 
							value={education.school_end_school_year} 
							onChange={this.props.onFieldsArrayChange}  
							name="school_end_school_year" class="years" ></Select>
					</div>

					<label for="degree">Degree</label>
					<InputWithValidation 
						value={education.school_degree} 
						key={`school_degree_${index}`}  
						onFieldChanged={this.props.onFieldsArrayChange(index)} 
						showError={this.props.showError}
						errorText={this.props.errorTexts[index] ? this.props.errorTexts[index]['school_degree'] : ''}
						type="text" 
						name="school_degree"
						id="" 
						cols="70" rows="1" 
						placeholder="Degree" 
						maxLength="140" >
					</InputWithValidation>

					<label for="area_of_study">Area of Study</label>
					<InputWithValidation 
						value={education.school_area_of_study} 
						id={index} 
						key={`school_area_of_study${index}`}  
						onFieldChanged={this.props.onFieldsArrayChange(index)} 
						showError={this.props.showError}
						errorText={this.props.errorTexts[index] ? this.props.errorTexts[index]['school_area_of_study'] : ''}
						type="text" 
						name="school_area_of_study" 
						id="" 
						cols="70" 
						rows="1" 
						placeholder="Area of Study" 
						maxLength="140">
					</InputWithValidation>
					{index != this.props.educations.length -1  ? <hr/> : ''}
				</div>
			)
		});
	  return (
	  	<div>
	  			{educationInputView}
	  			<button 
	  				type="button"
	  				className="waves-effect waves-light btn tr-blue"
	  				onClick={this.props.onAddMoreFields}
	  				>Add more education</button>
	  	</div>
	  	)
	}
}