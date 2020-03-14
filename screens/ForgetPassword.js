/* eslint-disable */

import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import CustomInput from '../Component/Input';
import CustomButton from '../Component/Button';
import CustomHeader from '../Component/header';
import {withNavigation} from 'react-navigation';
import Logo from '../Component/LogoImage';
import Modal from 'react-native-modal';
import {themeColor, pinkColor} from '../Constant/index';
import Slogan from '../Component/Slogan';
import firebaseLib from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';


export default class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false,
      email: '',
      loading: false
    };
  }

  async changePassword() {
    const {email} = this.state;
    if (!email) return alert('Input email');
    try {
      this.setState({ loading: true })
      await firebaseLib.auth().sendPasswordResetEmail(email);
      this.setState({showModel: true});
    } catch (e) {
      console.log(e.message);
    }
    this.setState({ loading: false })
  }

  static navigationOptions = {
    header: null,
  };
  render() {
    let {showModel, loading} = this.state;
    return (
      <View style={styles.container}>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: '#fff'}}
        />

        <CustomHeader
          navigation={this.props.navigation}
          title={'FORGET PASSWORD'}
        />

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          {showModel ? (
            <Modal
              isVisible={true}
              onBackButtonPress={() => this.setState({showModel: false})}>
              <View
                style={{
                  height: 300,
                  width: '90%',
                  alignSelf: 'center',
                  justifyContent: 'space-around',
                  borderRadius: 5,
                  backgroundColor: '#444544',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingHorizontal: 25,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Please check your email address to reset your password
                </Text>
              </View>
            </Modal>
          ) : null}
          <CustomInput
            placeholder={'Email'}
            placeholderTextColor={'#fff'}
            inputStyle={{fontWeight: 'bold', color:'#fff'}}
            onChangeText={email => this.setState({email})}
          />
          <View style={{marginVertical: 12}}>
            <CustomButton
              onPress={() => this.changePassword()}
              title={'Send'}
              containerStyle={{width: '90%'}}
              backgroundColor={pinkColor}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor,
  },
  labelStyle: {color: themeColor, fontSize: 14, paddingVertical: 2},
});
