import axios from 'axios'

import * as types from '../constants/actionTypes'
import {NBA_URL, NBA_STANDING_URL, NBA_GAME_DETAILS, NBA_PLAYER_LIST} from '../constants/api'
import * as producers from '../utils/producers'

export function getPlayerList(){
	return function (dispatch, getStore){
		// alert(JSON.stringify(getStore().playerList.isLoaded))
		if(getStore().playerList.isLoaded){
			return Promise.resolve(dispatch(getPlayerListSuccess(getStore().playerList.data)))
		}	

		const d = new Date();
		const currentMonth = d.getMonth() + 1
		
		let season
		if(currentMonth >= 10){
			season = d.getFullYear().toString() + '-' + (d.getFullYear() + 1).toString().substring(2,4)
		}else{
			season = (d.getFullYear().toString() - 1) + '-' + d.getFullYear().toString().substring(2,4)
		}
		// alert(`${NBA_PLAYER_LIST}${season}`)
		return axios.get(`${NBA_PLAYER_LIST}${season}`,
					{ headers: { host: 'stats.nba.com',
						"cache-control":"max-age=0",
						connection: 'keep-alive',
						"accept-encoding" : "Accepflate, sdch",
						'accept-language':'he-IL,he;q=0.8,en-US;q=0.6,en;q=0.4',
						'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'}} )
			.then(res => {
				const playerLists = producers.playerList(res.data)
				// alert(JSON.stringify(playerLists))
				
				dispatch(getPlayerListSuccess(playerLists))				
			})
			.catch(error => {
				console.log('get game general', error)
			})
			
	}
}

export function getPlayerListSuccess(res){	
	return ({
		type:types.PLAYER_LIST,
		data: res
	})
}
