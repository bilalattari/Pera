/* eslint-disable */

import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Image} from 'react-native';
import {Icon, Input, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import CustomButton from '../Component/Button';
import {themeColor, pinkColor} from '../Constant';
import firebase from '../utils/firebase';

class AddProduct extends Component {
  state = {
    path: '',
    productName: '',
    discription: '',
    price: '',
    shipFrom: '',
    deliverInfo: '',
    retrunPolicy: '',
    loading: false,
  };
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const { userObj: { userType }, navigation } = this.props
    if(userType === 'free'){
      alert('You have to buy subscription for selling products')
      navigation.goBack()
    }
  }
  
  galleryPermissionAndroid() {
    return request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  }
  async uploadMedia() {
    if (Platform.OS === 'android') {
      const result = await this.galleryPermissionAndroid();
      if (result !== RESULTS.GRANTED) return;
    }
    const image = await ImagePicker.openPicker({
      mediaType: 'photo',
      width: 235,
      height: 235,
      includeBase64: true,
      cropping: true,
    });
    this.setState({path: image.path, videoPath: ''});
  }
  validateFields = () => {
    const {
      path,
      productName,
      discription,
      price,
      shipFrom,
      deliverInfo,
      retrunPolicy,
    } = this.state;
    if (
      !path ||
      !productName ||
      !discription ||
      !price ||
      !shipFrom ||
      !deliverInfo ||
      !retrunPolicy
    ) {
      alert('All Fileds are Required');
      return true;
    }
  };
  async addProduct() {
    const {
      path,
      productName,
      discription,
      price,
      shipFrom,
      deliverInfo,
      retrunPolicy,
    } = this.state;
    const {userObj} = this.props;

    if (this.validateFields()) return;
    try {
      this.setState({loading: true});
      const objToSend = {
        productName,
        discription,
        price: parseInt(price),
        shipFrom,
        deliverInfo,
        retrunPolicy,
        userId: userObj.userId,
        createdAt: Date.now(),
        email: userObj.email,
        deleted: false,
      };
      const imageUrl = await firebase.uploadImage(path, userObj.userId);
      objToSend.imageUrl = imageUrl;
      await firebase.addDocument('Products', objToSend);
      alert('Posted');
      // this.setState({ productName: '', discription: '', price: '', shipFrom: '', deliverInfo: '', retrunPolicy: '', path: '' })
    } catch (e) {
      alert(e.message);
    }
    this.setState({loading: false});
  }

  render() {
    const {
      path,
      productName,
      discription,
      price,
      shipFrom,
      deliverInfo,
      retrunPolicy,
      loading,
    } = this.state;
    const { navigation } = this.props
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: '#fff'}}
        />

        <View
          style={{
            height: 100,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 12,
            }}>
            Add Product
          </Text>
          <Icon
            type={'font-awesome'}
            name={'angle-left'}
            color={'#fff'}
            containerStyle={{marginTop: 8}}
            size={25}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 12,
            marginVertical: 12,
          }}>
          <CustomButton
            title={'Close'}
            buttonStyle={{borderColor: '#ccc', borderWidth: 1}}
            onPress={() => navigation.goBack()}
          />
          <CustomButton
            title={'Post Product'}
            backgroundColor={pinkColor}
            onPress={() => this.addProduct()}
          />
        </View>
        <>
          <Input
            placeholder={'Product Name'}
            value={productName}
            placeholderTextColor={'#fff'}
            inputContainerStyle={{height: 80}}
            inputStyle={{
              color: '#fff',
              letterSpacing: 2,
            }}
            onChangeText={text => this.setState({productName: text})}
          />
          <Input
            placeholder={'Price'}
            value={price}
            placeholderTextColor={'#fff'}
            inputContainerStyle={{height: 80}}
            inputStyle={{
              color: '#fff',
              letterSpacing: 2,
            }}
            onChangeText={text => this.setState({price: text})}
          />
          <Input
            placeholder={'Ship From'}
            value={shipFrom}
            placeholderTextColor={'#fff'}
            inputContainerStyle={{height: 80}}
            inputStyle={{
              color: '#fff',
              letterSpacing: 2,
            }}
            onChangeText={text => this.setState({shipFrom: text})}
          />
          <Input
            placeholder={'Deliver Info'}
            value={deliverInfo}
            placeholderTextColor={'#fff'}
            inputContainerStyle={{height: 80}}
            inputStyle={{
              color: '#fff',
              letterSpacing: 2,
            }}
            onChangeText={text => this.setState({deliverInfo: text})}
          />
          <Input
            value={retrunPolicy}
            multiline={true}
            numberOfLines={5}
            onChangeText={text => this.setState({retrunPolicy: text})}
            placeholder={'Retrun policy'}
            placeholderTextColor={'#fff'}
            inputStyle={{color: '#fff', letterSpacing: 2}}
          />
          <Input
            value={discription}
            multiline={true}
            numberOfLines={10}
            onChangeText={text => this.setState({discription: text})}
            placeholder={'Discription'}
            placeholderTextColor={'#fff'}
            inputStyle={{color: '#fff', letterSpacing: 2}}
          />
        </>
        {!!path && (
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Image source={{uri: path}} style={{width: 180, height: 180}} />
          </View>
        )}
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <CustomButton
            title={'Upload Picture'}
            buttonStyle={{
              borderColor: '#ccc',
              borderWidth: 1,
              marginVertical: 10,
            }}
            onPress={() => this.uploadMedia()}
          />
        </View>
      </ScrollView>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {};
};
const mapStateToProps = state => {
  return {
    userObj: state.auth.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor,
  },
});
