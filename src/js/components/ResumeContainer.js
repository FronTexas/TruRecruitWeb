import React,{Component} from 'react';
import {connect} from 'react-redux';


class ResumeContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			...this.props,
			link_to_qr_code: `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${this.props.active_user_profile.uid}&color=00BC96&bgcolor=FFFFFF`
		}
	}
	textQRCode(){
		this.props.sendQRCodeAsText(this.props.active_user_profile.phone_number,this.state.link_to_qr_code);
	}
	render(){
		return (
			<div>
				<a href={this.props.resume_url ? this.props.resume_url : "#"}>
        			<div className="resume-preview hvr-shadow">
            			<div className="center-align">
                    		<p class="qr-code-explaination tr-green-text">Your Resume QR Code</p>
                    		<img class="qr-code" src={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${this.props.active_user_profile.uid}&color=00BC96&bgcolor=FFFFFF`} alt=""></img>
                    		<br/>
                    		<span class="tr-blue-text">Main Resume.pdf</span>
                 		</div>
        			</div>
            	</a>
            	<div class="print-or-share-area">
            		<div class="printshare-container">
                       <a class="printshare-button hvr-shadow"
                       	  href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${this.props.active_user_profile.uid}&color=00BC96&bgcolor=FFFFFF`} 
                       	  download={`${this.props.active_user_profile.name}_qr_code`}>
                          <i class="fa fa-floppy-o"></i>
                          <span>Save the QR Code</span>
                       </a>
                    </div>

    			</div>
			</div>
	)
    /*
       <div class="printshare-container">
                       <div class="printshare-button hvr-shadow" onClick={this.textQRCode.bind(this)}>
                          <i class="fa fa-commenting"></i>
                          <span>Text the QR code</span>
                       </div>
                    </div>
                    <div class="printshare-container">
                        <div class="printshare-button hvr-shadow">
                          <i class="fa fa-file-pdf-o"></i>
                          <span>Print a Resume With the QR Code</span>
                        </div>
                    </div>
                    <div class="printshare-container">
                       <div class="printshare-button hvr-shadow">
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

    */
	}
}

function mapStateToProps(state){
	return {};
}

export default connect(mapStateToProps)(ResumeContainer);