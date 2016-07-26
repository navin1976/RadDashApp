import authorApi from '../api/mockAuthorApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadAuthorsSuccess(authors){
	return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function loadAuthors(){
	return dispatch => {
		dispatch(beginAjaxCall());
		return authorApi.getAllAuthors().then(authors => {
			dispatch(loadAuthorsSuccess(authors));
			console.log(authors);
		}).catch(error => {
			throw(error);
		});
	};
}