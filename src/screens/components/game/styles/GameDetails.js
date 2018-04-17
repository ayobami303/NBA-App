import {StyleSheet, PixelRatio} from 'react-native'

const styles = StyleSheet.create({
	container:{
		backgroundColor: 'white',
		flex: 1
	},
	sumContainer:{
		flex: 5,
		flexDirection: 'row',
		paddingTop: 60,		
	},
	team:{
		flex:1,
		alignItems: 'center'
	},
	teamLogo:{
		height:75,
		width: 75
	},
	teamCity:{
		color: '#fff',
		fontSize: 11,
		marginTop : 2
	},
	teamName:{
		color:'#fff',
		fontWeight: 'bold',
		fontSize: 15,
		position: 'relative',
		top	: 0
	},
	standing:{
		marginTop: 5,
		color:'#fff'
	},
	gameInfo:{
		flex:1.5,
		alignItems: 'center',
		flexDirection: 'column'
	},
	infoProcess:{
		marginTop: 18,
		color: '#fff',
		fontSize:13,
		marginBottom: 3
	},
	processUnstart:{
		top: 9,
		fontSize: 19,
		position: 'relative'
	},
	infoScorePanel:{
		flex:1,
		flexDirection: 'row'
	},
	infoScoreBlock:{
		alignItems: 'center',
		flex: 1,
		width: 60
	},
	infoSide:{
		alignSelf: 'center',
		color: 'rgba(255, 255, 255, 0.5)',
		flex: 1,
		fontSize: 10,
		marginTop:6
	},
	infoScore:{
		color: '#fff',
		flex: 9,
		fontSize: 35,
		fontWeight: '200',
		alignSelf: 'center'
	},
	infoDivider:{
		backgroundColor: 'rgba(255,255,255, 0.3)',
		marginLeft: 15,
		marginRight: 15,
		marginTop: 7,
		width: 2/PixelRatio.get(),
		height: 55,

	},
	segment:{
		height: 35,
		flexDirection: 'row',
	},
	segPanel:{
		flex:1
	},
	segPanelActive:{
		backgroundColor: '#fff'
	},
	segPanelInactive:{
		backgroundColor: '#EBEBEB'		
	},
	segPanelInner:{
		flexDirection: 'column',
		flex:1
	},
	segTeam:{
		alignSelf:'center',
		fontSize:12,
		lineHeight: 22,
		flex: 1
	},
	segTeamActive:{
		color: '#222'
	},
	segTeamInactive:{
		color: '#7f7f7f'
	},
	indicatorView:{
		flex: 13
	}

})

export default styles