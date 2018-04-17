import {Navigation} from 'react-native-navigation'
import {Provider} from 'react-redux'

import { registerScreens } from './screens';
import configureStore from './store/configureStore'

const store = configureStore();
registerScreens(store, Provider); // this is where you register all of your app's screens

// start the app

const navigatorStyle = {
	navBarHidden: true,
	statusBarColor: '#5A9EE3',
	statusBarTextColorScheme: 'light',	
	topBarElevationShadowEnabled: false,
	navBarHideOnScroll: true,
	tabBarHidden: false,
	drawUnderTabBar: true,
	navBarTransparent: true,
	drawUnderNavBar: true,
	navBarTranslucent: false,
	statusBarHidden: false,

};

Navigation.startSingleScreenApp({
	screen:{
		screen:'nba.App',
		navigatorStyle: navigatorStyle,
	},

})