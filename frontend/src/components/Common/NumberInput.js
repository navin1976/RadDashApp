import React, {PropTypes} from 'react';

const NumberInput = ({name, label, value}) =>{

	return(
		<div>
			<label htmlFor={name}>{label}</label>
			<div>
				<div>{value}</div>
			</div>

		</div>
	);
};

export default NumberInput;

NumberInput.propTypes = {
	name:PropTypes.string,
	label:PropTypes.string,
	value:PropTypes.string
};