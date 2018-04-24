import React, {Component} from 'react'
import {View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native'


class TeamDetailPlayer extends Component {
// `http://stats.nba.com/media/players/230x185/${player.id}.png`

	render() {
		return (
			<TouchableHighlight 
				underlayColor = 'transparent'
			>
				<View style = {styles.container} >

					<View style = {styles.portrait} >
						<View style = {styles.portraitBackground}>
							<Image source={{uri: 'http://via.placeholder.com/50x50'}} 
							style = {[styles.portraitImage]} />
						</View>
					</View>

					<View style = {styles.info}>
						<Text style = {styles.infoName} >asddd</Text>
						<Text style = {styles.infoPosition} >asde</Text>
					</View>

					<View style ={styles.data}>
						<View style = {styles.dataPerson}>
							<Text style = {styles.dataPersonItem} >Age: </Text>
							<Text style = {styles.dataPersonItem} >Height: </Text>
							<Text style = {styles.dataPersonItem} >Weight: </Text>
						</View>
						<View style = {styles.dataGame} >
							<View style = {styles.dataGameItem} >
								<Text style = {styles.dataGameItemData} >2</Text>
								<Text style = {styles.dataGameItemLabel} >PTS</Text>
							</View>
							<View style = {styles.dataGameItem} >
								<Text style = {styles.dataGameItemData} >2</Text>
								<Text style = {styles.dataGameItemLabel} >REB</Text>
							</View>
							<View style = {styles.dataGameItem} >
								<Text style = {styles.dataGameItemData} >2</Text>
								<Text style = {styles.dataGameItemLabel} >AST</Text>
							</View>
							<View style = {styles.dataGameItem} >
								<Text style = {styles.dataGameItemData} >2</Text>
								<Text style = {styles.dataGameItemLabel} >MIN</Text>
							</View>
							<View style = {styles.dataGameItem} >
								<Text style = {styles.dataGameItemData} >2</Text>
								<Text style = {styles.dataGameItemLabel} >GP</Text>
							</View>
						</View>
					</View>					


				</View>
			</TouchableHighlight>
		);
	}
}


export default TeamDetailPlayer;


const styles = StyleSheet.create({
	container:{

	}
})