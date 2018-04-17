import * as types from '../constants/actionTypes'

const initialState = {
	tab: 'game',
	navigator: 'gameIndex'
}

export default function (state = initialState, action) {
	switch (action.type){
		case types.TAB :
			return {...state, data: action.data}
		break;		
		default:
			return initialState;

	}
}