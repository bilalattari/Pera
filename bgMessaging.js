/* eslint-disable */

import firebase from 'react-native-firebase';
// Optional flow type

export default async (message) => {
    console.log('App CLosed Not ===========>', message)
    firebase.notifications().onMessage((notification) => {
        console.log('onMessage CLoseddddd =====>', notification);   
    });

    return Promise.resolve();
}