import React, {Component} from 'react';


import EducationForm from '../components/onboarding/EducationForm';
import EmploymentForm from '../components/onboarding/EmploymentForm';
import HelloThereExplaination from '../components/onboarding/HelloThereExplaination';
import TellAboutYourSelfExplaination from '../components/onboarding/TellAboutYourSelfExplaination';
import UploadResumeForm from '../components/onboarding/UploadResumeForm';
import PrevContinueSubmitButtons from '../components/onboarding/PrevContinueSubmitButtons';
import ReviewInformationForm from '../components/onboarding/ReviewInformationForm';

class Onboarding extends Component{
	constructor(props){
		super(props);
		this.state = {};
		this.state.contents = [
				{
					explaination:HelloThereExplaination,
					content:UploadResumeForm
				},
				{
					explaination:TellAboutYourSelfExplaination,
					content: EducationForm
				},
				{
					explaination: TellAboutYourSelfExplaination,
					content: EmploymentForm
				},
				{
					explaination: TellAboutYourSelfExplaination,
					content: ReviewInformationForm
				}
		];
		this.state.contentIndex = 0
	}
	render(){
		return(
			<div>
				
			</div>
		)
	}
}

export default Onboarding;
