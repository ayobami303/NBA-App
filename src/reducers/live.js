import * as types from '../constants/actionTypes'

const initialState = {
	gameData: [],
	details: {}
}


export default function(state = initialState, action){
	switch (action.type){
		case types.GAME_INFO :
			return {...state, gameData: action.gameData}
		break;
		case types.GAME_DETAILS :
		// alert(JSON.stringify(action.gameData))
			return {...state, details: action.details}
		default:
		return initialState
		break
	}
}