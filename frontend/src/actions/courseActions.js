import * as types from './actionTypes';
import courseApi from  '../api/mockCourseApi';


//Needs a loadCoursesFailure/Error action to dispatch
export function loadCoursesSuccess(courses){
	return {type: types.LOAD_COURSES_SUCCESS, courses};
}

/*
Dispatch necessary for react-thunk. Arrow functions need to include several
parameters then put into brackets as such (a,b,c) => {}
LoadCourses returns a promise -> dispatches a Success action / Error action
*/
export function loadCourses(){
	return function(dispatch){
		return courseApi.getAllCourses().then(courses => {
			dispatch(loadCoursesSuccess(courses));
		}).catch(error => {
			throw(error);
		});
	};
}

//can use getState to extract data form store without passing it as a parameter
//ternary based on whether course.id exists or not create or save!
export function saveCourse(course){
	return function(dispatch, getState){
		return courseApi.saveCourse(course).then(savedCourse => {
			course.id ? dispatch(updateCourseSuccess(savedCourse)): dispatch(createCourseSuccess(savedCourse));
		}).catch(error => {
			throw(error);
		});
	};
}