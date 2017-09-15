import React,{Component} from 'react';


import InputWithValidation from '../components/InputWithValidation'

export default class ScratchPad extends Component{
	constructor(props){
		super(props);
		this.state ={};
	}
	render(){
		return (
			<div>
				<div class="file-field input-field">
			      <InputWithValidation
				      	type="file"
				      	errorText={"error"}
						showError={true}
				      	onFieldChanged={()=>{}}
				      >
				      <div class="btn tr-green">
				        <span>File</span>
				      </div>
				      <div class="file-path-wrapper">
				        <input class="file-path validate" type="text">
				        </input>
				      </div>
			      </InputWithValidation>
			    </div>
			    <InputWithValidation
			    	type="text"
			    	errorText="error"
			    	showError={true}
				    onFieldChanged={()=>{}}
			    >
			    	
			    </InputWithValidation>
		    </div>
		)
	}
}