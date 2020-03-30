/* eslint-disable */

import React, { Fragment } from 'react';
import {
  StyleSheet, Dimensions,
  View, TouchableOpacity,
  Text, ScrollView
} from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import FirebaseLib from 'react-native-firebase'
import { connect } from 'react-redux'
import CustomHeader from '../Component/header';
import { themeColor, pinkColor } from '../Constant/index';
import firebase from '../utils/firebase'
import { loginUser } from '../redux/actions/authActions'
import Spinner from 'react-native-loading-spinner-overlay';
import CustomButton from '../Component/Button';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { Icon, Input, Button } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation';
const height = Dimensions.get('screen').height
const marginTop = height - 420 > 25 ? (height - 425) / 1.4 : 0
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      loading: false
    }
  }
  static navigationOptions = {
    header: null,
  };
  checkValidation() {
    const { email, password } = this.state
    if (!email || !password) {
      this.setState({ password: null })
      alert('All fields are required')
      return true
    }
  }

  async login() {
    const { email, password } = this.state

    if (this.checkValidation()) return
    try {
      this.setState({ loading: true })
      const res = await firebase.signInWithEmail(email, password)
      const uid = res.user.uid
      const dbResponse = await firebase.getDocument('Users', uid)
      const userData = dbResponse._data
      this.props.loginUser(userData)
      this.props.navigation.navigate('App')
    }
    catch (e) {
      alert(e.message)
    }
    this.setState({ loading: false })
  }

  async facebookLogin() {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        throw new Error('User cancelled request');
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining the users access token');
      }
      const credential = FirebaseLib.auth.FacebookAuthProvider.credential(data.accessToken);
      const firebaseUserCredential = await FirebaseLib.auth().signInWithCredential(credential);
      const fbUid = firebaseUserCredential.user.uid
      const response = await firebase.getDocument('Users', fbUid)
      let userObj = {}
      // response.exists
      if (response.exists) {
        userObj = response.data();
        this.props.loginUser(userObj)
        this.props.navigation.navigate('App')
      }
      else {
        userObj = {
          userName: firebaseUserCredential.user.displayName.toLowerCase(),
          email: firebaseUserCredential.user.email,
          photoUrl: firebaseUserCredential.user.photoURL,
          userId: fbUid,
          followers: [],
          following: [],
          userPackage: 'none',
          fontFamily : 'NotoSans-Regular',
          userType: 'free',
          deleted: false,
          createdAt: Date.now(),
          country: null
        }
        await firebase.setDocument('Users', fbUid, userObj)
        this.props.loginUser(userObj)
        this.props.navigation.navigate('BlogCategory')
      }
    }
    catch (e) {
      alert(e.message);
    }
  }

  googleLogin = async () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '1030461806167-rt41rc3og2qq2i4sn22vk0psn0apbscv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: 'blogster-20b9d.firebaseapp.com', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });

    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo, 'userInfo')
      let value = (await GoogleSignin.getTokens({ idToken: userInfo.idToken }))
      const credential = FirebaseLib.auth.GoogleAuthProvider.credential(value.idToken);
      const firebaseUserCredential = await FirebaseLib.auth().signInWithCredential(credential);
      const googleUid = firebaseUserCredential.user.uid
      console.log(googleUid)
      const response = await firebase.getDocument('Users', googleUid)
      let userObj = {}
      if (response.exists) {
        userObj = response.data();
        this.props.loginUser(userObj)
        this.props.navigation.navigate('App')
      }else{
        userObj = {
          userName: firebaseUserCredential.user.displayName.toLowerCase(),
          email: firebaseUserCredential.user.email,
          photoUrl: firebaseUserCredential.user.photoURL,
          userId: googleUid,
          followers: [],
          following: [],
          userPackage: 'none',
          userType: 'free',
          fontFamily : 'NotoSans-Regular',
          deleted: false,
          createdAt: Date.now(),
          country: null
        }
        await firebase.setDocument('Users', googleUid, userObj)
        this.props.loginUser(userObj)
        this.props.navigation.navigate('BlogCategory') 
      }
      // // console.log(credential, 'credential')
      // FirebaseLib.auth().signInWithCredential(credential).then((user) => {
      //   console.log("Sign In Success", user);
      // }).catch((err) => console.log(err))

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
    const { navigation } = this.props
    const { email, password, loading } = this.state
    return (
      <SafeAreaView style={{ backgroundColor: '#323643', flex: 1 }}>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{ color: '#fff' }}
        />
        {/* <View style={{
          height: 100, flexDirection: 'row', alignItems: 'center',
          justifyContent: 'space-between', marginHorizontal: 15,
        }}>
          <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>Login</Text>
          <Icon type={'font-awesome'} name={'angle-left'} color={'#fff'} containerStyle={{ marginTop: 8 }}
            size={25} />
        </View> */}
        <CustomHeader navigation={navigation} title={'Login'} />
        <ScrollView style={{ flex: 1, }}>
          <View style={{ width: '100%', marginTop: marginTop }}>
            <Text style={styles.bottomLink}>SIGN IN WIDTH</Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
                marginVertical: 12,
              }}>
              <CustomButton
                onPress={() => this.facebookLogin()}
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
            <Input placeholder={'Email'} placeholderTextColor={'#fff'}
              inputContainerStyle={styles.inputContainer} inputStyle={{ fontWeight: 'bold', color: '#fff' }} onChangeText={(email) => this.setState({ email: email })} value={email} />

            <Input placeholder={'Password'} secureTextEntry={true} placeholderTextColor={'#fff'}
              inputContainerStyle={styles.inputContainer} inputStyle={{ fontWeight: 'bold', color: '#fff' }} onChangeText={(password) => this.setState({ password: password })} value={password} />

            <Text style={[styles.bottomLink, { marginVertical: 12 }]}>OR</Text>
            <View style={{ marginVertical: 4, width: '100%' }}>
              <CustomButton
                onPress={() => this.login()}
                containerStyle={{ width: '90%' }}
                title={'LOGIN'}
                buttonStyle={{ height: 42 }}
                backgroundColor={pinkColor}
              />
            </View>
            <View style={{ width: '100%' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("CreateAccount")} style={{ height: 30, justifyContent: "center" }}>
                <Text style={styles.bottomLink}>Need An Account ?<Text style={{ color: '#FD7496' }}>  Sign Up</Text></Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("ForgotPassword")} style={{ height: 30, justifyContent: "center" }}>
                <Text style={[styles.bottomLink, { marginVertical: 12 }]}>Forget Your Password ?<Text style={{ color: '#FD7496' }}>  Retrive</Text></Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    borderColor: '#323643', backgroundColor: '#454B61', borderRadius: 7,
    paddingLeft: 14, marginVertical: 6, marginHorizontal: 8
  },
  buttonStyle: {
    width: 140, height: 45, borderRadius: 25,
    backgroundColor: '#000000', borderColor: "#000000", borderWidth: 0.5, marginHorizontal: 6
  },
  bottomLink: { fontSize: 14, fontWeight: "bold", color: "#ccc", textAlign: "left", width: '90%', marginLeft: 12 },
  line: { flex: 1, height: 0.5, borderWidth: 0.3, borderColor: "#ccc" }
})
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userData) => dispatch(loginUser(userData))
  }
}
const mapStateToProps = (state) => {
  return {
    userObj: state.auth.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
