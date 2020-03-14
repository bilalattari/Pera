/* eslint-disable */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Linking,
} from 'react-native';
import Routes from './navigation';
import {themeColor} from './Constant/index';
import {store, persistor} from './redux/store';
import { withNavigation } from 'react-navigation'
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import firebase from 'react-native-firebase'
import { NotificationOpen } from 'react-native-firebase';
import SplashScreen from 'react-native-splash-screen';

// import DeepLinking from 'react-native-deep-linking';

class App extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  async componentDidMount() {

    setTimeout(() => {
      SplashScreen.hide();
    }, 1000)
    
  //   firebase.notifications().onNotification((notification) => {
  //     console.log('notification =====>', notification);
      
  // });
  // firebase.notifications().onNotificationOpened((notificationOpen) => {
    // Get the action triggered by the notification being opened
    // const action = notificationOpen.action;
    // console.log('notificationOpen=======>', notificationOpen);
    // navigation.navigate('Messages')
    
    // Get information about the notification that was opened
    // const notification: Notification = notificationOpen.notification;
// });
//     const notification = await firebase.notifications().getInitialNotification();
    // if(notification){
    //   navigation.navigate('Messages')
    // }

  //   firebase.messaging().onMessage((message) => {
  //     console.log('message ===================>', message);
      
  // });

    console.log('componentDidMount');
    console.log('PRops =========>', this.props);
    // DeepLinking.addScheme('example://');
    // Linking.addEventListener('url', this.handleUrl);
    // DeepLinking.addRoute('/Blog', (response) => {
    // example://test
    //   console.log('response', response)
    //   this.setState({ response });
    // });
  }
  // componentWillUnmount() {
  //   Linking.removeEventListener('url', this.handleUrl);
  // }

  // handleUrl = ({ url }) => {
  //   console.log('URL', url);

  //   Linking.canOpenURL(url).then((supported) => {
  //     console.log('supported', supported);

  //     if (supported) {
  //       // this.props.navigation.navigate(ur)
  //       DeepLinking.evaluateUrl(url);
  //     }
  //   });
  // };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
