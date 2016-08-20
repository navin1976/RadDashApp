import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class GeneralOption extends React.Component{
	constructor(props,context){
		super(props,context);
	}

	render(){
		return(
			<IconMenu
			iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
			anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			targetOrigin={{horizontal: 'right', vertical: 'top'}}
			open
			styles={{float:"right"}}
			>
				<MenuItem primaryText="Refresh" />
				<MenuItem primaryText="Send feedback" />
				<MenuItem primaryText="Help" />
				<MenuItem primaryText="Sign out" />
			</IconMenu>
		);
	}
}

export default GeneralOption;