import React from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';

const AddWidgetForm = ({allSettings,onChange,onSubmit,errors,closer,handler}) => {
	return(
		<div>
			<form>
				<h3>{allSettings.title}</h3>
				<TextInput name="title" label="Title" value={allSettings.title} onChange={onChange} error={errors.title}/>
				
				<NumberInput name="width" label="Width" value={allSettings.width}/>
				<button name="incrementWidth" onClick={handler}>+</button>
				<button name="decrementWidth" onClick={handler}>-</button>
				
				<NumberInput name="height" label="Height" value={allSettings.height} />
				<button name="incrementHeight" onClick={handler}>+</button>
				<button name="decrementHeight" onClick={handler}>-</button>
			</form>
			<input type="submit" value="Add" className="btn btn-primary" onClick={onSubmit} />
			<input type="submit" value="Close" className="btn btn-primary" onClick={closer} />
		</div>
	);
};

AddWidgetForm.propTypes = {
	allSettings:React.PropTypes.object.isRequired,
	onChange: React.PropTypes.func.isRequired,
	onSubmit: React.PropTypes.func.isRequired,
	errors: React.PropTypes.object,
	closer: React.PropTypes.func.isRequired
};

export default AddWidgetForm;