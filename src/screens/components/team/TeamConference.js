import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, Dimensions, ListView, TouchableHighlight} from 'react-native'

import teamMap from "../../../utils/team-map"

const listHeight = Dimensions.get('window').height - 100 - 45

class TeamConference extends Component{

	constructor(props){
		super(props)

		let teamMapById = {}
		for(let key in teamMap){
			teamMapById[teamMap[key].id] = Object.assign({}, teamMap[key], {abbr:key})
		}

		this.teamMapById = teamMapById
	}

	selectTeam = (id) => {
		// alert(id)
		const {teamRank} =  this.props
		this.props.navigator.showModal({
			title: "",
			screen: 'nba.TeamDetails',
			passProps:{
				id
			}
		})
	}

	renderRow = (item, _, index) =>{
		const team = Object.assign({}, this.teamMapById[item.id], item)
		const itemStyle = index % 2 === 0 ? styles.item : [styles.item, styles.itemEven]

		const teamLogo = team.abbr === 'hou' ? teamMap[team.abbr].logo2 : teamMap[team.abbr].logo
		return(
			<TouchableHighlight onPress={() => this.selectTeam(team.id)} underlayColor = 'transparent' >
				<View style={itemStyle} >
					<View style = {styles.order}>
						<Text style = {styles.orderLabel} >{parseInt(index, 10) + 1}</Text>
					</View>
					<View style={styles.team}>
						<Text style = {styles.teamCity}>{team.city}</Text>
						<Text style = {styles.teamName}>{team.team}</Text>
					</View>
					<View style = {styles.standing} >
						<Text style = {styles.standingLabel}>{team.loss} - {team.win}</Text>
					</View>
					<View style = {styles.logo}>
						<Image source = {teamLogo} style ={styles.logoImage} />
					</View>
				</View>
			</TouchableHighlight>
		)
	}

	render() {
		const {data} = this.props
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2)=> row1 !== row2
		}).cloneWithRows(data)

		return (
			<ListView 
				dataSource = {dataSource}
				renderRow = {this.renderRow}
				style = {styles.listView}
			/>
		);
	}
}

export default TeamConference;


const styles = StyleSheet.create({
	listView:{
		height: listHeight
	},
	item:{
		height:70,
		flex:1,
		flexDirection: 'row'
	},
	itemEven:{
		backgroundColor: '#f4f4f4'
	},
	order:{
		alignSelf:'center',
		width: 50
	},
	orderLabel:{
		color: '#6b7c96',
		fontSize: 11,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	team:{
		flex: 5,
		justifyContent: 'center'
	},
	teamCity:{
		color:'#6b7c96',
		fontSize: 18,
		fontWeight:'300'
	},
	teamName:{
		color:'#909caf',
		fontSize: 13
	},
	standing:{
		alignSelf: 'center',
		flex:3,
	},
	standingLabel:{
		textAlign:'right',
		color: '#6b7c96'
	},
	logo:{
		alignSelf:'center',
		flex:3
	},
	logoImage:{
		width:35,
		height:35,
		alignSelf: 'center'
	}

})