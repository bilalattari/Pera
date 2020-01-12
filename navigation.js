import React from 'react'
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation'
import LandingScreen from './screens/Landing'
import Home from './screens/Home'
import Splashscreen from './screens/Splash'
const AuthStack = createStackNavigator({
  Splashscreen: {
    screen: Splashscreen,
    navigationOptions: {
      headerTitle: 'Splashscreen'
    }
  },
   Landing: {
    screen: LandingScreen,
    navigationOptions: {
    headerTitle: 'Landing'
      }
  },
  Home: {
    screen: Home,
    navigationOptions: {
    headerTitle: 'Home'
      }
  },
  
  
} , {initialRouteName : 'Home'})

const App = createSwitchNavigator({
  Auth: {
    screen: AuthStack
  },
})

const Routes = createAppContainer(App)

export default Routes
