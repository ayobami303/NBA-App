import React,{Component} from 'react'
import {View, Text, StyleSheet, StatusBar} from 'react-native'


class TeamHeader extends Component{



	render() {
		return (
			<View style ={styles.header} >
				<StatusBar
                    backgroundColor="#32CC44"
                    barStyle="light-content"
                />
				<Text style={styles.conference}>{this.props.conference.toUpperCase()}</Text>
				<Text style={styles.confLabel}>conference</Text>
			</View>
		);
	}
}


export default TeamHeader;

const styles = StyleSheet.create({
	header:{
		height:110,
		backgroundColor: '#2DB43D',
		justifyContent: 'center',
		paddingHorizontal: 20
	},
	conference:{
		color: '#fff',
		fontSize: 25,
		fontWeight: '500'
	},
	confLabel:{
		color: '#fff',
		fontSize: 14,
		fontWeight:'300'
	}
})