import React,{PropTypes} from 'react';
import TextInput from '../TextInput';
import LoadingDots from '../LoadingDots';

const AddRoleForm = ({close,save,onChange,role,errors,saving}) => {
	let res;
	let load;
	if(saving){
		res = <button onClick={(e)=>{e.preventDefault();}}>Close</button>
	}else{
		res = <button onClick={close}>Close</button>;
	}

	if(saving){
		load= (<div>
			<p>Saving</p>
			<LoadingDots />
		</div>);
	}
	return(
		<div>
			<TextInput name="title" label="Title" value={role.title} onChange={onChange} error={errors.title} />
			{res}
			<button onClick={save}>Save</button>
			{load}
		</div>
	);
};

AddRoleForm.propTypes = {
	close: PropTypes.func.isRequired,
	save: PropTypes.func.isRequired,
	onChange: PropTypes.func,
	role: PropTypes.object,
	errors: PropTypes.object,
	saving: PropTypes.bool
};

export default AddRoleForm;