import {AsyncStorage} from 'react-native'

const userDefault = {
	set: (key, value) =>{
		const jsonValue = JSON.stringify(value)
		return AsyncStorage.setItem(key, jsonValue)
	},
	get: (key) =>{
		return AsyncStorage.getItem(key)
		.then(data => {
			if(data) return JSON.parse(data)			
			return null
		})
	}
}

export default userDefault;