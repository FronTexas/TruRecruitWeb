import React, {Component} from 'react';

export default class Select extends Component{
	render(){
		var {options} = this.props;
		if(!options){
			options = [];
		}
		return(
			<select {...this.props}>
				{	
					options.map((option,index)=>{
						return <option key={index} value={option}>{option}</option>
					})

				}
			</select>
		)
	}
}