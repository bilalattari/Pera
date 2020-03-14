/* eslint-disable */

import React, {Fragment} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  ScrollView,
} from 'react-native';
import {SearchBar, Icon} from 'react-native-elements';
import CustomInput from '../Component/Input';
import CustomButton from '../Component/Button';
import CustomHeader from '../Component/header';
import {SwipeListView} from 'react-native-swipe-list-view';

import {themeColor, pinkColor} from '../Constant';
class AddPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      follow: false,
    };
  }
  static navigationOptions = {
    header: null,
  };
  _icon = (name, color) => (
    <TouchableOpacity>
      <Icon
        type={'font-awesome'}
        name={name}
        color={color}
        containerStyle={{marginHorizontal: 12}}
      />
    </TouchableOpacity>
  );
  render() {
    const {navigation} = this.props;
    return (
      <View
        stickyHeaderIndices={[0]}
        style={{backgroundColor: '#323643', flex: 1}}>
        <CustomHeader title={'ADD PHOTO'} home={true} navigation={navigation} />

        <View
          style={{
            flex: 2,
            backgroundColor: '#fff',
            marginHorizontal: 12,
            borderRadius: 5,
            marginVertical: 5,
          }}></View>
        <View style={{flex: 1, marginHorizontal: 12}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingVertical: 6,
            }}>
            {this._icon('th-large', '#fff')}
            {this._icon('bolt', '#fff')}
            {this._icon('moon-o', '#fff')}
            {this._icon('camera', '#fff')}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 5,
                backgroundColor: '#fff',
              }}
            />
            <View
              style={{
                height: 70,
                width: 70,
                borderRadius: 125,
                borderColor: pinkColor,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 125,
                  backgroundColor: pinkColor,
                }}></TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Icon type={'feather'} name={'refresh-ccw'} color={'grey'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default AddPhoto;
