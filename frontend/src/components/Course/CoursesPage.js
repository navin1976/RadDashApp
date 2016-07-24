import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';

class CoursesPage extends React.Component{
	constructor(props,context){
		super(props,context);
	}

	courseRow(course, index){
		return <div key={index}>{course.title}</div>;
	}

	render(){
		const {courses} = this.props;
		return(
			<div className="info-context">
				<h1>Courses</h1>
				<CourseList courses={courses}/>	
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	return{
		courses: state.courses
	};
}

CoursesPage.propTypes = {
	dispatch: PropTypes.func.isRequired,
	courses: PropTypes.array.isRequired
};

//Use to reference this context and access the store illegally Mouahahaha.
//CoursesPage.contextTypes = { store: React.PropTypes.object };

export default connect(mapStateToProps)(CoursesPage);