import React, {Component} from 'react'
import {View, TouchableHighlight, InteractionManager, Platform, ActivityIndicator, Text, Image} from 'react-native'
import _ from 'lodash'
import axios from 'axios'

import * as types from '../../../constants/actionTypes'
import {NBA_URL, NBA_STANDING_URL, NBA_GAME_DETAILS} from '../../../constants/api'
import * as producers from '../../../utils/producers'


import styles from './styles/GameDetails'
import teamMap from '../../../utils/team-map'
import GamePlayers from './GamePlayers'


class GameDetails extends Component{
	constructor(props){
		super(props);
		const {game, date} =  this.props
		const homeAbb = game.home.team.toLowerCase()
		const visitorAbb = game.visitor.team.toLowerCase()
		const homeName = teamMap[homeAbb].city + ' ' + teamMap[homeAbb].team
		const visitorName = teamMap[visitorAbb].city + ' ' + teamMap[visitorAbb].team

		this.state = {
			selectedIndex: 0,
			teamValues: [homeName, visitorName],
			indicator:true,
			gameType: game.type,
			game,
			data: {},
			loaded: false,
			details: {}
		}

		this.date = date
		this.gameId = game.id
		this.timeout = null
	}


	_refresh(props){
		// alert(JSON.stringify(props.game))

		const {actions} = props
		const {gameType} = this.state
		const {date} = this
		let newState = {}

		if (gameType === 'live'){
			let game = props.game.find(item =>{
				return item.id === this.gameId
			})

			if(game){
				newState.gameType = 'live'
				newState.game = game
				newState.indicator = !this.state.details.loaded
				clearTimeout(this.timeout)
				this.timeout = setTimeout(() => {
					this.getGameDetails(this.gameId,'live',date[0],date[1],date[2])
				}, 10000);
			}else{
				// Game has already finished
				newState.gameType = 'over'
				newState.game = props.game.find(item => {
					return item.id === this.gameId
				})
			}
		}
		this.setState(Object.assign({
			indicator: false
		}, newState))
	}

	_onChange = (tab) => {
		this.setState({
			selectedIndex: tab,
			indicator: true
		})

		InteractionManager.runAfterInteractions(() => {
			this.setState({
				indicator:false
			})
		})
	}

	componentDidMount(){
		this.getLeagueStanding()
		// alert(JSON.stringify(this.date))

		const {action} = this.props
		const {gameType} = this.state
		const {gameId, date} = this
		InteractionManager.runAfterInteractions(() => {
			this.getGameDetails(gameId, gameType,date[0], date[1], date[2] )
		})

		this._refresh(this.props)
	}

	getGameDetails (id, type, year, month, date){					
		axios.get(`${NBA_GAME_DETAILS}/${year}${month}${date}/${id}/boxscore.json`)
			.then(res => {
				this.setState({
					details: producers.gameDetails(res.data)
				})
				// alert(JSON.stringify(producers.gameDetails(res.data)))
			})
			.catch( error => {
				console.log('game details ', error)
			})		
	}


	getLeagueStanding = () => {		
		const d = new Date();
		const currentMonth = d.getMonth() + 1
		let year
		if(currentMonth >= 10){
			year = d.getFullYear().toString()
		}else{
			year = d.getFullYear().toString() - 1
		}

		axios.get(`${NBA_STANDING_URL}/${year}/league/standings.json`)
			.then(res =>{
				const data = producers.leagueStanding(res.data)
				this.setState({
					data: data,
					loaded: true
				})
				// alert(JSON.stringify(data))
			})
			.catch(error => {
				console.log('get league standing', error)
			})		
	}		


