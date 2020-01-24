import React from 'react'
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation'
import LandingScreen from './screens/Landing'
import Home from './screens/Home'
import Splashscreen from './screens/Splash'
import AddClient from './screens/AddClient'
import Measurment from './screens/Measurment'
import ClienDetail from './screens/ClientDetail'
import EditClient from './screens/EditClient'
const WelcomeStack = createStackNavigator({
  Splashscreen: {
    screen: Splashscreen,
    navigationOptions: {
      headerTitle: 'Splashscreen'
    }
  },


} , {initialRouteName : 'Splashscreen'})

const HomeStack = createStackNavigator({
  EditClient: {
    screen: EditClient,
    navigationOptions: {
      headerTitle: 'EditClient'
    }
  },
  Measurment: {
    screen: Measurment,
    navigationOptions: {
      headerTitle: 'Measurment'
    }
  },
  ClienDetail: {
    screen: ClienDetail,
    navigationOptions: {
      headerTitle: 'ClienDetail'
    }
  },
  AddClient: {
    screen: AddClient,
    navigationOptions: {
      headerTitle: 'AddClient'
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
  Welcome: {
    screen: WelcomeStack
  },
  Home : {
    screen: HomeStack
  }
})

const Routes = createAppContainer(App)

export default Routes
