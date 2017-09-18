import React,{Component} from 'react';

export default class PhoneInput extends Component{
	constructor(props){
		super(props);
		this.formatNumber = this.formatNumber.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state ={
			phone_number: this.formatNumber(this.props.value)
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.value){
			this.setState({phone_number:this.formatNumber(nextProps.value)});
		}
	}

	handleInputChange(e){
		let value = e.target.value;
		let formatted_number = this.formatNumber(value);
		this.setState({
			phone_number: formatted_number
		})
		this.props.onPhoneNumberChange(formatted_number);
	}

	formatNumber(input){
        // Strip all characters from the input except digits
        input = input.replace(/\D/g,'');

        // Trim the remaining input to ten characters, to preserve phone number format
        input = input.substring(0,10);

        // Based upon the length of the string, we add formatting as necessary
        var size = input.length;
        if(size == 0){
                input = input;
        }else if(size < 4){
                input = '('+input;
        }else if(size < 7){
                input = '('+input.substring(0,3)+') '+input.substring(3,6);
        }else{
                input = '('+input.substring(0,3)+') '+input.substring(3,6)+' - '+input.substring(6,10);
        }
        return input; 
	}

	render(){
		return (
			<div>
				<input 
					type="text"
					value={this.state.phone_number}
					onChange={this.handleInputChange}
					/>
			</div>
		)
	}
}