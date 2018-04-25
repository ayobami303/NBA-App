import React, {Component} from 'react'
import {View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native'

import teamMap from '../../../utils/team-map'

class TeamDetailPlayer extends Component {

	onSelect = () => {
		const {player} = this.props
		this.props.navigator.showModal({
			title:"",
			screen: 'nba.PlayerDetails',
			passProps:{
				player,				
			}
		})		
	}


	render() {
		const { team, player} = this.props
		const teamInfo = teamMap[team.teamAbbr.toLowerCase()]

		const ageExist = player.age && player.height && player.weight
		// alert(ageExist)

		const age = ageExist ? player.age : 'N/A'
		const height = ageExist ? player.height : 'N/A'
		const weight = ageExist ? player.weight : 'N/A'		

		const doesExist = player.pos && player.num
		const position = doesExist ? player.pos + ' ' + player.num : 'N/A'

		return (
			<TouchableHighlight 
				underlayColor = 'transparent'
				onPress = {this.onSelect}
			>
				<View style = {styles.container} >

					<View style = {styles.portrait} >
						<View style = {styles.portraitBackground}>
							<Image source={{uri: `http://stats.nba.com/media/players/230x185/${player.id}.png`}} 
							style = {[styles.portraitImage, { borderColor:teamInfo.color}]} />
						</View>
					</View>

					<View style = {styles.info}>
						<Text style = {styles.infoName} >{ player. name}</Text>
						<Text style = {styles.infoPosition} >{ position }</Text>
					</View>

					<View style ={styles.data}>
						<View style = {styles.dataPerson}>
							<Text style = {styles.dataPersonItem} >{ 'Age: ' + age } </Text>
							<Text style = {styles.dataPersonItem} >{ 'Height: ' + height } </Text>
							<Text style = {styles.dataPersonItem} >{ 'Weight: ' + weight } </Text>
						</View>
						<View style = {styles.dataGame} >
							<View style = {styles.dataGameItem} >
								<Text style = {styles.dataGameItemData} >{ player.pts }</Text>
								<Text style = {styles.dataGameItemLabel} >PTS</Text>
							</View>
							<View style = {styles.dataGameItem} >
								<Text style = {styles.dataGameItemData} >{ player.reb }</Text>
								<Text style = {styles.dataGameItemLabel} >REB</Text>
							</View>
							<View style = {styles.dataGameItem} >
								<Text style = {styles.dataGameItemData} >{ player.ast }</Text>
								<Text style = {styles.dataGameItemLabel} >AST</Text>
							</View>
							<View style = {styles.dataGameItem} >
								<Text style = {styles.dataGameItemData} >{ player.min }</Text>
								<Text style = {styles.dataGameItemLabel} >MIN</Text>
							</View>
							<View style = {styles.dataGameItem} >
								<Text style = {styles.dataGameItemData} >{ player.gp}</Text>
								<Text style = {styles.dataGameItemLabel} >GP</Text>
							</View>
						</View>
					</View>					


				</View>
			</TouchableHighlight>
		);
	}
}


export default TeamDetailPlayer;


const styles = StyleSheet.create({
	container:{
		borderColor:'#E1E1E1',
		borderBottomWidth: 1,
		height: 60,
		flexDirection: 'row'
	},
	portrait:{
		flex:1,
		justifyContent: 'center'
	},
	portraitBackground:{
		alignSelf: 'center',
		backgroundColor: '#fff',
		borderRadius:18,
		height: 36,
		width: 36
	},
	portraitImage:{
		height: 36,
		width: 36,
		borderRadius:18,
		borderWidth:1
	},
	info:{
		flex:2,
		justifyContent: 'center'
	},
	infoName:{
		color: '#7C7C7C',
		fontSize: 17
	},
	infoPosition:{
		color: '#7C7C7C',
		fontSize: 17
	},
	data:{
		flex: 4,
		justifyContent: 'center'
	},
	dataPerson:{
		flexDirection: 'row'
	},
	dataPersonItem:{
		color: '#909caf',
		fontSize: 15,
		marginRight: 10
	},
	dataGame:{
		flexDirection: 'row'
	},
	dataGameItem:{
		alignItems: 'flex-end',
		flexDirection:'row',
		marginRight: 10
	},
	dataGameItemData:{
		color: '#6b7c96',
		fontSize: 17,
		position: 'relative',
		top:1
	},
	dataGameItemLabel:{
		fontSize: 12,
		color: '#6b7c96'
	}
})