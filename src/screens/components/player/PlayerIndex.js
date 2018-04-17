import React, {Component} from 'react'
import {View, Text, ListView, StyleSheet, TouchableHighlight} from 'react-native'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Ionicons'

import * as types from '../../../constants/actionTypes'
import {NBA_URL, NBA_STANDING_URL, NBA_GAME_DETAILS, NBA_PLAYER_LIST} from '../../../constants/api'
import * as producers from '../../../utils/producers'
import userDefault from '../../../utils/userDefault'

class PlayerIndex extends Component{

	constructor(props){
		super(props)
		const ds = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2 
		})
		this.state ={
			data:[],
			recent: [],
			dataSource:ds.cloneWithRows(['row 1', 'row 2'])
		}
	}

	componentDidMount(){
		Promise.resolve(this.getPlayerList())
		.then(() => {
			this.props.setPlayerList(this.state.data)
			this.getSearchRecord()
		})		
		
	}

	getPlayerList(){		

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
				
				this.setState({
					data: playerLists
				})
				console.log('get player list', res.data)
			})
			.catch(error => {
				console.log('get player list', error)
			})			
	}


	getSearchRecord = () =>{
		return userDefault.get(types.PLAYER_RECENT)
		.then(recent =>{
 			let originData = []

 			if (recent){
 				originData = Object.assign([], recent)
 			}
 			this.setState({
 				recent: originData
 			})
				console.log('get player list', originData)
		})
		.catch(error => {
			console.log('get search records', error)
		})
	}

	setSearchRecords = (player) => {
		return userDefault.get(types.PLAYER_RECENT)
		.then(recent => {
			let originData = []

			if (recent){
				originData = Object.assign([], recent)
			}

			/*if recent record has player, return*/
			if(originData.find((data, index) => {
				return data.id === player.id
			})) return Promise.resolve()

			if(originData.length === 10) originData.pop()
			originData.unshift(player)
			return userDefault.set(types.PLAYER_RECENT, originData)
			.then(() => {
				this.setState({
	 				recent: originData
	 			})
			})
		})
	}

	selectPlayer = (player) =>{
		const {navigator} = this.props
		this.setSearchRecords(player)
		
		navigator.showModal({
			title: "",
			screen: 'nba.PlayerDetails',
			passProps:{
				player,				
			}
		})
	}


	renderRow = (player, _, index) => {
		return(
			<TouchableHighlight  onPress ={() => this.selectPlayer(player)} underlayColor='transparent'>
				<View style ={styles.panel}>
					<View style ={styles.panelLeft}>
						<Text style ={styles.panelName}>{player.name}</Text>
						<Text style ={styles.panelTeam}>{player.teamCity + ' ' + player.teamName}</Text>
					</View>
					<View style ={styles.panelRight}>
						<Icon name='md-play' size={16} color='#6b7c96' style = {styles.enterIcon} /> 
					</View>
				</View>
			</TouchableHighlight>)
	}

	render() {
		// alert(JSON.stringify(this.props.dataSource.length))
		let computedHeight = 500
		if(this.props.dataSource.length > 0){
			let computedHeight = this.props.dataSource.length * 80
		}
			this.props.getTabHeight('player',computedHeight)

		const dataSource = this.state.dataSource
		let myDataSource = dataSource.cloneWithRows(this.props.dataSource)

		if(!this.props.text.length){
			myDataSource = dataSource.cloneWithRows(this.state.recent);
		}

		return (
			<View style = {styles.container}>
				<ListView 
					dataSource = {myDataSource}
					renderRow = {this.renderRow}
					style = {styles.list}
				/>
			</View>
		);
	}
}


export default PlayerIndex;


const styles = StyleSheet.create({
	container:{
		flex:1
	},	
	list:{
		flex:1
	},
	panel:{
		borderColor:'#979797',
		borderBottomWidth:1,
		height: 65,
		flexDirection:'row'
	},
	panelLeft:{
		flex:1,
		paddingLeft: 10,
		justifyContent: 'center'
	},
	panelName:{
		color:'#6b7c96',
		fontSize:17
	},
	panelTeam:{
		color:'#909caf',
		fontSize: 13
	},
	panelRight:{
		height: 65,
		position: 'relative',
		width: 30
	},
	enterIcon:{
		height:30,
		left: -15,
		marginLeft: -15,
		marginTop: -15,
		position: 'absolute',
		top: 32.5,
		width:30
	}
})