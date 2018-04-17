import {StyleSheet, PixelRatio} from 'react-native'

const styles = StyleSheet.create({
	container:{
		flex:1,
		borderRadius: 5,
		flexDirection: 'row',
		height: 105,
		marginHorizontal:12,
		marginBottom: 10
	},
	team:{
		alignItems: 'center',
		flex:1.5,
		borderRadius:5
	},
	teamLogo:{
		width:50,
		height:50,
		marginTop:10
	},
	teamCity:{
		marginTop:2,
		color: '#fff',
		fontSize: 11
	},
	teamName:{
		marginTop:1,
		color: '#fff',
		fontSize: 15,
		top:0,
		position: 'relative',
		fontWeight:'bold'
	},
	gameInfo:{
		flexDirection: 'column',
		flex: 1.5,
		alignItems:'center'
	},
	processUnstart:{
		fontSize:22,
		position:'relative',
		top:13
	},
	infoProcess:{
		color: '#fff',
		marginTop: 22,
		marginBottom: 3,
		fontSize:10
	},
	infoScorePanel:{
		justifyContent:'center',
		flexDirection: 'row',
		flex:1
	},
	infoScore:{
		color:'#fff',
		fontWeight: '100',
		width: 50,
		fontSize:25,
		textAlign: 'center'
	},
	infoDivider:{
		backgroundColor: 'rgba(255,255,255,0.3)',
		height: 25,
		marginTop: 7,
		marginHorizontal: 10,
		width: 2/ PixelRatio.get()
	}
})

export default styles;