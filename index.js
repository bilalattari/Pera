/* eslint-disable */

/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import App from './App';
import {name as appName} from './app.json';
import bgMessaging from './bgMessaging'

// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); 
AppRegistry.registerComponent(appName, () => App);
