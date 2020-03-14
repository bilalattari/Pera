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
import ControlPanel from '../screens/ControlPanel';
import CustomButton from '../Component/Button';
import {NavigationEvents} from 'react-navigation';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import CustomHeader from '../Component/header';
import Drawer from 'react-native-drawer';
import firebase from '../utils/firebase';

import {themeColor, pinkColor} from '../Constant';
class BlogCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 0,
      categoryList: ['Photography', 'Technology', 'Design'],
      loading: false
    };
  }
  static navigationOptions = {
    header: null,
  };
  getRandomInt = () => {
    return Math.floor(Math.random() * Math.floor(4));
  };

  async selectBlogCategory(category) {
    const {
      userObj: {userId},
      navigation,
    } = this.props;
    
    try {
      this.setState({laoding: true});
      await firebase.updateDoc('Users', userId, {blogCategory: category.toLowerCase()});
      navigation.navigate('App');
    } catch (e) {
      alert(e.message);
    }
    this.setState({laoding: false});
  }

  render() {
    const color = ['#f78da7', '#abb8c3', '#00d084', '#03a9f4', '#ff5722   '];
    const {navigation} = this.props;
    let {category, categoryList, loading} = this.state;
    return (
      <ScrollView style={{backgroundColor: '#323643', flex: 1}}>
        <CustomHeader navigation={navigation} title={'BLOG CATEGORY'} />
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: '#fff'}}
        />
        <View style={{height: 60, marginHorizontal: 15, padding: 4}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 21,
              fontWeight: 'bold',
              marginVertical: 4,
            }}>
            Select Your Interest
          </Text>
          <Text style={{color: '#ccc', fontSize: 16}}>
            Please select the category Please select the category Please select
            the category{' '}
          </Text>
        </View>
        <View
          style={{
            marginTop: 41,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {categoryList.map((data, index) => (
            <TouchableOpacity
              style={{
                height: 150,
                margin: 6,
                width: '45%',
                borderColor: '#ccc',
                borderWidth: 0.5,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  index !== 0 ? color[this.getRandomInt()] : themeColor,
              }}
              onPress={() => this.selectBlogCategory(data)}>
              <Text style={{color: '#fff', fontSize: 15}}>{data}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapDispatchToProps = dispatch => {
  return {};
};
const mapStateToProps = state => {
  return {
    userObj: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogCategory);
