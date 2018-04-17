import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
	container:{
		flex:1
	},
	header:{
		height: 110,
		backgroundColor: '#4d98e4',
		flexDirection: 'column',
		position: 'relative',
		paddingLeft: 15
	},
	calendarIcon:{
		height:20,
		width:25,
		alignSelf: 'flex-end',
		marginRight: 15,
		marginTop: 12
	},
	gameDate:{
		fontSize: 25,
		fontWeight: '200',
		color: '#fff'
	},
	gameCount:{
		fontSize: 14,
		fontWeight: '200',
		color: '#fff'
	},
	listView:{
		backgroundColor: '#fff',
		flex:6,
		flexDirection: 'column',
		paddingTop: 12
	}
})

export default styles;