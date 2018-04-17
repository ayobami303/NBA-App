export function gameGeneral(res){
	let result = {
		unstart: [],
		live: [],
		over: []
	}

	let item;

	res['sports_content']['games']['game'].forEach((game, index) => {
		item = {
			id: game.id,
			home: {},
			visitor: {},
			details:{
				loaded: false,
				data:{}
			}
		}

		const sides = ['home', 'visitor']
		sides.forEach(key => {
			item[key]['id'] = game[key]['id']
			item[key]['team'] = game[key]['team_key']
			item[key]['score'] = game[key]['score']
		})

		const process = game['period_time']

		switch (parseInt(process.game_status, 10)){
			case 1: 
				//unstart
				item.type = 'unstart'
				item.date = process.period_status
				result.unstart.push(item)
			break;
			case 2:
				//Live
				item.type = 'live'
				let game_clock
				if(process.game_clock){
					game_clock = parseInt(process.game_clock.split(':')[0], [10]) < 10 ? '0' + process.game_clock : process.game_clock
				}
				item.process= {
					time: game_clock || 'End',
					quarter: 'Q' + process.period_value
				}

				result.live.push(item)
			break;
			case 3:
				//over
				item.type = 'over'
				result.over.push(item)
			break;
			default: 
			return;

		}
	})

	return result;

}

export function leagueStanding(res){
	const data = res.sports_content.standings.team
	let result = {}

	data.forEach(team => {
		result[team.id] = result[team.id] || {}
		result[team.id].abbr = team.abbreviation
		result[team.id].state = team.team_stats
	})

	return result
}

export function gameDetails(res){
	const data = res.sports_content.game

	let result = {
		home: {},
		visitor:{}

	}

	Object.keys(result).forEach(side => {
		result[side].team = data[side].team_key
		result[side].score = data[side].score
		result[side].player = data[side].players.player
	})

	const gameType = parseInt(data['period_time'].game_status, 10)
	result.type = gameType === 3 ? 'over' : (gameType === 2 ? 'live' : 'unstart')
	result.loaded = true

	if(result.type === 'live'){
		const process = data.period_time
		result.process = {
			time: process.game_clock || 'End',
			quarter: 'Q' + process.period_value
		}
	}
	return result
}


export function playerList(res){
	const data = res.resultSets[0].rowSet

	const d = new Date();
	const currentMonth = d.getMonth() + 1
	let year
	if(currentMonth >= 10){
		year = d.getFullYear() + ''
	}else{
		year = d.getFullYear() - 1  + ''
	}

	let nameArray;

	return data.filter(item => {
		return item[5] === year
	}).map(item => {
		nameArray = item[1].split(', ')
		return {
			id: item[0],
			firstName: nameArray[1],
			lastName: nameArray[0],
			name: nameArray[1] + ' ' + nameArray[0],
			teamId: item[7],
			teamCity: item[8],
			teamName: item[9],
			teamAbbr: item[10]
		}
	})
}


export function playerDetails(res){
	const basicInfo = res.resultSets[0].rowSet[0]
	const gameInfo = res.resultSets[1].rowSet[0]

	return {
		id:basicInfo[0],
		firstName: basicInfo[1],
		lastName: basicInfo[2],
		pts: gameInfo[3],
		ast: gameInfo[4],
		reb: gameInfo[5],
		team: basicInfo[18],
		jersey: basicInfo[13],
		height: basicInfo[10],
		weight: basicInfo[11],
		birthday: basicInfo[6].split('T')[0],
		position: basicInfo[14],
		affiliation: basicInfo[9]
	}
}

export function playerLog(res){
	const logs = res.resultSets[0].rowSet

	return logs.map(item => {
		return {
			gameId:item[0],
			gameDate: item[3],
			matchup: item[4],
			result: item[5],
			min: item[6],
			pts: item[24],
			fg: item[7] + '-' + item[8],
			fgRate: item[9],
			threeP: item[10] + '-' + item[11],
			threePRate: item[12],
			ft: item[13] + '-' + item[14], 
			ftRate: item[15],
			reb: item[18],
			ast: item[19],
			stl: item[20],
			blk: item[21],
			tov: item[22],
			foul: item[23],
			plusMinus: item[25]
		}
	})
}