import {combineReducers} from 'redux'

import application from './application'
import live from './live'
import playerList from './playerList'

const rootReducer = combineReducers({
	application,
	live,
	playerList
})

export default rootReducer;