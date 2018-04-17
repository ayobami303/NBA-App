import axios from 'axios'

import * as types from '../constants/actionTypes'
import {NBA_URL, NBA_STANDING_URL, NBA_GAME_DETAILS} from '../constants/api'
import * as producers from '../utils/producers'

export function getGameGeneral(year, month, date){
	return function (dispatch){
		return axios.get(`${NBA_URL}/${year}${month}${date}/games.json`)
			.then(res => {
				// alert(JSON.stringify(res.data.sports_content.games.game))
				const allGames = producers.gameGeneral(res.data)

				if (allGames.live.length + allGames.unstart.length + allGames.over.length === 0) {
					return this.getGameGeneral(year, month, parseInt(date, 10) + 1)
				} 
				allGames.gameDate = `${year}-${month}-${date}`
				 
				dispatch(getGameGeneralSuccess(allGames))				
			})
			.catch(error => {
				console.log('get game general', error)
			})
			
	}
}

export function getGameGeneralSuccess(res){	
	return ({
		type:types.GAME_INFO,
		gameData: res
	})
}

export function getGameDetails (id, type, year, month, date){
	return function(dispatch, getStore){
		if(type === 'over'){
				// alert(JSON.stringify(getStore().live.gameData.over))				
			const game = getStore().live.gameData.over.find((g)=>{return g.id === id})
			if(game.details && game.details.loaded){
				return Promise.resolve(
					dispatch(getGameDetailsSuccess(game.details.data))
				)
				
			}
		}
		return axios.get(`${NBA_GAME_DETAILS}/${year}${month}${date}/${id}/boxscore.json`)
			.then(res => {
				// alert(JSON.stringify(res))
				dispatch(getGameDetailsSuccess(producers.gameDetails(res.data)))
			})
			.catch( error => {
				console.log('game details ', error)
			})
	}
}

export function getGameDetailsSuccess(res){
	return({
		type: types.GAME_DETAILS,
		details: res
	})
}