	render() {
		// alert(JSON.stringify(this.props))
		const {selectedIndex, teamValues, indicator, gameType, game} = this.state
		const homeAbb = game.home.team.toLowerCase()
		const visitorAbb = game.visitor.team.toLowerCase()

		let gameProcess =''
		let cssType = ''

		switch (game.type){
			case 'unstart':
				gameProcess = _.replace(game.date,/\s*ET\s*/, '');
				cssType = 'Unstart'
			break;
			case 'live' :
				gameProcess += game.process.quarter + ' '
				gameProcess += _.replace(game.process.time, /\s+/, '')
				cssType = 'Live'
			break;
			case 'over':
				gameProcess = 'Final'
				cssType = 'Over'
			break;
			default:
			break;
		}

		const standing = this.state.data
		let homeStand = ''
		let visitorStand = ''

		if(this.state.loaded){
			const homeStandState = this.state.data[game.home.id].state 
			const visitorStandState = this.state.data[game.visitor.id].state 

			homeStand = homeStandState.wins + ' - ' + homeStandState.losses
			visitorStand = visitorStandState.wins + ' - ' + visitorStandState.losses
		}

		const homeTeamLogo = teamMap[homeAbb].logo
		const visitorTeamLogo = teamMap[visitorAbb].logo
		
		const homeCss = selectedIndex === 0 ? 'Active' : 'Inactive'
		const visitorCss = selectedIndex === 1 ? 'Active' : 'Inactive'


		return (
			<View style = {styles.container} >
				<View style = {[styles.sumContainer, {backgroundColor:teamMap[homeAbb].color}]} >
					<View style = {styles.team }>
						<Image style = {styles.teamLogo} source ={homeTeamLogo} />
						<Text style ={styles.teamCity} >{teamMap[homeAbb].city}</Text>
						<Text style = {styles.teamName} >{teamMap[homeAbb].team}</Text>
						<Text style = {styles.standing} >{homeStand}</Text>
					</View>
					<View style = {styles.gameInfo} >
						<Text style = {[styles.infoProcess, styles[`process${cssType}`]]} >{gameProcess}</Text>
						{game.type !== 'unstart' && 
							<View style ={styles.infoScorePanel}>
								<View style ={styles.infoScoreBlock} >
									<Text style ={styles.infoSide} >HomeTeam</Text>
									<Text style ={styles.infoScore} >{game.home.score}</Text>
								</View>
								<View style ={styles.infoDivider} />
								<View style ={styles.infoScoreBlock} >
									<Text style ={styles.infoSide} >AwayTeam</Text>
									<Text style ={styles.infoScore} >{game.visitor.score}</Text>
								</View>
							</View>
						}
					</View>
					<View style = {styles.team }>
						<Image style = {styles.teamLogo} source ={visitorTeamLogo} />
						<Text style ={styles.teamCity} >{teamMap[visitorAbb].city}</Text>
						<Text style = {styles.teamName} >{teamMap[visitorAbb].team}</Text>
						<Text style = {styles.standing} >{visitorStand}</Text>
					</View>
				</View>
				<View style ={styles.segment}>
					<TouchableHighlight onPress = {() => this._onChange(0)} underlayColor = 'transparent' style = {[styles.segPanel, styles[`segPanel${homeCss}`]]} >
						<View style = {styles.segPanelInner} >
							<Text style ={[styles.segTeam, styles[`segTeam${homeCss}`]]} > {teamValues[0]}</Text>
							<View style = {homeCss === 'Active' ? {backgroundColor: teamMap[homeAbb].color, height:4} : {opacity: 0}} />
						</View>
					</TouchableHighlight>
					<TouchableHighlight onPress = {() => this._onChange(1)} underlayColor = 'transparent' style = {[styles.segPanel, styles[`segPanel${visitorCss}`]]} >
						<View style = {styles.segPanelInner} >
							<Text style ={[styles.segTeam, styles[`segTeam${visitorCss}`]]} > {teamValues[1]}</Text>
							<View style = {visitorCss === 'Active' ? {backgroundColor: teamMap[visitorAbb].color, height:4} : {opacity: 0}} />
						</View>
					</TouchableHighlight>
				</View>

				{
					!this.state.details.loaded && Platform.OS === 'ios' && 
					<View style = {styles.indicatorView} >
						<ActivityIndicatorIOS
							animating
							size='large'
							color = {selectedIndex === 0 ? teamMap[homeAbb].color : teamMap[visitorAbb].color} 
							style = {styles.indicator}
						/>
					</View>
				}

				{
					!this.state.details.loaded && Platform.OS === 'android' &&
					<View style = {styles.indicatorView}>
						<ActivityIndicator
							size  = 'large' 
							style = {styles.indicator}
							color = {selectedIndex === 0 ? teamMap[homeAbb].color : teamMap[visitorAbb].color}
						/>
					</View>
				}
				
				{
					!indicator && this.state.details.loaded && 
						<GamePlayers details = {selectedIndex === 0 ? this.state.details.home : this.state.details.visitor }/>						
				}
			</View>
		);
	}
}

GameDetails.navigatorStyle = {
	statusBarHidden: true,
	navBarTextColor:'white',
	navBarButtonColor: 'white',
	navBarTransparent: true,
	drawUnderNavBar: true,
	navBarTranslucent: false,
	topBarElevationShadowEnabled: false,

}

export default GameDetails;