import React, {Component} from 'react'
import {View, StatusBar, TouchableHighlight, RefreshControl, Text, ScrollView, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment-timezone'

import GameList from './components/game/GameList'
import GameHeader from './components/game/GameHeader'
import PlayerHeader from './components/player/PlayerHeader'
import PlayerIndex from './components/player/PlayerIndex'
import * as applicationAction from '../actions/application'
import * as gameActions from '../actions/game'
import * as playerActions from '../actions/player'

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			tab: 0,
			gameTabHeight: 200,
			date: this.getToday(),
			isToday:true,
			isLoading: true,
			isRefreshing: false,
			playerList: [],
			text:'',
			dataSource: {}			
		}
		this.gameTabHeight = 200
		// alert(JSON.stringify(this.props.gameActions.changeTab('game', 270)))
	}

	componentDidMount(){		
		this._retrieveGameGeneral()	
	}

	componentWillMount(){
		// this._retrieveGameGeneral()
	}

	componentWillReceiveProps(nextProps){
		// nextProps.gameActions.getLeagueStanding();
		// alert(JSON.stringify(nextProps));
		// this.setState({
		// 	tab: nextProps.application.tab
		// })
	}

	_retrieveGameGeneral = (isRefreshed) => {
		const {date} = this.state;
		this.props.gameActions.getGameGeneral(date[0], date[1], date[2])
		if(isRefreshed && this.setState({isRefreshing: false}));
	}	

	_getTabHeight = (tabName, height) => {
		// if( tabName === 'game') this.setState({gameTabHeight: height})
			this.gameTabHeight = height
		// alert(height)		
	}

	// get date format
	getToday = () =>{
		const dateString = moment.tz(Date.now(), 'Africa/Lagos').format();
		const dateArray = dateString.replace('T', '-').split('-')
		return dateArray.splice(0,3);
	}


	getYesterday = () => {
		let d = new Date();
		d.setDate(d.getDate() - 1)
		const dateString = moment.tz(d, 'Africa/Lagos').format();
		const dateArray = dateString.replace('T', '-').split('-')
		return dateArray.splice(0,3);
	}

	// switch between yesterday and today
	_changeDate = () => {
		const {isToday} = this.state;
		// const {action} = this.props;

		if(isToday){
			const date = this.getYesterday();
			gameActions.getGameGeneral(date[0], date[1], date[2])
			this.setState({
				date,
				isToday: false,
				isLoading: false
			})
		}else{
			const date = this.getToday();
			gameActions.getGameGeneral(date[0], date[1], date[2]);
			this.setState({
				date,
				isToday: true,
				isLoading: false
			})
		}
		
	}

	_onRefresh(){
		this.setState({isRefreshing: true})
		this._retrieveGameGeneral('isRefreshed')
	}

	_onChangeTab = ({i, ref}) =>{
		this.setState({tab:i })
	}


	onInput = (text)=>{
		// alert(text)
		this.setState({
			text: text
		})
		/*search after user stop typing*/
		clearTimeout(this.inputDelay)
		this.inputDelay = setTimeout(()=> {
			this.getResult(text)
		}, 1500);
	}

	setPlayerList = (playerList) =>{
		this.setState({
			playerList: playerList
		})
	}

	getResult = (text) =>{
		// alert(text)
		const {playerList} = this.state

		if(text.length > 0){
			const {playerList} = this.state
			const reg = new RegExp(text, 'i') 
			const players = playerList.filter(player => {
				return reg.test(player.name)
			})

			this.setState({
				dataSource: players
			})
		}
	}



	render() {
		// alert(JSON.stringify(this.props.player));

		const {gameActions, game} = this.props
		const {tab, dataSource, text} = this.state
		let bgColor 

		let height;
		if(this.state.tab === 0){
			height = (this.gameTabHeight !== 0) ? this.gameTabHeight : 200;
			bgColor = '#3471ae'
		}

		if(this.state.tab === 1){
			height = this.gameTabHeight;
			bgColor = '#BD4C29'
		}

		if(this.state.tab === 2){
			height = this.gameTabHeight;
			bgColor = '#BD4C29'
		}
		// alert(height)
		return (
			<View style = {{flex:1}}>
				<StatusBar
                    backgroundColor="#5A9EE3"
                    barStyle="light-content"
                />
				<ScrollView
					refreshControl = {
						<RefreshControl 
							refreshing = {this.state.isRefreshing}
							onRefresh = {this._onRefresh.bind(this)}
							colors = {['#354BD4']}
							tintColor = 'white'
							title = 'loading...'
							titleColor = 'white'
							progressBackgroundColor = 'white'
						/>
					}
				>
					{
						tab === 0 && 
						<GameHeader {...game} action= {gameActions} date = {this.state.date} changeDate = {this._changeDate} />
					}

					{
						tab === 1 && 
						<PlayerHeader {...game} text={text} onInput = {this.onInput} />
					}				
					<View style={[{height}]}>
						<ScrollableTabView
							initialPage={0}
							onChangeTab = {this._onChangeTab}
							renderTabBar={() => <DefaultTabBar 
	    											textStyle={{color:'white'}} 
	    											backgroundColor ='white'
	    											underlineStyle = {{backgroundColor:'#FFFFFF'}}
													style = {{backgroundColor: bgColor}}
												/>
											}
	    				>
							<GameList 
								tabLabel = "Game" 
								{...game} 
								action= {gameActions} 
								getTabHeight= {this._getTabHeight} 
								date={this.state.date} 
								navigator= {this.props.navigator} />

							<PlayerIndex 
								tabLabel = "Player" 
								text={text}
								{...game} 
								dataSource = {dataSource}
								setPlayerList= {this.setPlayerList}
								getTabHeight= {this._getTabHeight} 
								navigator= {this.props.navigator} 
							/>
							<GameList tabLabel = "Team" {...game} action= {gameActions} />
						</ScrollableTabView>
					</View>
				</ScrollView>
			</View>
		);
	}
}


App.propTypes = {
	application: PropTypes.object.isRequired,
	game:PropTypes.object.isRequired,
	gameActions: PropTypes.object.isRequired,
	playerActions: PropTypes.object.isRequired,
	navigator: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
	// alert(JSON.stringify(state.live.details))
	return{
		application: state.application,
		standing: state.standing,
		game:{
			standing: state.standing,
			application: state.application,
			unstart: state.unstart,
			live: state.live,
			over: state.over,
		},
	}

}

function mapDispatchToProps(dispatch){
	return {
		gameActions: bindActionCreators(Object.assign({}, applicationAction, gameActions), dispatch),
		playerActions: bindActionCreators(Object.assign({}, applicationAction, playerActions), dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


