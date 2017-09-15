import _ from 'underscore';
import {connect} from 'react-redux';
import React from 'react';
import ReactPDF from 'react-pdf/build/entry.webpack';


import RecruiterActivity from '../components/RecruiterActivity';
import ResumeContainer from '../components/ResumeContainer';

class SpanBrWrapper extends React.Component{
	render() {return(
			<div>
				<span {...this.props}>
					{this.props.children}
				</span>
				<br/>
			</div>
		)}
}

class Dashboard extends React.Component{
	constructor(props){
		super(props);
		this.state={
			active_user_profile: null
		}
	}

	componentDidMount(){
		this.props.fetchActiveUserProfile();
		this.props.fetchActiveUserResumeURL();
	}

	componentWillReceiveProps(nextProps){
		const {active_user_profile,resume_url} = nextProps;
		this.setState({active_user_profile});
		this.setState({resume_url});
	}

	render(){
		if(this.state.active_user_profile){
			return ( 
 				<div className="dashboard-container">
		            <div className="row">
		            	<div className="col l3 container personal-information-box-container">
				            <div class="personal-information-box hvr-shadow">
	    		               <div class="user-information">
	    		                  <img src={this.state.active_user_profile.prof_pic_url} alt="" class="profpic large"></img>
	    		                  <div class="name-description-container">
	    		                     <span class="name">{this.state.active_user_profile.name}</span>
	    		                     <snap class="description">{this.state.active_user_profile.summary}</snap>
	    		                  </div>
	    		               </div>
	    		               <div class="portfolio-link-container-container">
	    			               	<SpanBrWrapper class="tr-dark-blue-text large-text"><b>Education</b></SpanBrWrapper>
	    							
	    							{
	    								this.state.active_user_profile.educations.map((education,index)=>{
	    									return (
	    										<div>
	    											<SpanBrWrapper class="medium-text">{education.school_name}</SpanBrWrapper>
		    			               				<SpanBrWrapper class="gray-text">{education.school_begin_school_year}-{education.school_end_school_year}</SpanBrWrapper>
		    			               				<SpanBrWrapper class="gray-text">{education.school_degree}</SpanBrWrapper>
		    			               				<SpanBrWrapper class="gray-text">{education.school_area_of_study}</SpanBrWrapper>
		    			               				{index != this.state.active_user_profile.educations.length -1  ? <br/> : ''}
	    										</div>
	    									)
	    								})
	    							}
	    			               	{	
	    			               		this.state.active_user_profile.employments ? 
	    			               			<div>
				    			               	<SpanBrWrapper class="tr-dark-blue-text large-text"><b>Employment</b></SpanBrWrapper>
				    			               	{
				    			               		this.state.active_user_profile.employments.map((employment,index)=>{
				    			               			return(<div>
							               		    		<SpanBrWrapper class="medium-text">{employment.company_name}</SpanBrWrapper>
							    			                <SpanBrWrapper  class="gray-text">{employment.company_title}</SpanBrWrapper>     
							    			                <SpanBrWrapper class="gray-text">
							    			                  {employment.company_begin_month_employment + " "} 
							    			                  {employment.company_begin_year_employment + " - "}  
							    			                  {employment.company_end_month_employment + " "} 
							    			                  {employment.company_end_year_employment}</SpanBrWrapper>      
							    			                 <SpanBrWrapper  class="gray-text">
							    			                  {employment.company_employment_city + ", "}
							    			                  {employment.company_employment_state}
							    			                 </SpanBrWrapper>  
					    			               		    {index != this.state.active_user_profile.employments.length -1  ? <br/> : ''}
						    			                 </div>)               		
				    			               		})
			    			               		}
		    			               		</div>
	    			               		: 
	    			               		<div></div>
	    			                }
	    			               
	    			                 <SpanBrWrapper class="tr-dark-blue-text large-text"><b>Portfolio</b></SpanBrWrapper>
	    			                 <div class="portfolio-link-container">
	    			                     <a href="" class="portfolio-link">{this.state.active_user_profile.portfolio_link}</a>
	    			                 </div>
	    		               </div>
				            </div>
			            </div>
			            <div className="col l6">
			            	{<RecruiterActivity {...this.props}></RecruiterActivity>}
			            </div>
			            <div className="col l3 resume-container">
	                  		<ResumeContainer {...this.props}></ResumeContainer>
			            </div>
		            </div>
         		</div>
      		)
		}else{
			return (<div><h1>Loading</h1></div>)
		}
		
	}
}

function mapStateToProps(state){
	const {active_user_profile,resume_url} = state;
	return {active_user_profile,resume_url};
}

export default connect(mapStateToProps)(Dashboard);
