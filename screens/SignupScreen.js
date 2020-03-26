/* eslint-disable */

import React, { Fragment } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';
import CustomButton from '../Component/Button';
import CustomHeader from '../Component/header';
import { themeColor, pinkColor } from '../Constant/index';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header: null,
  };
  googleLogin = async () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '1030461806167-rt41rc3og2qq2i4sn22vk0psn0apbscv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo, 'userInfo')
      let data = userInfo.user
      const credential = await firebase.auth.GoogleAuthProvider.credential(userInfo.idToken)
      console.log(credential , 'firebaseUserCredential')
      // login with credential
      // const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      // console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));

      // this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ backgroundColor: '#323643', flex: 1 }}>
        <View
          style={{
            height: 100,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>
            Sign Up
          </Text>
          <Icon
            type={'font-awesome'}
            name={'angle-left'}
            color={'#fff'}
            containerStyle={{ marginTop: 8 }}
            size={25}
          />
        </View>
        {/* <CustomHeader navigation={navigation} title={'Sign Up'} /> */}

        <ScrollView></ScrollView>
        <View style={{ justifyContent: 'flex-end', marginVertical: 25 }}>
          <Text style={styles.bottomLink}>SIGN UP WIDTH</Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              marginVertical: 12,
            }}>
            <CustomButton
              onPress={() => this.props.navigation.navigate('CreateAccount')}
              containerStyle={{ width: 160 }}
              title={'Facebook'}
              backgroundColor={'#3b5998'}
            />
            <CustomButton
              onPress={this.googleLogin}
              containerStyle={{ width: 160 }}
              title={'Google'}
              backgroundColor={'#00aced'}
            />
          </View>
          <Text style={styles.bottomLink}>OR</Text>
          <CustomButton
            onPress={() => this.props.navigation.navigate('EmailAccount')}
            containerStyle={{ width: '90%' }}
            title={'Sign Up With Email'}
            backgroundColor={pinkColor}
          />
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignIn')}
          style={{ flexDirection: 'row', height: 50 }}>
          <Text style={{ color: '#ccc', paddingLeft: 25 }}>
            Already Member ?<Text style={{ color: pinkColor }}> Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    borderColor: '#323643',
    backgroundColor: '#454B61',
    borderRadius: 7,
    paddingLeft: 12,
    marginVertical: 6,
  },
  buttonStyle: {
    width: 170,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#323643',
    borderColor: '#fff',
    borderWidth: 0.5,
    marginHorizontal: 6,
  },
  bottomLink: {
    fontSize: 12,
    color: '#ccc',
    paddingLeft: 25,
    marginVertical: 12,
  },
  line: { flex: 1, height: 0.5, borderWidth: 0.3, borderColor: '#ccc' },
});
export default SignUp;
