/* eslint-disable */

import React, { Fragment } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  ScrollView,
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import CustomInput from '../Component/Input';
import ControlPanel from '../screens/ControlPanel';
import CustomButton from '../Component/Button';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import CustomHeader from '../Component/header';
import Drawer from 'react-native-drawer';
import firebase from '../utils/firebase';
import { themeColor, pinkColor } from '../Constant';


class BlogCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 0,
      categoryList: [
        { name: "Photography", image: require('../assets/interest/photography.jpg'), selected: false },
        { name: "Food", image: require('../assets/interest/food.jpg'), selected: false },
        { name: "Health", image: require('../assets/interest/health.png'), selected: false },
        { name: "Lifestyle", image: require('../assets/interest/lifestyle.jpg'), selected: false },
        { name: "Politics", image: require('../assets/interest/politics.jpg'), selected: false },
        { name: "Sports", image: require('../assets/interest/sports.jpg'), selected: false },
        { name: "Travel", image: require('../assets/interest/music.jpg'), selected: false },
        { name: "Music", image: require('../assets/interest/photography.jpg'), selected: false },
        { name: "Business", image: require('../assets/interest/business.jpg'), selected: false },
      ],
      loading: false
    };
  }
  static navigationOptions = {
    header: null,
  };
  getRandomInt = () => {
    return Math.floor(Math.random() * Math.floor(4));
  };

  async selectBlogCategory(category, index) {
    let list = this.state.categoryList
    list[index].selected = !list[index].selected
    try {
      this.setState({ categoryList: list });

    } catch (e) {
      console.log(e.message);
    }
    this.setState({ laoding: false });
  }
  addBlogCategory = async () => {
    const {
      userObj: { userId },
      navigation,
    } = this.props;
    let { categoryList } = this.state
    let categories = []
    await categoryList.map((data, index) => {
      if (data.selected) {
        categories.push(data.name.toLowerCase())
      }
    })
    console.log(categories, 'categories')
    await firebase.updateDoc('Users', userId, { blogCategory: categories });
    navigation.navigate('App');
  }
  render() {
    const color = ['#f78da7', '#abb8c3', '#00d084', '#03a9f4', '#ff5722   '];
    const { navigation } = this.props;
    let { category, categoryList, loading } = this.state;
    return (
      <ScrollView style={{ backgroundColor: '#323643', flex: 1 }}>
        <CustomHeader navigation={navigation} title={'BLOG CATEGORY'} />
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{ color: '#fff' }}
        />
        <View style={{ marginHorizontal: 15, padding: 4 }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: "center",
              marginVertical: 4,
              marginHorizontal: '20%'
            }}>
            Select Your Interest
          </Text>
          <Text style={{ color: '#ccc', fontSize: 16, textAlign: "center" }}>
            Please select the category Please select the category Please select
            the category{' '}
          </Text>
        </View>
        <View style={{
          flexDirection: "row", flexWrap: "wrap", flex: 1, alignItems: "center",
          justifyContent: "space-around", margin: 15
        }}>
          {
            categoryList.map((data, index) => {
              return (
                <TouchableOpacity key={index}
                  onPress={() => this.selectBlogCategory(data, index)}
                  style={{
                    justifyContent: "center", alignItems: "center",
                    paddingVertical: 12,
                  }}>
                  <Image source={data.image} style={{
                    height: 103, width: 103,
                    borderRadius: 125, borderColor: data.selected ? pinkColor : "#fff", borderWidth: 2
                  }} />
                  <Text style={{ color: "#fff", paddingTop: 6, fontWeight: '700' }}>{data.name}</Text>
                </TouchableOpacity>
              )
            }
            )
          }
        </View>
        <CustomButton
          backgroundColor={pinkColor}
          onPress={this.addBlogCategory}
          title={'Next'} />
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
