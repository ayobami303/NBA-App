import React, {Component} from 'react'
import {Text, ScrollView, View, StyleSheet} from 'react-native'
import moment from 'moment-timezone'
import axios from 'axios'

import CollectionView from '../../../utils/CollectionView'
import TeamConference from './TeamConference'
import {NBA_URL, NBA_TEAM_RANK} from '../../../constants/api'
import * as producers from '../../../utils/producers'


class TeamList extends Component{

	constructor(props){
		super(props)
		this.state = {
			teamRank:{},
			loaded: false
		}
	}

	componentDidMount(){
		const dateString = moment.tz(Date.now(), 'Africa/Lagos').format()
		const dateArray = dateString.replace('T', '-').split('-');
		this.getTeamRank(dateArray[0], dateArray[1], dateArray[2])
	}

	getTeamRank = (year, month, date) => {

		return axios.get(`${NBA_TEAM_RANK}${month}/${date}/${year}`,
			{ headers: { host: 'stats.nba.com',
						"cache-control":"max-age=0",
						connection: 'keep-alive',
						"accept-encoding" : "Accepflate, sdch",
						'accept-language':'he-IL,he;q=0.8,en-US;q=0.6,en;q=0.4',
						'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'}})
		.then(res => {
			const teamRank = producers.teamRank(res.data)
			// alert(JSON.stringify(teamRank))
			this.setState({
				teamRank,
				loaded:true
			})
		})
		.catch(error =>{
			console.log('Team Rank', error)
		})
	}
	

	render() {
		const {conference, scrollEnd, navigator} = this.props
		const {teamRank, loaded} = this.state		

		return (
			<View>
				{loaded && 
					<CollectionView scrollEnd={scrollEnd}>
						{[<TeamConference navigator = {navigator} data = {teamRank.western} key = {0} />, 
						<TeamConference navigator = {navigator} data = {teamRank.eastern} key = {1} />]}
					</CollectionView>
				}
			</View>
		);
	}
}

export default TeamList;