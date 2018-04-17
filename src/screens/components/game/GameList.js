import React, {Component} from 'react'
import {View, Text, ListView, TouchableHighlight} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment-timezone'
import _ from 'lodash'

import styles from './styles/GameList'
import GamePanel from './GamePanel'
import ProgressBar from '../../global/ProgressBar'


class GameList extends Component{

	constructor(props){
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    this.state = {			
	      	dataSource:ds,	
	      	isLoading: true,
	      	screenAppear: false     	
	    };

	    this.mount = true;
	    this.timeout = null
	 
	 	this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
	}

	onNavigatorEvent(event){
		switch(event.id){
			case 'didAppear':
				this.setState({
					screenAppear:true
				})
			break;
		}
	}
	// componentDidMount(){
	// 	const {action} = this.props
	// 	action.getLeagueStanding();
	// }

  	componentWillReceiveProps (props) {
  		const {action, getTabHeight, date} = props
  		const {live, over, unstart, application} = props.live.gameData
  		const {dataSource} = this.state
  		const rows = _.merge(live, unstart, over)
  		// const rows = live.concat(unstart).concat(over)
  		// alert(JSON.stringify(rows))
  		
		
		this.setState({
  			isLoading:true
  		})

		const gameCount = _.size(rows) 
		let computedHeight = 125 * gameCount
  		getTabHeight('game', computedHeight)


  		if(this.state.screenAppear){
	  		if(this.state.isLoading){
				action.getGameGeneral(date[0], date[1], date[2])
	  		}else{
		  		if (_.size(live) > 0){
		  			clearTimeout(this.timeout)
		  			this.timeout = setTimeout(() => {action.getGameGeneral(date[0], date[1], date[2])}, 2000);
		  		}else if(_.size(unstart) > 0){
		  			clearTimeout(this.timeout)
		  			this.timeout = setTimeout(() => {action.getGameGeneral(date[0], date[1], date[2])}, 10000);
		  		}

		  		if(this.mount){
			  		this.setState({
						dataSource: this.state.dataSource.cloneWithRows(rows)
					})
			  	}
			}
		}

	  	if(rows){
	  		this.setState({
	  			isLoading:false
	  		})
	  	}
  	}

  	componentWillUnmount(){
  		this.mount = false
  	}

	_renderRow = (game, index) => {
		const {navigator, action, date} = this.props
		const details = this.props.live.details
		// alert(JSON.stringify(game))
		return (<GamePanel game = {game} date = {date} details={details} action ={action} navigator = {navigator} />)
	}

	render() {
		// alert(JSON.stringify(this.props.live))
  		const {live, over, unstart} = this.props.live.gameData
  		const rows = _.merge(live, unstart, over)
		const gameCount = _.size(rows) 
		let computedHeight = 120 * gameCount
		return (			
			this.state.isLoading ? <ProgressBar /> : 
			<View style = {styles.container}  >				
				<ListView
				style = {styles.listView}
				dataSource = {this.state.dataSource}
				renderRow = {this._renderRow}
				/>
			</View>
		);
	}
}

GameList.propTypes= {
	action: PropTypes.object.isRequired,
	unstart: PropTypes.object,
	live: PropTypes.object,
	over: PropTypes.object,
	navigator: PropTypes.object.isRequired
}

export default GameList;