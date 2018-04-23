import React, {Component} from 'react'
import {View, Text, Dimensions, StyleSheet, ScrollView} from 'react-native'
import PropTypes from 'prop-types'


class CollectionView extends Component{

	constructor(props){
		super(props)
		this.screenWidth = Dimensions.get('window').width
		this.screenHeight = Dimensions.get('window').height - 40
	}

	onMomentumScrollEnd(e){
		this.props.scrollEnd && this.props.scrollEnd(e.nativeEvent.contentOffset.x, e.nativeEvent.contentOffset.y)
	}

	render() {
		return (
			<ScrollView 
				horizontal
				scrollEnabled
				pagingEnabled
				scrollEventThrottle = {16}
				showsHorizontalScrollIndicator = {false}
				showsVerticalScrollIndicator = {false}
				directionalLockEnabled
				alwaysBounce = {false}
				alwaysBounceVertical = {false}
				style = {styles.container}
				onMomentumScrollEnd = {this.onMomentumScrollEnd.bind(this)}
			>
				{this.props.children.map((child, index) =>{
					return(
						<View
							key = {"collection" + index}
							style = {{width:this.screenWidth}}
						>{child}</View>
					)
				})}
			</ScrollView>
		);
	}
}


export default CollectionView;

const styles = StyleSheet.create({
	container:{
		flexDirection: 'row'
	}
})


CollectionView.propTypes = {
	scrollEnd: PropTypes.func,
	children: PropTypes.array
}