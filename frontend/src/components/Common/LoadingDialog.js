import React from 'react';
import Dialog from 'material-ui/Dialog';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none'
};

export default class LoadingDialog extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state = {
			open: false,
		};	
	}

	handleOpen(){
		this.setState({open:true});
	}

	handleClose(){
		this.setState({open:false});
	}

	render(){
		<Dialog
			title="Loading"
			modal={true}
			contentStyle={customContentStyle}
			open={this.state.open}>
				This dialog spans the entire width of the screen.
		</Dialog>
	}
}