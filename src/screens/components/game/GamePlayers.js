import React, {Component} from 'react'
import {Text, View, ScrollView, ListView} from 'react-native'

import styles from './styles/GamePlayers'


class PlayerRow extends Component{
	render(){
		const {player, last} = this.props

		return(
			<View style = {!last ? styles.playerBox : [styles.playerBox, styles.playerBoxLast]} >
				<View style = {[styles.p2, styles.p2Name]} ><Text style={styles.pName}>{player.first_name.substring(0, 1) + '.' + player.last_name}</Text></View>
				<View style={styles.p1}><View style = {{flexDirection:'column', flex:1}}><Text style = {styles.dataBox}>{player.starting_position ? player.starting_position : '-'}</Text></View></View>
				<View style={styles.p1}><View style = {{flexDirection:'column', flex:1}}><Text style = {styles.dataBox}>{player.points}</Text></View></View>
				<View style={styles.p1}><View style = {{flexDirection:'column', flex:1}}><Text style = {styles.dataBox}>{player.assists}</Text></View></View>
				<View style={styles.p1}><View style = {{flexDirection:'column', flex:1}}><Text style = {styles.dataBox}>{parseInt(player.rebounds_defensive, 10) + parseInt(player.rebounds_offensive, 10)}</Text></View></View>
				<View style={styles.p1}><View style = {{flexDirection:'column', flex:1}}><Text style = {styles.dataBox}>{player.field_goals_made + '-' + player.field_goals_attempted}</Text></View></View>
				<View style={styles.p1}><View style = {{flexDirection:'column', flex:1}}><Text style = {styles.dataBox}>{player.block}</Text></View></View>
				<View style={styles.p1}><View style = {{flexDirection:'column', flex:1}}><Text style = {styles.dataBox}>{player.steal}</Text></View></View>
				<View style={styles.p1}><View style = {{flexDirection:'column', flex:1}}><Text style = {styles.dataBox}>{player.three_pointers_made + '-' + player.three_pointers_attempted}</Text></View></View>
				<View style={styles.p1}><View style = {{flexDirection:'column', flex:1}}><Text style = {styles.dataBox}>{player.free_throws_made + '-' + player.free_throws_attempted}</Text></View></View>
				<View style={styles.p1}><View style = {{flexDirection:'column', flex:1}}><Text style = {styles.dataBox}>{player.turnovers}</Text></View></View>
				<View style={styles.p1}><View style = {{flexDirection:'column', flex:1}}><Text style = {styles.dataBox}>{player.fouls}</Text></View></View>
				<View style={styles.p1}><View style = {{flexDirection:'column', flex:1}}><Text style = {styles.dataBox}>{player.plus_minus}</Text></View></View>
				<View style={[styles.p1, styles.lastP1]}><View style = {{flexDirection:'column', flex:1}}><Text style = {styles.dataBox}>{player.minutes}</Text></View></View>

			</View>
		)
	}
}



class GamePlayers extends Component{

	constructor(props){
		super(props)
		// const ds = new ListView.DataSource({
		// 		rowHasChanged: (row1, row2) => row1 !== row2
		// 	})
		this.state= {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			})
		}
	}

	componentDidMount(){
		const {details} = this.props
		this.updateDataSource(details);
	}

	updateDataSource = (details) => {
		const {dataSource} = this.state
		let rows = Object.assign([], details.player)
		rows.unshift({}) //unshift an empty oject, use it as title row

		this.setState({
			dataSource: dataSource.cloneWithRows(rows)
		})

	}
	

	renderTitle =(index) => {
		return (
			<View style = {[styles.playerBox, styles.titleRow]} key = {index} >
				<View style={styles.p2} />
				<View style={styles.p1} ><View style= {{flexDirection: 'column', flex:1}}><Text style = {styles.title} >P</Text></View></View>
				<View style={styles.p1} ><View style= {{flexDirection: 'column', flex:1}}><Text style = {styles.title} >PTS</Text></View></View>
				<View style={styles.p1} ><View style= {{flexDirection: 'column', flex:1}}><Text style = {styles.title} >AST</Text></View></View>
				<View style={styles.p1} ><View style= {{flexDirection: 'column', flex:1}}><Text style = {styles.title} >REB</Text></View></View>
				<View style={styles.p1} ><View style= {{flexDirection: 'column', flex:1}}><Text style = {styles.title} >FG</Text></View></View>
				<View style={styles.p1} ><View style= {{flexDirection: 'column', flex:1}}><Text style = {styles.title} >BLK</Text></View></View>
				<View style={styles.p1} ><View style= {{flexDirection: 'column', flex:1}}><Text style = {styles.title} >STL</Text></View></View>
				<View style={styles.p1} ><View style= {{flexDirection: 'column', flex:1}}><Text style = {styles.title} >3PT</Text></View></View>
				<View style={styles.p1} ><View style= {{flexDirection: 'column', flex:1}}><Text style = {styles.title} >FT</Text></View></View>
				<View style={styles.p1} ><View style= {{flexDirection: 'column', flex:1}}><Text style = {styles.title} >TO</Text></View></View>
				<View style={styles.p1} ><View style= {{flexDirection: 'column', flex:1}}><Text style = {styles.title} >PF</Text></View></View>
				<View style={styles.p1} ><View style= {{flexDirection: 'column', flex:1}}><Text style = {styles.title} >+/-</Text></View></View>
				<View style={styles.p1} ><View style= {{flexDirection: 'column', flex:1}}><Text style = {styles.title} >MIN</Text></View></View>
			</View> 
		)
	}

	renderRow = (player, _, i) => {
		const index = parseInt(i, 10)
		const {details} = this.props

		if(index === 0 ){
			return this.renderTitle(index)
		}

		return(<PlayerRow player={player} key = {index} last = {index === details.player.length} />)
	}

	render() {
		const horizontal = true
		const {dataSource} = this.state
		return (
			<View style = {styles.container} >
				<ScrollView
					style = {styles.scrollView}
					horizontal = {horizontal}
					automaticallyAdjustContentInsets = {false}
				>
					<ListView 
						dataSource = {dataSource}
						renderRow = {this.renderRow}
						style = {styles.listView}
					/>
				</ScrollView>
			</View>
		);
	}
}

export default GamePlayers;