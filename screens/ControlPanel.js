/* eslint-disable */

import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import CustomInput from '../Component/Input';
import CustomButton from '../Component/Button';
import CustomHeader from '../Component/header';
import {Picker} from 'native-base';
import {withNavigation} from 'react-navigation';
import {pinkColor} from '../Constant';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions/authActions';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
let Height = Dimensions.get('screen').height
class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
    header: null,
  };
  async logout() {
    LoginManager.logOut();
    this.props.logoutUser();
    this.props.navigation.navigate('Auth');
    const data = await AccessToken.getCurrentAccessToken();
  }

  menuButtons = (name, route, link) => (
    <TouchableOpacity
      style={{
        borderBottomColor: '#bbb',
        borderBottomWidth: 0.5,
        padding: Height/60,
        margin : 2,
        justifyContent: 'center',
      }}
      onPress={() => this.props.navigation.navigate(route, {link})}>
      <Text style={{color: '#fff', fontWeight: 'bold', paddingLeft: 12}}>
        {name}
      </Text>
    </TouchableOpacity>
  );
  render() {
    const state = this.state;
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#FF6B98', '#FE787E', '#FE8663']}
        style={{flex: 1, justifyContent: 'center'}}
        >
        <View  style = {{flex : 1, justifyContent : "center" ,}}>
          {/* <Image source = {require('../assets/logo.jpeg')}
             style = {{height : 300 , width : 300 , resizeMode : "contain"}} /> */}
          {this.menuButtons('Profile', 'Profile')}
          {/* {this.menuButtons('BLOG', 'Blog', true)} */}
          {this.menuButtons('Messages', 'Messages')}
          {/* {this.menuButtons('MY ADDRESSES' , 'MyAddress')} */}
          {/* {this.menuButtons('ADD PHOTO' , 'AddPhoto')} */}
          {this.menuButtons('Post Blog', 'PostBlog')}
          {this.menuButtons('My Orders', 'MyOrders')}
          {this.menuButtons('Shop', 'Shop')}
          {this.menuButtons('Search', 'SearchUsers')}
          {this.menuButtons('Add Product', 'AddProduct')}
          {this.menuButtons('Select Blog', 'SelectBlog')}
          {/* {this.menuButtons('Privacy', 'Privacy')} */}
          {this.menuButtons('Subscription', 'Payment')}
          {/* {this.menuButtons('Support' , 'Support')} */}
          <TouchableOpacity
            style={{
              borderBottomColor: '#bbb',
              borderBottomWidth: 0.5,
              padding: 12,
              margin : 2,
              justifyContent: 'center',
            }}
            onPress={() => this.logout()}>
            <Text style={{color: '#fff', fontWeight: 'bold', paddingLeft: 12}}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pinkColor,
  },
  amountInput: {
    width: '92%',
    borderColor: '#D8D8D8',
    borderRadius: 5,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginLeft: 17,
    paddingLeft: 6,
  },
  pickerHeading: {paddingLeft: '6%', fontWeight: '700', marginTop: 6},
});
const mapDispatchToProps = dispatch => {
  return {
    logoutUser: userData => dispatch(logoutUser(userData)),
  };
};
const mapStateToProps = state => {
  return {
    userObj: state.auth.user,
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(ControlPanel),
);
