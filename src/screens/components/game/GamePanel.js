import React, {Component} from 'react'
import {View, Text, Image, TouchableHighlight} from 'react-native'
import _ from 'lodash'
import {Navigation} from 'react-native-navigation'
import PropTypes from 'prop-types'

import styles from './styles/GamePanel'
import teamMap from '../../../utils/team-map'


class GamePanel extends Component{



	onPressRow = () => {
		const {game,date,action,Text,details} = this.props
		// alert(JSON.stringify(details))
		this.props.navigator.showModal({
			title: "",
			screen: 'nba.GameDetails',
			passProps:{
				game,
				date,
				action,
				details
			}
		})
	}

	render() {
		const {game} = this.props

		const homeAbb = _.lowerCase(game.home.team)
		const visitorAbb = _.lowerCase(game.visitor.team)

		let gameProcess = ''
		let cssType = ''
		switch(game.type){
			case 'unstart':
				gameProcess = _.replace(game.date,/\s*ET\s*/, '');
				cssType = 'Unstart'
			break;

			case 'live':
				gameProcess += game.process.quarter + ' '
				gameProcess += _.replace(game.process.time, /\s+/, '')
				cssType = 'Live'
			break;

			case 'over':
				gameProcess = 'Final'
				cssType = 'Over'
			break;

			default:
				return
			break;
		}

		const homeLogo = teamMap[homeAbb].logo
		const vistorLogo = teamMap[visitorAbb].logo
		return (
			<TouchableHighlight underlayColor = "transparent" onPress ={this.onPressRow} >
				<View style ={[styles.container, {backgroundColor: teamMap[homeAbb].color}]}>
					<View style ={styles.team}>
						<Image source={homeLogo} style ={styles.teamLogo} />
						<Text style ={styles.teamCity}>{teamMap[homeAbb].city}</Text>
						<Text style ={styles.teamName}> {teamMap[homeAbb].team}</Text>
					</View>
					<View style ={styles.gameInfo}>
						<Text style ={[styles.infoProcess,styles[`process${cssType}`]]}> {gameProcess} </Text>
						{
							game.type !== 'unstart' && 
							<View style ={styles.infoScorePanel}>
								<Text style = {styles.infoScore}>{game.home.score}</Text>
								<View style = {styles.infoDivider} />
								<Text style = {styles.infoScore}>{game.visitor.score}</Text>
							</View>
						}						
					</View>
					<View style ={styles.team}>
						<Image source={vistorLogo} style ={styles.teamLogo} />
						<Text style ={styles.teamCity}>{teamMap[visitorAbb].city}</Text>
						<Text style ={styles.teamName}> {teamMap[visitorAbb].team}</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

GamePanel.propTypes = {
	navigator: PropTypes.object,
	action: PropTypes.object
}

export default GamePanel;