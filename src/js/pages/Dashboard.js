import _ from 'underscore';
import {connect} from 'react-redux';
import React from 'react';
import ReactPDF from 'react-pdf/build/entry.webpack';


import RecruiterActivity from '../components/RecruiterActivity';

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
	    		                  <img src="http://www.radfaces.com/images/avatars/alan-frog.jpg" alt="" class="profpic large"></img>
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
	                  		<a href={this.state.resume_url ? this.state.resume_url : "#"}>
			            		<div className="resume-preview hvr-shadow">
			            			<div className="center-align">
		                        		<p class="qr-code-explaination tr-green-text">Your Resume QR Code</p>
		                        		<img class="qr-code" src={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${this.state.active_user_profile.uid}&color=00BC96&bgcolor=FFFFFF`} alt=""></img>
		                        		<br/>
		                        		<span class="tr-blue-text">Main Resume.pdf</span>
		                     		</div>
			            		</div>
			            	</a>
			            	<div class="print-or-share-area">
			            		<div class="printshare-container">
		                           <a class="save-qr-code printshare-button hvr-shadow"
		                           	  href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${this.state.active_user_profile.uid}&color=00BC96&bgcolor=FFFFFF`} 
		                           	  download={`${this.state.active_user_profile.name}_qr_code`}>
		                              <i class="fa fa-floppy-o"></i>
		                              <span>Save the QR Code</span>
		                           </a>
		                        </div>
			                    <div class="printshare-container">
		                            <div class="download-resume printshare-button hvr-shadow">
		                              <i class="fa fa-file-pdf-o"></i>
		                              <span>Print a Resume With the QR Code</span>
		                            </div>
			                    </div>
		                        <div class="printshare-container">
		                           <div class="download-name-tag printshare-button hvr-shadow">
		                              <i class="fa fa-list-alt"></i>
		                              <span>Print a Name Tag With the QR Code</span>
		                           </div>
		                        </div>
		                        <div class="printshare-container">
		                           <div class="email-qr-code printshare-button hvr-shadow">
		                              <i class="fa fa-envelope"></i>
		                              <span>Email the QR Code</span>
		                           </div>
		                        </div>
                    		</div>
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
	 /*
			            <div className="col l3">
			            	<div class="resume-container">
		               		  	<div className="row">
			               		  	<div className="col s6 resume-preview-container">
				               		  	<div class="resume-preview hvr-shadow">
					                  		<a href={this.state.resume_url ? this.state.resume_url : "#"}>
					                  		<ReactPDF
						                  		width="233"
						                  		file={this.state.resume_url ? this.state.resume_url : ""}
						                  	>
						                  	</ReactPDF>
						                  </a>
				                  		</div>
			               		  	</div>
			               		  	<div className="col s6 resume-preview-container">
				               		  	<div>
				                     		<div>
				                        		<span class="qr-code-explaination">Your Resume QR Code</span>
				                        		<img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.state.active_user_profile.uid}&color=00BC96&bgcolor=EEF1F7`} alt=""></img>
				                     		</div>
					                    	<div class="print-or-share-area">
							                    <div class="printshare-container">
						                            <div class="download-resume printshare-button hvr-shadow">
						                              <i class="fa fa-file-pdf-o"></i>
						                              <span>Get Resume With QR Code</span>
						                            </div>
							                    </div>
						                        <div class="printshare-container">
						                           <div class="download-name-tag printshare-button hvr-shadow">
						                              <i class="fa fa-list-alt"></i>
						                              <span>Get Name Tag With QR Code</span>
						                           </div>
						                        </div>
						                        <div class="printshare-container">
						                           <div class="email-qr-code printshare-button hvr-shadow">
						                              <i class="fa fa-envelope"></i>
						                              <span>Email QR Code</span>
						                           </div>
						                        </div>
						                        <div class="printshare-container">
						                           <div class="save-qr-code printshare-button hvr-shadow">
						                              <i class="fa fa-floppy-o"></i>
						                              <span>Save QR Code</span>
						                           </div>
						                        </div>
				                    		</div>
			                  			</div>
			               		  	</div>
		               		  	</div>
				            </div>
			            </div>*/
	const {active_user_profile,resume_url} = state;
	return {active_user_profile,resume_url};
}

export default connect(mapStateToProps)(Dashboard);
