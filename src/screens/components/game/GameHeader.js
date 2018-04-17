import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment-timezone'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {connect} from 'react-redux'

class GameHeader extends Component{

	constructor(props){
		super(props);
	   
	}
	
	componentDidMount(){
		// this._retrieveGameGeneral()
	}

	_retrieveGameGeneral = () => {
		const {date} = this.props;
		this.props.action.getGameGeneral(date[0], date[1], date[2])
		.then(() => {
			// alert(JSON.stringify(this.props.live.gameData))
		})
	}

	
	render() {
		const date = this.props.date
		const live = this.props.live.gameData.live
		const unstart = this.props.live.gameData.unstart
		const over = this.props.live.gameData.over
		// alert(JSON.stringify(this.props))
		const gameCount = _.size(live) + _.size(unstart)  + _.size(over) 
		return (
			<View style = {styles.header} >
				<TouchableHighlight underlayColor = 'transparent' onPress ={this.props.changeDate} >
					<Icon style = {styles.calendarIcon} name="md-calendar" size={27} />
				</TouchableHighlight>
			
				<Text style = {styles.gameDate} >{date[0] + '-' + date[1] + '-' + date[2]}</Text>							
				<Text style = {styles.gameCount}>{gameCount + ' Games'} </Text>					
			</View>
		);
	}
}


GameHeader.propTypes= {
	action: PropTypes.object.isRequired,
	live: PropTypes.object,
	unstart: PropTypes.object,
	over: PropTypes.object,
}


export default (GameHeader);

const styles = StyleSheet.create({
	header:{
		height: 110,
		backgroundColor: '#4d98e4',
		flexDirection: 'column',
		position: 'relative',
		paddingLeft: 15,
	},
	calendarIcon:{
		height:25,
		width: 30,
		color:'white',
		marginTop: 12,
		alignSelf: 'flex-end',
		marginRight: 15,
	},
	gameDate:{
		fontSize: 30,
		fontWeight: 'bold',
		color: '#fff'
	},
	gameCount:{
		fontSize: 16,
		fontWeight: '200',
		color: '#fff'
	},
})