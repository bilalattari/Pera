/* eslint-disable */

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import firebaseLib from 'react-native-firebase';
import CustomHeader from '../Component/header';
import CustomButton from '../Component/Button';
import firebase from '../utils/firebase';
import { themeColor, pinkColor } from '../Constant';

class SearchUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      loading: false,
      user: '',
    };
    this.allUsers = []
  }
  static navigationOptions = {
    header: null,
  };


  search = async () => {
    let { user, users } = this.state;
    if (!user) return alert('Field is required');
    users = [];
    const db = firebaseLib.firestore();
    try {
      this.setState({ loading: true });
      const userData = await db
        .collection('Users')
        .where('userName', '==', user.toLowerCase())
        .get();

      userData.docs.forEach(item => {
        if (!item.data().deleted) {
          users.push(item.data())
        }
      });
      if (!users.length) {
        alert('No User Found')
        this.setState({ users: this.allUsers })
      }
      this.setState({ users });
    } catch (e) {
      alert(e.message);
    }
    this.setState({ loading: false });
  };

  getAllUsers = async () => {
    var users = [];
    const db = firebaseLib.firestore();
    try {
      const userData = await db.collection('Users').orderBy('email').limit(15).get();
      userData.docs.forEach(item => {
        if (!item.data().deleted) {
          users.unshift(item.data())
        }
      });
      this.allUsers = users
      this.setState({ users });
    }
    catch (err) {
      console.log(err)
    }
  }
  startChat(otherUserId) {
    this.props.navigation.navigate('Chat', { otherUserId });
  }

  feedBackListItem = (item, index) => {
    const { navigation } = this.props;

    return (
      this.props.userObj.userId !== item.userId && (
        <TouchableOpacity 
        onPress={() => navigation.navigate('Profile', { otherUser: item })}
        style={styles.itemContainer}>
          <View>
            {item.photoUrl ? (
              <Image
                source={{ uri: item.photoUrl }}
                style={styles.imageStyle}
              />
            ) : (
                <Image
                  source={require('../assets/avatar.png')}
                  style={styles.imageStyle}
                />
              )}
            <Icon
              type={'font-awesome'}
              name={index % 2 !== 1 ? 'heart-o' : 'user-plus'}
              color={'#fff'}
              size={10}
              containerStyle={[
                styles.iconContainer,
                {
                  backgroundColor: index % 2 !== 1 ? pinkColor : '#72CEBA',
                },
              ]}
            />
          </View>
          <View style={{
            flex: 1, justifyContent: 'space-between', paddingRight: 25
            , alignItems: "center", flexDirection: "row"
          }}>
            <View  style={styles.userContainer}>
              <Text style={styles.userName}>{item.userName}</Text>
            </View>
            <TouchableOpacity
              style={styles.chatBtnContainer}
              onPress={() => this.startChat(`${item.userId}`)}>
              <Text style={styles.chatBtn}>Chat</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )
    );
  };

  componentDidMount() {
    this.getAllUsers()
  }
  render() {
    const { navigation, userObj } = this.props;
    const { users, loading, user } = this.state;
    return (
      <ScrollView
        stickyHeaderIndices={[0]}
        style={{ backgroundColor: '#323643', flex: 1 }}>
        <CustomHeader title={'Search'} navigation={navigation} />
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{ color: '#fff' }}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 4 }}>
            <SearchBar
              containerStyle={{
                margin: 8,
                borderRadius: 5,
                borderTopColor: themeColor,
                borderBottomColor: themeColor,
              }}
              value={user}
              placeholder={'Search'}
              inputContainerStyle={{ backgroundColor: '#fff' }}
              onChangeText={user => this.setState({ user: user }, () => {
                if (this.state.user.length === 0) {
                  this.setState({users : this.allUsers})
                }
              })}
              onEndEditing={() => {
                if (this.state.user.length > 2) {
                  this.search()
                }
              }}

            />
          </View>
          {
            user !== '' ?
              <View
                onPress={this.search}
                style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                <TouchableOpacity style={{
                  height: 50, width: 50, justifyContent: 'center',
                  alignItems: "center", backgroundColor: pinkColor, borderRadius: 4
                }}>
                  <Icon type={'font-awesome'} name={'search'} color={'#fff'} />
                </TouchableOpacity>
              </View> : null
          }
        </View>
        {!!users.length && (
          <FlatList
            data={users}
            keyExtractor={item => item}
            renderItem={({ item, index }) => this.feedBackListItem(item, index)}
          />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
  imageStyle: {
    height: 45,
    width: 45,
    borderRadius: 125,
    marginLeft: 12,
    resizeMode: 'contain',
  },
  itemContainer: {
    minHeight: 80,
    backgroundColor: '#444B60',
    flexDirection: 'row',
    marginHorizontal: 12,
    borderRadius: 12,
    marginVertical: 4,
    alignItems: 'center',
  },
  iconContainer: {
    height: 18,
    width: 18,
    backgroundColor: pinkColor,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -12,
    marginLeft: 8,
  },
  commentButton: { borderColor: pinkColor, borderWidth: 1, width: 150 },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  arrowButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: pinkColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  userContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
  },
  chatBtn: {
    color: '#fff',
    fontSize: 18,
  },
});
