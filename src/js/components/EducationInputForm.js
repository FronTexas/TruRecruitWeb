import React, {Component} from 'react';
import {connect} from 'react-redux';


import _ from 'underscore';
import Select from './Select';

class EducationInputForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			educations: this.props.educations == null ? [{
				school_begin_school_year: "2017",
				school_end_school_year: "2017",
			}] : this.props.educations
		}
	}

	componentWillReceiveProps(nextProps){
		const {educations} = nextProps;
		this.setState({educations});
	}

	handleAddMoreEducationClick(e){
		var educations = this.state.educations; 
		educations.push({
			school_begin_school_year: "2017",
			school_end_school_year: "2017",
		});
		this.setState({educations})
	}

	handleInputChange(e,index){
		var target = e.target;
		var field = target.name;
		var value = target.value;

		var educations = this.state.educations;
		educations[index][field] = value; 
		this.setState({educations});
	}

	render(){
		const educationInputView = this.state.educations.map((education,index)=>{
			return (
				<div>
					<label for="school">School</label>
					<input 
						value={education.school_name} 
						key={`school_name${index}`} 
						onChange={(e) => this.handleInputChange(e,index)} 
						type="text" name="school_name" 
						id="" cols="70" rows="1" placeholder="School you go to" maxLength="140" required="required"></input>

					<label for="school_date">Dates Attended</label>
					<br/>
					
					<div class="input-field col s12 m6">
						<Select 
							options= {_.range(1990,2018)} 
							key={`school_begin_school_year${index}`} 
							defaultValue={2017} 
							value={education.school_begin_school_year} 
							onChange={(e) => this.handleInputChange(e,index)} 
							name="school_begin_school_year" 
							class="years">
						</Select>
					</div>
					<div class="input-field col s12 m6">
						<Select options = {_.range(1990,2030)} id={index} key={`school_end_school_year${index}`}  defaultValue={2017} value={education.school_end_school_year} onChange={(e) => this.handleInputChange(e,index)}  name="school_end_school_year" class="years" ></Select>
					</div>

					<label for="degree">Degree</label>
					<input value={education.school_degree} id={index}  key={`school_degree_${index}`}  onChange={(e)=>this.handleInputChange(e,index)} type="text" name="school_degree" id="" cols="70" rows="1" placeholder="Degree" maxLength="140" required="required" class="materialize-input" type="text">
					</input>

					<label for="area_of_study">Area of Study</label>
					<input value={education.school_area_of_study} id={index} key={`school_area_of_study${index}`}  onChange={(e)=>this.handleInputChange(e,index)} type="text" name="school_area_of_study" id="" cols="70" rows="1" placeholder="Area of Study" maxLength="140" required="required">
					</input>
					{index != this.state.educations.length -1  ? <hr/> : ''}
				</div>
			)
		});
	  return (
	  	<div>
	  			{educationInputView}
	  			<button 
	  				className="waves-effect waves-light btn tr-blue"
	  				onClick={this.handleAddMoreEducationClick.bind(this)}
	  				>Add more education</button>
	  	</div>
	  	)
	}
}

function mapStateToProps(state){
	return {};
}

export default connect(mapStateToProps)(EducationInputForm);