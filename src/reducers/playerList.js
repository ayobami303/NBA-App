import * as types from '../constants/actionTypes'

const initialState = {
	isLoaded: false,
	recent: [],
	data: []
}


export default function (state = initialState, action){
	switch (action.type){
		case types.PLAYER_LIST:
			return {...state, isLoaded:true, date:action.data}
		break;
		default:
		return initialState;
	}

}