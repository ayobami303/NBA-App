import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
	container:{
		flex:13,
		position:'relative'
	},
	scrollView:{
		width: 400,
		flex:1
	},
	listView:{
		flex:1,
		flexDirection:'column',
		marginRight: 48,
		marginBottom: 30,
		width: 800
	},
	titleRow:{
		borderBottomColor: '#c2c2c2',
		borderBottomWidth: 2,
		height:30,
		borderStyle: 'solid'
	},
	playerBox:{
		alignItems: 'stretch',
		borderBottomColor: '#C2C2C2',
		borderBottomWidth: 1,
		flex:1,
		flexDirection:'row',
		height: 30
	},
	playerBoxLast:{
		borderBottomWidth: 0
	},
	//Every box(td)
	title:{
		alignSelf: 'center',
		color: '#7f7f7f',
		fontSize: 12
	},
	pName:{
		color: '#222',
		fontSize:12,
		paddingLeft: 5
	},
	dataBox:{
		alignSelf:'center',
		color:'#7f7f7f',
		fontSize: 11
	},	
	p1:{
		alignItems: 'center',
		borderRightColor:"#c2c2c2",
		borderRightWidth: 1,
		flex:1,
		flexDirection:'row'
	},
	lastP1:{
		borderRightWidth:0
	},
	p2:{
		borderRightColor:"#c2c2c2",
		borderRightWidth: 1,
		flex:2,
		flexDirection:'row'
	},
	p2Name:{
		alignItems: 'center',
		flexDirection: 'row'
	}
})


export default styles;