import * as types from '../constants/actionTypes'

export function changeTab(tabName, height){
	return (dispatch) => {
		return Promise.resolve(dispatch({
			type: types.TAB,
			data: {tab:tabName, height:height}
		}))
	}
}