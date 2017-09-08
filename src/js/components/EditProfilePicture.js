import React, {Component} from 'react';
import {connect} from 'react-redux';

import AvatarEditor from 'react-avatar-editor';


class EditProfilePicture extends Component{

	constructor(props){
		super(props);
		this.state = {};
	}

	componentWillReceiveProps(nextProps){
		let {active_user_profile} = nextProps;
		if (active_user_profile){
			this.setState({active_user_profile})
		}
	}

	handleSaveClick(){
		if (this.editor){
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
		let {active_user_profile} = this.state;
		return (
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
			    <div>
			      {
			      	this.state.update_profile_pic_button_just_got_clicked && this.state.prof_pic_url ? 
					  <button type="button" class="waves-effect waves-light btn tr-blue" onClick={this.handleSaveClick.bind(this)}>
					  	{this.state.show_saved_text ? 'Saved!' : 'Save profile picture'}
					  </button>
					:
					''
			      }
			    </div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {};
}

export default connect(mapStateToProps)(EditProfilePicture);