/* eslint-disable */

import React, {Fragment} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {SearchBar, Icon, Input} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Picker} from 'native-base';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import firebase from '../utils/firebase';
import firebaseLib from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialogue from '../Component/Dialogue';
// import DialogInput from 'react-native-dialog-input';
import InputModal from '../Component/InputModal';
import {logoutUser} from '../redux/actions/authActions';
import {changeFontFamily} from '../redux/actions/fontaction';
import {StackActions, NavigationActions} from 'react-navigation';
import Text from '../Component/Text'
import CustomButton from '../Component/Button';
import CustomHeader from '../Component/header';
import {themeColor, pinkColor} from '../Constant';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'key1',
      userName: '',
      photoUrl: '',
      country: '',
      showDialogue: false,
      inputDialogueShow: false,
      password: '',
      fontFamily : "",
      number: null
    };
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const {userObj} = this.props;
    const {userName, photoUrl, country} = userObj;
    this.setState({userName, photoUrl, country});
  }
  galleryPermissionAndroid() {
    return request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  }

  async changePicture() {
    if (Platform.OS === 'android') {
      const result = await this.galleryPermissionAndroid();
      if (result !== RESULTS.GRANTED) return;
    }
    const image = await ImagePicker.openPicker({
      mediaType: 'photo',
      width: 85,
      height: 85,
      includeBase64: true,
      cropping: true,
    });
    this.setState({photoUrl: image.path});
  }

  onValueChange =(value) =>{
    this.setState({
      fontFamily: value,
    } , ()=> this.props.changeFontFamily(this.state.fontFamily));
  }

  async updateProfile() {
    const {
      userObj: {userId},
      navigation,
    } = this.props;
    let {photoUrl, userName, country, number , fontFamily} = this.state;
    this.setState({loading: true});
    if (photoUrl && !photoUrl.includes('https')) {
      photoUrl = await firebase.uploadImage(photoUrl, userId);
    }
    const data = {
      photoUrl,
      userName,
      country,
      fontFamily,
      number
    };
    try {
      await firebase.updateDoc('Users', userId, data);
      navigation.goBack();
    } catch (e) {
      alert(e.message);
    }
    this.setState({loading: false});
  }

  // handleOk() {
  //   console.log('handleOk =====>',);
    
  //   this.setState({inputDialogueShow: true, showDialogue: false});
  // }

  handleCancel() {
    this.setState({showDialogue: false});
  }

  async startDeletingUser(password) {
    const db = firebaseLib.firestore();
    const {userObj, logoutUser, navigation} = this.props;
    const {email, userId} = userObj;
    try {
      firebase.updateDoc('Users', userId, {deleted: true});
      logoutUser();
      navigation.navigate('Auth');
    } catch (e) {
      alert(e);
    }
    this.setState({inputDialogueShow: false});
  }

  getStackReseter(routeName) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})],
    });

    return resetAction;
  }

  render() {
    const {navigation} = this.props;
    const {
      userName,
      photoUrl,
      country,
      loading,
      showDialogue,
      inputDialogueShow,
      number,
      fontFamily,
    } = this.state;
    return (
      <ScrollView
        stickyHeaderIndices={[0]}
        style={{backgroundColor: '#323643', flex: 1}}>
        <CustomHeader navigation={navigation} title={'Edit PROFILE'} />
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: '#fff'}}
        />
        <View
          style={{
            alignSelf: 'center',
            width: '100%',
            alignItems: 'center',
            paddingBottom: 25,
            borderBottomColor: '#444B60',
            borderBottomWidth: 0.5,
          }}>
          <View style={styles.imageWrapper}>
            {photoUrl ? (
              <Image source={{uri: photoUrl}} style={[styles.imageStyle]} />
            ) : (
              <Image
                source={require('../assets/avatar.png')}
                style={[styles.imageStyle]}
              />
            )}
          </View>
          <TouchableOpacity onPress={() => this.changePicture()}>
            <Text text= {'Change Profile Picture'} color = {pinkColor} font = {15} style = {{marginTop: -12}} />
          </TouchableOpacity>
        </View>
        <Input
          placeholder={'User name'}
          containerStyle={{width: '100%'}}
          inputStyle={[styles.inputStyle , {fontFamily : this.props.fontFamily}]}
          placeholderTextColor={'#bbb'}
          inputContainerStyle={styles.inputContainer}
          value={userName}
          onChangeText={userName => this.setState({userName})}
        />
        <Input
          placeholder={'Country'}
          containerStyle={{width: '100%'}}
          inputStyle={[styles.inputStyle , {fontFamily : this.props.fontFamily}]}
          placeholderTextColor={'#bbb'}
          inputContainerStyle={styles.inputContainer}
          value={country}
          onChangeText={country => this.setState({country})}
        />
        <Input
          placeholder={'Phone number with country code'}
          containerStyle={{width: '100%'}}
          inputStyle={[styles.inputStyle , {fontFamily : this.props.fontFamily}]}
          placeholderTextColor={'#bbb'}
          inputContainerStyle={styles.inputContainer}
          value={number}
          onChangeText={number => this.setState({number})}
          keyboardType='name-phone-pad'
        />
        <View style={styles.picker}>
          <Picker
            note
            mode="dropdown"
            style={{width: '50%', color: '#bbb', alignItems: 'flex-end'}}
            selectedValue={fontFamily}
            onValueChange={this.onValueChange.bind(this)}>
            <Picker.Item label="Nato Sens" value="NotoSans-Regular" />
            <Picker.Item label="OpenSans Regular" value="OpenSans-Regular" />
            <Picker.Item label="Source Sans Pro Regular" value="SourceSansPro-Regular" />
          </Picker>
        </View>
        <View
          style={{
            borderBottomColor: '#444B60',
            borderBottomWidth: 5,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopColor: '#444B60',
            borderTopWidth: 5,
          }}>
          <TouchableOpacity onPress={() => this.setState({showDialogue: true})}>
            <Text style={{color: '#A05669'}}>Delete Account</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 15}}>
          <CustomButton
            title={'Save'}
            backgroundColor={pinkColor}
            containerStyle={{width: '90%'}}
            onPress={() => this.updateProfile()}
          />
        </View>
        {showDialogue && (
          <Dialogue
            title="Delete Account"
            description="This action permanently delete the account"
            okButtonLabel="Confirm"
            dialogVisible={showDialogue}
            handleCancel={() => this.handleCancel()}
            handleOk={() => this.startDeletingUser()}
          />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    height: 85,
    width: 85,
    borderRadius: 125,
    marginHorizontal: 12,
    resizeMode: 'cover',
  },
  picker: {
    width: '94%',
    alignSelf: 'center',
    paddingHorizontal: 4,
    backgroundColor: themeColor,
    height: 60,
    alignItems: 'flex-end',

    borderBottomColor: '#444B60',
    borderBottomWidth: 0.5,
    borderRadius: 7,
  },
  imageWrapper: {
    height: 100,
    width: 100,
    borderRadius: 125,
    borderColor: pinkColor,
    marginVertical: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    borderTopColor: '#ccc',
    borderBottomColor: '#BBB',
    borderWidth: 0.5,
  },
  heading: {color: 'grey', fontSize: 14, fontWeight: 'bold', margin: 4},
  number: {color: '#fff', fontSize: 16, textAlign: 'center'},
  inputStyle: {textAlign: 'right', color: '#ccc', fontSize: 15},
  inputContainer: {
    backgroundColor: themeColor,
    height: 60,
    borderBottomColor: '#444B60',
    borderBottomWidth: 0.5,
  },
});
const mapDispatchToProps = dispatch => {
  return {
    logoutUser: userData => dispatch(logoutUser(userData)),
    changeFontFamily : fontFamily => dispatch(changeFontFamily(fontFamily)),
  };
};
const mapStateToProps = state => {
  return {
    userObj: state.auth.user,
    fontFamily : state.font.fontFamily
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
