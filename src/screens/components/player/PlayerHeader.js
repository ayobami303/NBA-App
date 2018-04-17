import React, {Component} from 'react'
import {Text, View, TextInput, StatusBar, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

class PlayerHeader extends Component{

	constructor(props){
		super(props)		
	}

	render() {
		const {text, onInput} = this.props
		return (
			<View style ={styles.header} >
				<StatusBar
                    backgroundColor="#F57F5A"
                    barStyle="light-content"
                />
				<View style ={styles.headerInner} >
					<TextInput
					style = {styles.textInput}
					onChangeText = {onInput}
					keyboardType = {'default'}
					textAlignVertical = {'center'}
					autoCorrect = {false}
					underlineColorAndroid = "transparent"
					placeholder = {'Find Player'}
					value = {text}
					/>
					<View style = {styles.searchIconView} >
						<Icon name = 'ios-search' color = '#fff' size = {16} style = {styles.searchIcon} />
					</View>
				</View>
			</View>

		);
	}
}

export default PlayerHeader;


const styles = StyleSheet.create({
	header:{
		alignItems: 'center',
		backgroundColor: '#E66840',
		flexDirection: 'row',
		height: 110
	},
	headerInner:{
		flex:1,
		justifyContent: 'center',
		flexDirection:'row'
	},
	textInput:{
		backgroundColor:'#BD4C29',
		borderRadius: 5,
		color: '#fff',
		fontSize: 14,
		height: 40,
		paddingHorizontal:5,
		width:260
	},
	searchIconView:{
		backgroundColor: '#BD4C29',
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
		height: 40,
		left: -5,
		position: 'relative',
		width: 40
	},
	searchIcon:{
		width:16,
		height:16,
		left:20,
		marginLeft: -8,
		marginTop: -8,
		position:'absolute',
		top:20
	}
})