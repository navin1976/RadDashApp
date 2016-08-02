import * as types from './actionTypes';
import courseApi from  '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


//Needs a loadCoursesFailure/Error action to dispatch
export function loadCoursesSuccess(courses){
	return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function createCourseSuccess(course){
	return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course){
	return {type: types.UPDATE_COURSE_SUCCESS, course};
}
/*
Dispatch necessary for react-thunk. Arrow functions need to include several
parameters then put into brackets as such (a,b,c) => {}
LoadCourses returns a promise -> dispatches a Success action / Error action
*/
export function loadCourses(){
	return function(dispatch){
		dispatch(beginAjaxCall());
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
		dispatch(beginAjaxCall());
		return courseApi.saveCourse(course).then(savedCourse => {
			course.id ? dispatch(updateCourseSuccess(savedCourse)): dispatch(createCourseSuccess(savedCourse));
		}).catch(error => {
			dispatch(ajaxCallError(error));
			throw(error);
		});
	};
}