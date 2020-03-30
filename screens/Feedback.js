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
  Linking,
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import CustomInput from '../Component/Input';
import ControlPanel from '../screens/ControlPanel';
import CustomButton from '../Component/Button';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import firebaseLib from 'react-native-firebase';
import CustomHeader from '../Component/header';
import { SwipeListView } from 'react-native-swipe-list-view';
import Drawer from 'react-native-drawer';
import firebase from '../utils/firebase';
import { loginUser } from '../redux/actions/authActions';
import moment from 'moment'
import { themeColor, pinkColor } from '../Constant';
class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: false,
      users: [],
      allComments: [],
      allOthers: [],
      loading: true,
    };
  }
  static navigationOptions = {
    header: null,
  };
  async componentDidMount() {
    this.getComments()
  }
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };
  getComments = async () => {
    const db = firebaseLib.firestore();
    const {
      userObj: { userId, userName, photoUrl },
      navigation,
    } = this.props;
    const { userData } = this.state;
    let comments = []
    let others = []
    await db
      .collection('Notification').
      where('receiver' ,'==' , userId )
      .onSnapshot(snapShot => {
        if (snapShot.empty) {
          this.setState({
            loading: false, isError: true, allComments: undefined, allOthers: undefined
          })
          return
        }
        else {
          snapShot.docChanges.forEach(notifs => {
            let notificatoin = notifs.doc.data()
            // console.log(userId , notificatoin.userID)
            if (notificatoin.type === 'comment' && notificatoin.userID !== userId) {
              comments.push(notificatoin)
            }
            if (notificatoin.type !== 'comment' && notificatoin.userID !== userId) {
              others.push(notificatoin)
            }
          })
        }
      })
    this.setState({ allComments: comments, allOthers: others })
  }
  swipListItem = (item, index) => {
    // console.log(item, 'item')
    return (
      <View
        style={[
          styles.itemContainer,
          {
            flexDirection: 'row',
            minHeight: 80,
            width: '95%',
          },
        ]}>
        <Image
          source={require('../assets/avatar.png')}
          style={styles.imageStyle}
        />
        <View >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
            {item.item.userName}
            <Text style={{ fontWeight: "normal", fontSize: 12 }}>  commented on your post</Text>
          </Text>
          <Text style={{ color: '#ccc', paddingVertical: 6 }}>
            {item.item.comment}
          </Text>
        </View>
      </View>
    );
  }
  feedBackListItem = (item, index) => {
    console.log(item.time)  
    return (
      <View style={styles.itemContainer}>
        <View>
          <Image
            source={require('../assets/avatar.png')}
            style={styles.imageStyle}
          />
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
        <View>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>
            {item.userName}{' '}
            <Text style={{ fontWeight: '400', color: '#ccc', fontSize: 12 }}>
              {item.msg}              </Text>
          </Text>
          <Text style={{ color: '#ccc', fontSize: 12 }}>{moment(new Date(item.time)).fromNow()}</Text>
        </View>
      </View>
    )
  }

  render() {
    const { navigation, userObj } = this.props;
    if (userObj === undefined) {
      navigation.navigate('Auth')
      return null
    }
    let { comments, users, loading, allComments, allOthers } = this.state;
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        type="overlay"
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={styles.drawer}
        tweenHandler={ratio => ({
          main: { opacity: (2 - ratio) / 2 },
        })}
        content={<ControlPanel />}>
        <NavigationEvents onDidFocus={() => this.closeControlPanel()} />
        <View style={{ backgroundColor: '#323643', flex: 1 }}>
          <CustomHeader
            home
            title={comments ? 'Comments' : 'Feedback'}
            onPress={() => this.openControlPanel()}
          />
          <SearchBar
            containerStyle={{
              margin: 8,
              borderRadius: 5,
              borderTopColor: themeColor,
              borderBottomColor: themeColor,
            }}
            placeholder={'Search'}
            inputContainerStyle={{ backgroundColor: '#fff' }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 12,
            }}>
            <CustomButton
              onPress={() => this.setState({ comments: true })}
              title={'Comments'}
              buttonStyle={[styles.commentButton,
              { borderColor: !comments ? pinkColor : themeColor, borderWidth: 1 }]}
              backgroundColor={!comments ? themeColor : pinkColor}
              titleStyle={[styles.textPink, { color: comments ? '#fff' : pinkColor }]}
            />
            <CustomButton
              onPress={() => this.setState({ comments: false })}
              title={'Feedback'}
              buttonStyle={[styles.commentButton,
              { borderColor: comments ? pinkColor : themeColor, borderWidth: 0.5 }]}
              backgroundColor={comments ? themeColor : pinkColor}
              titleStyle={[styles.textPink, { color: !comments ? '#fff' : pinkColor }]}
            />
          </View>
          {
            comments && !allComments ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                <Icon type={'ionicon'} name={'ios-notifications-outline'} color={'#fff'} size={60} />
                <Text style={{ color: "#fff", fontSize: 15 }}>No Comments For You</Text>
              </View> : null
          }
         
          {comments ? (
            <SwipeListView
              data={allComments ?allComments : [] }
              renderItem={(data, rowMap) => this.swipListItem(data, rowMap)}
              renderHiddenItem={(data, rowMap) => (
                <View
                  style={{
                    alignSelf: 'flex-end',
                    marginRight: 20,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity style={styles.arrowButton}>
                    <Icon type={'font-awesome'} name={'reply'} color={'#fff'} />
                  </TouchableOpacity>
                </View>
              )}
              disableRightSwipe
              leftOpenValue={0}
              rightOpenValue={-75}
            />
          ) : (
              <FlatList
                data={allOthers ? allOthers : []}
                keyExtractor={item => item}
                renderItem={({ item, index }) => this.feedBackListItem(item, index)}
              />
            )}
             {
            !comments && !allOthers  ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                <Icon type={'font-awesome'} name={'comment-o'} color={'#fff'} size={60} />
                <Text style={{ color: "#fff", fontSize: 15  , marginVertical : 12}}>No Likes For You</Text>
              </View> : null
          }
        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
  imageStyle: {
    height: 36,
    width: 36,
    borderRadius: 125,
    marginHorizontal: 12,
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
  textPink: {
    color: pinkColor,
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
  commentButton: {
    borderColor: '#000000',
    borderWidth: 1,
    width: 150,
    color: pinkColor,
  },
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
const mapDispatchToProps = dispatch => {
  return {
    loginUser: userData => dispatch(loginUser(userData)),
  };
};
const mapStateToProps = state => {
  return {
    userObj: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
