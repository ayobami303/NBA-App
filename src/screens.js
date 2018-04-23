import {Navigation} from 'react-native-navigation'

import App from './screens/App';
import GameHeader from './screens/components/game/GameHeader';
import GameList from './screens/components/game/GameList';
import GamePanel from './screens/components/game/GamePanel';
import GameDetails from './screens/components/game/GameDetails';
import PlayerIndex from './screens/components/player/PlayerIndex';
import PlayerDetails from './screens/components/player/PlayerDetails';
import TeamList from './screens/components/team/TeamList';
import TeamDetails from './screens/components/team/TeamDetails';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  	Navigation.registerComponent('nba.App', () => App, store, Provider);
	Navigation.registerComponent('nba.GameHeader', () => GameHeader,store,Provider);
	Navigation.registerComponent('nba.GameList', () => GameList,store,Provider);
	Navigation.registerComponent('nba.GamePanel', () => GamePanel,store,Provider);
	Navigation.registerComponent('nba.GameDetails', () => GameDetails,store,Provider);
	Navigation.registerComponent('nba.PlayerIndex', () => PlayerIndex,store,Provider);
	Navigation.registerComponent('nba.PlayerDetails', () => PlayerDetails,store,Provider);
	Navigation.registerComponent('nba.TeamList', () => TeamList,store,Provider);
	Navigation.registerComponent('nba.TeamDetails', () => TeamDetails,store,Provider);
}