import React, {Component} from 'react';
import {Input} from 'react-materialize';

export default class Select extends Component{
	render(){
		var {options} = this.props;
		if(!options){
			options = [];
		}
		return(
			<div>
				<Input type='select' {...this.props}>
					{	
						options.map((option,index)=>{
							return <option key={index} value={option}>{option}</option>
						})

					}
				</Input>
			</div>
			
		)
	}
}