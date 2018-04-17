import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'

import PlayerTrendBarItem from './PlayerTrendBarItem'

const barInterval = 2
const barItemTop = 16

class PlayerTrend extends Component{
	constructor(props) {
		super(props)
		this.unitHeight = 2
	}

	calculateLog = (data, indicator) => {
		const count = data.length
		let high = data[0][indicator]
		let low = data[0][indicator]
		let highDate =data[0]['gameDate']
		let lowDate =data[0]['gameDate']
		let sum = 0

		let value
		data.forEach((d, index) => {
			value = d[indicator]
			sum += value

			if(value < low){
				low = value
				lowDate = data[index]['gameDate']
			}else if(value > high){
				high = value
				highDate = data[index]['gameDate']
			}
		})

		return {
			low,
			high,
			lowDate,
			highDate,
			count,
			sum,
			avg: sum/count
		}
	} 

	renderBars = (data, high, low, color) => {
		const {unitHeight} = this

		return data.map((value, index) => {
			return (
				<PlayerTrendBarItem 
					key = {index}
					value = {value}
					high = {high}
					low = {low}
					color = {color}
					unitHeight = {unitHeight}
					date = {this.props.data[index].gameDate}
					barItemTop = {barItemTop}
					barInterval = {barInterval}
				/>
			)	
		})		
	}


	render() {
		const {data, color} = this.props
		const {unitHeight} = this
		const footData = this.calculateLog(data, 'plusMinus')

		const scrollHeight = footData.high * unitHeight + Math.abs(footData.low) * unitHeight + barItemTop
		return (
			<View style={styles.container}>
				<Text style= {styles.title} > + / -</Text>

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator = {false}
					showsVerticalScrollIndicator = {false}
					alwaysBounceVertical = {false}
					directionalLockEnabled 
					style = {[styles.scrollView, {height:scrollHeight}]}
				>	
					{						
						this.renderBars(data.map(d => d.plusMinus), footData.high, footData.low, color)
					}
				</ScrollView>
				<View style = {styles.summary}>
					<View style = {styles.sumLeft}>
						<Text style = {styles.sumAvg}>{(footData.avg).toFixed(2)}</Text>
						<Text style = {styles.sumAvgLabel}>avg</Text>
					</View>

					<View style ={styles.sumRight} >
						<View style = {styles.sumPolarItem}>
							<Text style = {styles.sumPolarLabel}>Highest:</Text>
							<Text style = {styles.sumPolarNumber}>{footData.high}</Text>
							<Text style = {styles.sumPolarLabel}>{' in ' + footData.highDate}</Text>
						</View>

						<View style = {styles.sumPolarItem}>
							<Text style = {styles.sumPolarLabel}>Lowest:</Text>
							<Text style = {styles.sumPolarNumber}>{footData.low}</Text>
							<Text style = {styles.sumPolarLabel}>{' in ' + footData.lowDate}</Text>
						</View>
					</View>
				</View>
			</View>
		);
	}
}


export default PlayerTrend;


const styles = StyleSheet.create({
	container:{
		paddingHorizontal: 10,
		paddingBottom: 30
	},
	title:{
		color: '#6b7c96',
		fontSize: 13,
		fontWeight:'600'
	},
	scrollView:{	
		position: 'relative'
	},
	summary:{
		flex:1,
		flexDirection: 'row',
		height: 40,
		marginTop: 20
	},
	sumLeft:{
		alignItems: 'flex-end',
		bottom: -4,
		flex: 1,
		flexDirection: 'row',
		position: 'relative'
	},
	sumAvg:{
		color: '#909caf',
		fontSize: 25,
		fontWeight: '200'
	},
	sumAvgLabel:{
		color: '#909caf',
		marginLeft: 2,
		position: 'relative',
		top: -3
	},
	sumRight:{
		flex: 1,
		justifyContent: 'flex-end'
	},
	sumPolarItem:{
		alignItems: 'flex-end',
		flexDirection:'row',
		justifyContent: 'flex-end',
		marginTop: 2
	},
	sumPolarNumber:{
		color: '#6b7c96',
		fontSize:15,
		marginLeft: 3,
		position: 'relative',
		top: 1.5
	},
	sumPolarLabel:{
		color: '#909caf',
		fontSize: 11,
		marginLeft: 3
	}
})