import React, {Component} from 'react';
import {connect} from 'react-redux';


import _ from 'underscore';
import month from 'month';
import us from 'us';	
import Select from './Select';

class EmploymentInputForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			employments: this.props.employments!=null ? this.props.employments : [{
			   "company_begin_month_employment":"January",
               "company_begin_year_employment":"2017",
               "company_end_month_employment":"January",
               "company_end_year_employment":"2017",
			}]
		}
	}

	componentWillReceiveProps(nextProps){
		const {employments} = nextProps;
		this.setState({employments});
	}

	handleAddMoreEmploymentClick(e){
		var employments = this.state.employments; 
		employments.push({
			"company_begin_month_employment":"January",
            "company_begin_year_employment":"2017",
            "company_end_month_employment":"January",
            "company_end_year_employment":"2017",
		});
		this.setState({employments})
	}

	handleInputChange(e,index){
		var target = e.target;
		var field = target.name;
		var value = target.value;

		var employments = this.state.employments;
		employments[index][field] = value; 
		this.setState({employments});
	}

	render(){
		const months = _.map(_.range(1,12),(i)=>{return month(i)});
		const employmentInputView = this.state.employments.map((employment,index)=>{
			return (
				<div>
					<label for="company">Company</label>
					<input value={employment.company_name} key={`company_name${index}`} onChange={(e)=>this.handleInputChange(e,index)}  type="text" name="company_name" id="" cols="70" rows="1" required="required">
					</input>

					<label for="title">Title</label>
					<input value={employment.company_title} key={`company_title${index}`} onChange={(e)=>this.handleInputChange(e,index)} type="text" name="company_title" id="" cols="70" rows="1" required="required">
					</input>

					<label for="employment_date">Dates Attended</label>
					<Select options = {months} key={`company_begin_month_employment${index}`} value={employment.company_begin_month_employment} onChange={(e)=>this.handleInputChange(e,index)} name="company_begin_month_employment" class="months"></Select>
					<Select options = {_.range(1990,2018)} key={`company_begin_year_employment${index}`} selected={2017} value={employment.company_begin_year_employment} onChange={(e)=>this.handleInputChange(e,index)} name="company_begin_year_employment" class="years"></Select>
					<Select options = {months} key={`company_end_month_employment${index}`}  value={employment.company_end_month_employment} onChange={(e)=>this.handleInputChange(e,index)} name="company_end_month_employment" class="months"></Select>
					<Select options = {_.range(1990,2018)} key={`company_end_year_employment${index}`}  selected={2017} value={employment.company_end_year_employment} onChange={(e)=>this.handleInputChange(e,index)} name="company_end_year_employment" class="years"></Select>

					<label>Location</label>
					<input value={employment.company_employment_city} key={`company_employment_city${index}`} onChange={(e)=>this.handleInputChange(e,index)} type="text" name="company_employment_city" id="" cols="30" rows="1" placeholder="City" required="required">
					</input>
					<Select options={_.map(us.mapping('fips','name'),(name,fips) => {return name}).sort()} key={`company_employment_state${index}`} value={employment.company_employment_state} onChange={(e)=>this.handleInputChange(e,index)} name="company_employment_state" id="employment_state">
					</Select>
					{index != this.state.employments.length -1  ? <hr/> : ''}
				</div>
			)
		});
	  return (
	  	<div>
	  			{employmentInputView}
	  			<button 
	  				className="waves-effect waves-light btn tr-blue"
	  				onClick={this.handleAddMoreEmploymentClick.bind(this)}
	  				>Add more Employment</button>
	  	</div>
	  	)
	}
}

function mapStateToProps(state){
	return {};
}

export default connect(mapStateToProps)(EmploymentInputForm);