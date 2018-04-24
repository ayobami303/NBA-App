import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ListView, InteractionManager} from 'react-native'
import axios from 'axios'

import {NBA_TEAM_INFO, NBA_TEAM_DETAILS, NBA_TEAM_DETAILS_BASICS} from '../../../constants/api'
import * as producers from '../../../utils/producers'
import TeamDetailPlayer from './TeamDetailPlayer'

const listHeight = Dimensions.get('window').height - 30 - 90 - 35

const d = new Date();
const currentMonth = d.getMonth() + 1

let season
if(currentMonth >= 10){
	season = d.getFullYear().toString() + '-' + (d.getFullYear() + 1).toString().substring(2,4)
}else{
	season = (d.getFullYear().toString() - 1) + '-' + d.getFullYear().toString().substring(2,4)
}


class TeamDetails extends Component {
	constructor(props){
		super(props)

		const {id} = this.props
		let dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2		
		})
		

		this.state = {
			team: {},
			dataSource,
			data: {}
		}

	}

	renderRow = (player, _, index) =>{
		const {navigator, id} = this.props
		const {team} = this.state

		return(
			<TeamDetailPlayer />
		)

	}

	componentDidMount(){
		const {id} = this.props

		InteractionManager.runAfterInteractions(()=>{
			Promise.resolve(this.getTeamInfo(id))
			.then(()=>{
				Promise.resolve(this.getTeamDetails(id))
				.then(()=>{					
					// alert(JSON.stringify(this.state.data))
					const {data, dataSource} = this.state
					if(data[id] && data[id].players){
						dataSourceNew = dataSource.cloneWithRows(data[id].players)
					}
					this.setState({
						dataSource: dataSourceNew,
						team: data[id]
					})
				})
			})
		})
	}

	getTeamInfo = (id) => {
		
		let data = {};
		return axios.get(`${NBA_TEAM_INFO}${id}&season=${season}`)
		.then(res =>{
			const info = producers.teamInfo(res.data)
			// alert(JSON.stringify(info))
			data[id] = info
			this.setState({
				data
			})
		})
	}

	getTeamDetails = (id) =>{
		return Promise.all([
			axios.get(`${NBA_TEAM_DETAILS}${season}&SeasonSegment=&SeasonType=Regular+Season&TeamID=${id}&VsConference=&VsDivision=`)
			.then(res=>producers.teamDetails(res.data)),
			axios.get(`${NBA_TEAM_DETAILS_BASICS}${season}&TeamID=${id}`)
			.then(res=>producers.teamDetailsBasics(res.data))
		])
		.then(result =>{
			const details = result[0]
			const detailsBasics = result[1]

			const data = details.map((player) =>{
				return Object.assign({}, player, detailsBasics[player.id])
			})
			let prevData = this.state.data
			prevData[id].players = data
			// alert(JSON.stringify(prevData))	

			this.setState({
				data: prevData
			})
		})
		
	}


	render() {

		const {dataSource} = this.state
		return (
			<View style = {styles.container} >
				<View style = {[styles.header, {backgroundColor:'blue'} ]} >
					<View style = {styles.headerTeam} >
						<Text style = {styles.headerTeamCity} >Team city</Text>
						<Text style = {styles.headerTeamName} >Team name</Text>
					</View>
					<View style = {styles.headerLogo} >
						<Image style = {styles.headerLogoImage} source={{uri:'http://via.placeholder.com/50x50'}} />
					</View>
					<View style = {styles.headerRank}>
						<Text style = {styles.headerRankResult} > 22 W - 12 L </Text>
						<Text style = {styles.headerRankConf} > # 2 in the eastern Conference </Text>
						<Text style = {styles.headerRankDivi} > # 2 in the 2nd Division </Text>
					</View>
				</View>
				<View style = {styles.dataInfo} >
					<View style = {styles.dataInfoItem} >
						<Text style = {styles.itemLabel} >PPG</Text>
						<Text style = {styles.itemData} >4th</Text>
					</View>
					<View style = {styles.dataInfoItem} >
						<Text style = {styles.itemLabel} >RPG</Text>
						<Text style = {styles.itemData} >4th</Text>
					</View>
					<View style = {styles.dataInfoItem} >
						<Text style = {styles.itemLabel} >APG</Text>
						<Text style = {styles.itemData} >4th</Text>
					</View>
					<View style = {styles.dataInfoItem} >
						<Text style = {styles.itemLabel} >OPPG</Text>
						<Text style = {styles.itemData} >4th</Text>
					</View>
				</View>

				<ListView 
					dataSource = {dataSource}
					renderRow = {this.renderRow}
					style = {styles.listview}
				/>
			</View>
		);
	}	
}

TeamDetails.navigatorStyle = {
	statusBarHidden: true,
	navBarTextColor:'white',
	navBarButtonColor: 'white',
	navBarTransparent: true,
	drawUnderNavBar: true,
	navBarTranslucent: false,
	topBarElevationShadowEnabled: false,

}

export default TeamDetails;

const styles = StyleSheet.create({
	container:{
		flexDirection: 'column',
		backgroundColor: '#fff'
	},
	header:{
		paddingTop:35,
		height: 160,
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingBottom: 15
	},
	headerTeam:{
		flex: 1.5,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	headerTeamCity:{
		color: '#fff',
		fontSize: 17
	},
	headerTeamName:{
		color: '#fff',
		fontSize: 13
	},
	headerLogo:{
		flex:1,
		justifyContent: 'center'
	},
	headerLogoImage:{
		alignSelf: 'flex-start',
		height: 70,
		width: 70
	}, 
	headerRank:{
		flex: 1.5,
		justifyContent: 'center'
	},
	headerRankResult:{
		color: '#fff',
		fontSize: 10
	},
	headerRankConf:{
		color: '#fff',
		fontSize: 10
	},
	headerRankDivi:{
		color: '#fff',
		fontSize: 10
	},
	dataInfo:{
		alignItems: 'center',
		flexDirection:'row',
		height: 35
	},
	dataInfoItem:{
		alignItems:'flex-end',
		flex:1,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	itemLabel:{
		color: '#6b7c96',
		fontSize: 10
	},
	itemData:{
		color: '#6b7c96',
		fontSize: 15,
		fontWeight: '600',
		marginLeft: 2,
		position: 'relative',
		top: 2
	},
	listview:{
	backgroundColor: '#f4f4f4'		,
	height: listHeight
	}
})