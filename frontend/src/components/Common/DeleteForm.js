import React,{PropTypes} from 'react';

const DeleteForm = ({close,confirm}) => {
	return(
		<div>
			<h2>Warning!</h2>
			<p>Are you sure you wish to delete this dashboard? (can't be undone)</p>
			<button onClick={confirm}>Delete</button>
			<button onClick={close}>Cancel</button>
		</div>
	);
};

DeleteForm.propTypes = {
	close: PropTypes.func.isRequired,
	confirm: PropTypes.func.isRequired
};

export default DeleteForm;