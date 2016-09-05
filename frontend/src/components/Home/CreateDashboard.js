import React from 'react';
import TextInput from '../Common/TextInput';

const CreateDashboard = ({val,onChange,save,close}) => {
	return(
		<div>
			<TextInput 
				name="title" 
				label="Title" 
				value={val.title} 
				onChange={onChange} 
			/>
			<TextInput 
				name="description" 
				label="Description" 
				value={val.description} 
				onChange={onChange} 
			/>
			<button onClick={save}>Save</button>
			<button onClick={close}>Close</button>
		</div>
	);
};

export default CreateDashboard;