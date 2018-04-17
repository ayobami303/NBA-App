import React, {Component} from 'react'
import {StatusBar, Dimensions, View, Text, Image, StyleSheet, ScrollView} from 'react-native'
import axios from 'axios'

import {NBA_PLAYER_DETAILS, NBA_PLAYER_LOG} from '../../../constants/api'
import * as producers from '../../../utils/producers'
import teamMap from '../../../utils/team-map'
import PlayerLog from './PlayerLog'
import PlayerTrend from './PlayerTrend'

class PlayerDetails extends Component {
	constructor(props){
		super(props)
		this.state = {
			player: null,
			log: null
		}
	}

	componentDidMount(){
		const {player} = this.props
		Promise.resolve(this.getPlayerDetails(player.id))
		.then(() =>{
			this.getPlayerLog(player.id)
		})
	}

	getPlayerDetails = (id) =>{
		// const producers
		// alert(JSON.stringify(id))
		return axios.get(`${NBA_PLAYER_DETAILS}${id}&SeasonType=Regular+Season`,			
					{ headers: { host: 'stats.nba.com',
						"cache-control":"max-age=0",
						connection: 'keep-alive',
						"accept-encoding" : "Accepflate, sdch",
						'accept-language':'he-IL,he;q=0.8,en-US;q=0.6,en;q=0.4',
						'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'}})
		.then(data => {
			const details = producers.playerDetails(data.data)
			this.setState({
				player:details
			})
		})
	}

	getPlayerLog = (id) => {
		const d = new Date();
		const currentMonth = d.getMonth() + 1
		
		let season
		if(currentMonth >= 10){
			season = d.getFullYear().toString() + '-' + (d.getFullYear() + 1).toString().substring(2,4)
		}else{
			season = (d.getFullYear().toString() - 1) + '-' + d.getFullYear().toString().substring(2,4)
		}

		return axios.get(`${NBA_PLAYER_LOG}${id}&Season=${season}&SeasonType=Regular+Season`)
		.then(data => {
			const log = producers.playerLog(data.data)
			this.setState({
				log: log
			})
			// alert(JSON.stringify(log))
		})
	}

	render() {
		const {player, log} = this.state
		const team = player && player.team.toLowerCase()

		const teamColor = team ? teamMap[team].color : 'grey'
		const scrollHeight = Dimensions.get('window').height - 160
		return (
			
			<View style = {styles.container} >
				{player && 
					<View>
						<StatusBar
		                    backgroundColor="#F57F5A"
		                    barStyle="light-content"
		                />
						<View style ={[styles.header, {backgroundColor:teamColor}]} >
							<View style ={styles.potraitView}>
								<Image style = {styles.potrait} source ={{uri:`http://stats.nba.com/media/players/230x185/${player.id}.png`}}/>
							</View>
							<Text style= {styles.name}>{player.firstName + ' ' + player.lastName}</Text>
							<Text style= {styles.jersey}>{player.jersey}</Text>
						</View>
						<ScrollView style = {{height:scrollHeight}}>
							<View style = {styles.basicData}>
								<View style = {styles.basicDataBlock}>
									<Text style ={styles.basicDataNumber}>{player.pts}</Text>
									<Text style ={styles.basicDataMark}>Point</Text>
								</View>
							
								<View style = {styles.basicDataBlock}>
									<Text style ={styles.basicDataNumber}>{player.ast}</Text>
									<Text style ={styles.basicDataMark}>Assist</Text>
								</View>
							
								<View style = {styles.basicDataBlock}>
									<Text style ={styles.basicDataNumber}>{player.reb}</Text>
									<Text style ={styles.basicDataMark}>Rebound</Text>
								</View>
							</View>
							{log && 
								<View> 
									<PlayerLog data = {log}/>
									<View style = {styles.logDivider} />
									<PlayerTrend data = {log} color ={teamColor} />
								</View>
							}
						</ScrollView>
					</View>
				}
			</View>
		);
	}
}


PlayerDetails.navigatorStyle = {
	statusBarHidden: true,
	navBarTextColor:'white',
	navBarButtonColor: 'white',
	navBarTransparent: true,
	drawUnderNavBar: true,
	navBarTranslucent: false,
	topBarElevationShadowEnabled: false,

}

export default PlayerDetails;


const styles = StyleSheet.create({
	container:{
		flexDirection: 'column',
		backgroundColor: 'white',
	},
	header:{
		height:160
	},
	potraitView:{
		alignSelf:'center',
		backgroundColor: 'white',
		borderRadius: 60,
		marginTop: 35,
		width:60,
		height: 60	
	},
	potrait:{
		borderRadius: 30,
		width:60,
		height: 60
	},
	name:{
		alignSelf:'center',
		color: 'white',
		fontSize:16,
		marginTop: 5

	},
	jersey:{
		alignSelf:'center',
		color: 'white',
		fontSize:14
	},
	basicData:{
		flexDirection:'row',
		height:28,
		justifyContent: 'center'
	},
	basicDataBlock:{
		alignItems: 'flex-end',
		justifyContent:'center',
		flexDirection:'row',
		width:100
	},
	basicDataNumber:{
		color:'#909caf',
		fontSize:19,
		fontWeight: '500',
		marginRight: 3
	},
	basicDataMark:{
		color:'#909caf',
		fontSize:12,		
		bottom: 1,
		position: 'relative'
	},
	logDivider:{
		height: 3,
		backgroundColor:'#eee',
		marginHorizontal: 10,
		marginVertical:15
	}
})