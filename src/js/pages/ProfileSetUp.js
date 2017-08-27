import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import _ from 'underscore';
import EducationInputForm from '../components/EducationInputForm';
import EmploymentInputForm from '../components/EmploymentInputForm';
import Select from '../components/Select';

class ProfileSetUp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
		};
	}

	componentDidMount(){
		this.props.fetchActiveUserProfile();
	}

	componentWillReceiveProps(nextProps){
		var {upload_file_success,update_user_profile_success,active_user_profile} = nextProps;
		
		if(active_user_profile != null){
			this.setState({active_user_profile})
		}

		if(update_user_profile_success){
			this.setState({show_saved_text:true})
			setTimeout(()=>{
				this.setState({show_saved_text:false})
			},1000)
		}

		if(upload_file_success && update_user_profile_success){
			this.props.push('/dashboard');
		}
	}


	handleFileUpload(event){
		const file = event.target.files[0];
		this.setState({
			private:{
				resume: file
			}
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
		this.props.updateUserProfile(this.state.active_user_profile);
		if(this.state.resume){
			this.props.uploadResume(this.state.resume);
		}
		if (this.editor){
			console.log('editor = ',this.editor)
			let canvasScaled = this.editor.getImageScaledToCanvas();
			canvasScaled.toBlob((blob)=>{
				this.props.uploadProfilePicture(blob);
			})
		}	
	}

	handleUpdateProfilePicture(event){
		let reader = new FileReader();
		let file = event.target.files[0]

		reader.onloadend = () => {
			this.setState({
				prof_pic_url: reader.result,
				update_profile_pic_button_just_got_clicked:true
			})
		};
		reader.readAsDataURL(file);
	}

	setEditorRef(editor){
		this.editor = editor;
	}

	render(){
		const {active_user_profile} = this.state
		return (
			<div className="row">
				<div class="col l12 tr-gray center-horizontal">
					<div class="card card-width-medium form-box form-box-profile-set-up">
						<p class="tr-green-text" id="set-up-profile-text">Set up your profile</p>
						<div>
							{
								this.state.update_profile_pic_button_just_got_clicked && this.state.prof_pic_url ? 
									 <AvatarEditor
										ref={this.setEditorRef.bind(this)}
										image={this.state.prof_pic_url}
										width={200}
								        height={200}
								        color={[255, 255, 255, 0.6]}
								        scale={1}
								        borderRadius={100}
								      />
								:
									<img className="profpic-setter" src={active_user_profile ? active_user_profile.prof_pic_url : ''} alt=""/>
							}
							<div class="file-field input-field">
						      <div class="btn tr-green">
						        <span>Upload new profile picture</span>
						        <input 
						        	type="file" 
						        	onChange={this.handleUpdateProfilePicture.bind(this)} 
						        	capture>
						        </input>
						      </div>
						      <div class="file-path-wrapper">
							        <input class="file-path validate" type="text">
							        </input>
							      </div>
						    </div>
						</div>
						<form method="post">
							<p><b>Upload Resume</b></p>
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
							<p><b>Summary</b></p>
							<input value={active_user_profile ? active_user_profile.summary : ''} onChange={this.handleInputChange.bind(this)} type="text" name="summary" id="" cols="70" rows="2" placeholder="Graduating December 2017 from UT Austin" maxLength="140" required="required"></input>


							<p><b>Education</b></p>
							<EducationInputForm {...this.props} educations = {active_user_profile ?  active_user_profile.educations : null}></EducationInputForm>

							<p><b>Employment History</b></p>

							<EmploymentInputForm {...this.props} employments={active_user_profile ? active_user_profile.employments : null}></EmploymentInputForm>

							<p><b>Portfolio Link</b></p>
							<input value={active_user_profile ? active_user_profile.portfolio_link : ''} onChange={this.handleInputChange.bind(this)} type="text" name="portfolio_link" id="" cols="30" rows="1" placeholder="link to portfolio">
							</input>
							<button type="button" class="waves-effect waves-light btn tr-green" onClick={this.handleSaveClick.bind(this)}>{this.state.show_saved_text ? 'Saved!' : 'Save'}</button>
						</form>
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