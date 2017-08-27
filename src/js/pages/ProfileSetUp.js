import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import {connect} from 'react-redux';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {Link} from 'react-router-dom';
import ReactCrop from 'react-image-crop';

import _ from 'underscore';
import EducationInputForm from '../components/EducationInputForm';
import EmploymentInputForm from '../components/EmploymentInputForm';
import Select from '../components/Select';

class ProfileSetUp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			educations:null,
			employments:null,
			private:{}
		};
	}

	componentDidMount(){
		this.props.fetchActiveUserProfile();
	}

	componentWillReceiveProps(nextProps){
		var {upload_file_success,update_user_profile_success,active_user_profile} = nextProps;
		
		if(active_user_profile != null){
			this.setState({...active_user_profile})
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

	_crop(){
		// console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
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
		this.props.updateUserProfile(this.state);
		if(this.state.resume){
			this.props.uploadResume(this.state.resume);
		}
		this.uploadCroppedImage()
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

	uploadCroppedImage(){
		if (typeof this.cropper.getCroppedCanvas() === 'undefined'){
			return
		}

		let croppedCanvas = this.cropper.getCroppedCanvas()
		croppedCanvas.toBlob((blob)=>{
			this.props.uploadProfilePicture(blob);
		})

	}

	render(){
		return (
			<div className="row">
				<div className="col l6">
					{
						this.state.update_profile_pic_button_just_got_clicked && this.state.prof_pic_url ? 
							 <Cropper
            					ref={cropper => { this.cropper = cropper; }}
						        src={this.state.prof_pic_url}
						        style={{height: 300, width: 300}}
						        // Cropper.js options
						        aspectRatio={1 / 1}
						        zoom={2}
						        dragMode={'move'}
						        crop={this._crop.bind(this)} />
						:
							<img className="profpic-setter" src={this.state.prof_pic_url || ''} alt=""/>
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
				<div class="col l6 tr-gray center-horizontal">
					<div class="card large card-width-medium form-box form-box-profile-set-up">
						<p class="tr-green-text" id="set-up-profile-text">Set up your profile</p>
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
							<input value={this.state.summary} onChange={this.handleInputChange.bind(this)} type="text" name="summary" id="" cols="70" rows="2" placeholder="Graduating December 2017 from UT Austin" maxLength="140" required="required"></input>


							<p><b>Education</b></p>
							<EducationInputForm {...this.props} educations = {this.state.educations}></EducationInputForm>

							<p><b>Employment History</b></p>

							<EmploymentInputForm {...this.props} employments={this.state.employments}></EmploymentInputForm>

							<p><b>Portfolio Link</b></p>
							<input value={this.state.portfolio_link} onChange={this.handleInputChange.bind(this)} type="text" name="portfolio_link" id="" cols="30" rows="1" placeholder="link to portfolio">
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