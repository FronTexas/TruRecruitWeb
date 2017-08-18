import {connect} from 'react-redux';
import React , {Component} from 'react';
import Clipboard from 'react-clipboard';
import copy from 'copy-to-clipboard';


class RecruiterCard extends Component{

	constructor(props){
		super(props);
		this.state = {
			show_copied_text:false
		}
	}

	handleCopyEmailAdress(e){
		copy(this.props.email);
		this.setState({show_copied_text:true})
		setTimeout(()=>{
			this.setState({show_copied_text:false})
		},600)
	}

	render(){
		return(
			<div className="row">
				<div className="col l2"><div class="profpic-placeholder large white-br" alt=""/></div>
				<div className="col l4">
					<ul>
						<li><b>{this.props.name}</b></li>
						<li><span className="tr-blue-text">{this.props.email}</span></li>
						<li>{this.props.company} — Austin,TX</li>
					</ul>
				</div>
				<div className="col l6">
					<button 
					className={this.state.show_copied_text ? "waves-effect waves-light btn tr-green" : "waves-effect waves-light btn tr-blue" }
					onClick={this.handleCopyEmailAdress.bind(this)}
					style={{width:250}}>
					{this.state.show_copied_text ? "Copied!" : "Copy Email Adrress"}
					</button>
				</div>
			</div>
		)
	}
}

function mapStateToProps(){
	return {};
}

export default connect(mapStateToProps)(RecruiterCard);