import React from 'react';

export default class UidProvider extends React.Component{
	static contextTypes = {
		uid: React.PropTypes.string
	}

	render(){
		return this.props.children(this.context.uid);
	}
}