import React,{PropTypes} from 'react';
import TextInput from '../TextInput';

const AddRoleForm = ({close,save,onChange,role,errors,saving}) => {
	return(
		<div>
			<TextInput name="title" label="Title" value={role.title} onChange={onChange} error={errors.title} />
			<TextInput name="description" label="Description" value={role.description} onChange={onChange} error={errors.description} />
			<button onClick={close}>Close</button>
			<button onClick={save}>Save</button>
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