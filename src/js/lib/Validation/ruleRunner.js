function _createErrorMessageObject(path,val){
	var messageObject = {};
	let path_array = path.split(".");
	_createErrorMessageObjectRecursive(0,messageObject,path_array,val)
	return messageObject
}

function _createErrorMessageObjectRecursive(idx,messageObject,path_array,val){
	if (idx == path_array.length - 1){
		messageObject[path_array[idx]] = val;
		return;
	}
	messageObject[path_array[idx]] = {};
	_createErrorMessageObjectRecursive(idx+1,messageObject[path_array[idx]],path_array,val);
}

function _customMerge(obj1,obj2){
	let keys2 = Object.keys(obj2);
	let ret = {}
	for(let key of keys2){
		ret[key] = ret[key] || {}
		Object.assign(ret[key],obj2[key],obj1[key])
	}

	let keys1 = Object.keys(obj1);
	for(let key of keys1){
		ret[key] = ret[key] || {}
		Object.assign(ret[key],obj2[key],obj1[key])
	}

	return ret
}


function _get(src,path){
	let path_array = path.split(".");
	let ret = null;
	for(var i = 0;i<path_array.length;i++){
		if (i == 0){
			ret = src[path_array[i]]
		}else{
			ret = ret[path_array[i]]
		}
	}
	return ret
}

export const ruleRunner = (field,name,...validations) => {
	return (state) => {
		for (let v of validations){
			let errorMessageFunc = v(state[field],state);
			if (errorMessageFunc) {
				return {[field]: errorMessageFunc(name)}
			}
		}
		return null;
	};
}

/*
	input: 
		- field: the particular field in the state (that have value of type array) that you want to evaluate. e.g. "educations" -> will give you array of "education"
		- fields_path: the particular field in  the array that is referred by state[field]. e.g. "school_name" in {educations:{school_name: ""}}
		- name: The friendly name that the error message rely on. e.g. "School Name"
		- validations: The list of validations that each of the fields_path has to pass
	output: 
		- an object with 'field' as a key and error_message_objects as a value 
		- e.g. 
			{
				educations: // the 'field'
					{
						school_name: "School Name is required",       // These two are the error_message_objects 
						school_degree: "School Degree is required"    //
					} 
			}
*/

export const ruleRunnerOnFormArray = (field,fields_path,name,...validations) => {
	return (state) => {
		let form_array_datas = state[field];
		var error_message_objects = {};
		if(!form_array_datas || form_array_datas.length == 0){
				form_array_datas=[{}]
			}
		for (let [i,data] of form_array_datas.entries()){
			for (let v of validations){
				let value_to_evaluate = _get(data,fields_path)
				let errorMessageFunc = v(value_to_evaluate,state);
				if (errorMessageFunc) {
					error_message_objects[i] = _createErrorMessageObject(fields_path,errorMessageFunc(name))
				}
			}
		}
		if (Object.keys(error_message_objects).length != 0){
			return {[field]:error_message_objects}
		}
		return null;
	};
}

export const run = (state,runners) => {
	let ret = runners.reduce((memo,runner)=>{
		let next_validation = runner(state);
		if(next_validation){
			let next_field = Object.keys(next_validation)[0]
			if (next_field in memo){
				next_validation[next_field] = _customMerge(memo[next_field],next_validation[next_field]);
			}
		}
		return Object.assign(memo,next_validation);
	},{});
	return ret;
};

