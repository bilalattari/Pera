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
  Platform,
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import CustomInput from '../Component/Input';
import CustomButton from '../Component/Button';
import CustomHeader from '../Component/header';
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import { themeColor, pinkColor } from '../Constant';
import firebaseLib from 'react-native-firebase';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: false,
      blogs: [],
      loading: true,
      isFollowed: false,
      userData: '',
      controls: false,
      paused: true,
      hidePlayPause: true,
      hideSeekbar: true,
    };
  }
  static navigationOptions = {
    header: null,
  };
  async componentDidMount() {
    this.decideUser();
    const { userObj, navigation } = this.props;
    let { userId } = userObj;
    if (this.props.navigation.state.params.otherUser) {
      userId = this.props.navigation.state.params.otherUser.userId;
      if (userObj.following.indexOf(userId) !== -1) {
        this.setState({ isFollowed: true });
      }
    }
    const db = firebaseLib.firestore();
    const blogs = [];

    try {
      let userBlogs = await db
        .collection('Blog')
        .where('userId', '==', userId)
        .get();

      userBlogs = userBlogs.docs.forEach(doc => blogs.push(doc.data()));
      this.setState({ blogs, loading: false });
    } catch (e) {
      console.log('Error', e.message);
    }
  }

  statsNumber = (heading, number) => (
    <View>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.number}>{number}</Text>
    </View>
  );

  async follow(otherUserId) {
    const db = firebaseLib.firestore();
    const FieldValue = firebaseLib.firestore.FieldValue;

    const {
      userObj: { userId, userName, photoUrl },
      navigation,
    } = this.props;
    const { userData } = this.state;
    try {
      let obj = {
        msg: 'started following you.',
        userName: userName,
        userID: userId,
        receiver: otherUserId,
        photoUrl: photoUrl,
        type: 'follow',
        time: `${new Date().toLocaleString()}`
      }
      this.setState({ loading: true });
      await db
        .collection('Users')
        .doc(userId)
        .update({
          following: FieldValue.arrayUnion(otherUserId),
        });
      await db
        .collection('Users')
        .doc(otherUserId)
        .update({
          followers: FieldValue.arrayUnion(userId),
        });
      await db.collection("Notification").add(obj)
      if (navigation.state.params.otherUser) {
        userData.followers.push(userId);
        this.setState({ userData });
      }
      this.setState({ isFollowed: true });
    } catch (e) {
      alert(e.message);
    }
    this.setState({ loading: false });
  }

  async unFollow(otherUserId) {
    const db = firebaseLib.firestore();
    const FieldValue = firebaseLib.firestore.FieldValue;

    const {
      userObj: { userId, userName, photoUrl },
      navigation,
    } = this.props;
    const { userData } = this.state;
    try {
      let obj = {
        msg: 'unfollowed you.',
        userName: userName,
        userID: userId,
        receiver: otherUserId,
        photoUrl: photoUrl,
        type: 'follow',
        time: `${new Date().toLocaleString()}`
      }
      this.setState({ loading: true });
      await db
        .collection('Users')
        .doc(userId)
        .update({
          following: FieldValue.arrayRemove(otherUserId),
        });
      await db
        .collection('Users')
        .doc(otherUserId)
        .update({
          followers: FieldValue.arrayRemove(userId),
        });
      await db.collection("Notification").add(obj)
      if (navigation.state.params.otherUser) {
        userData.followers.splice(0, 1);
        this.setState({ userData });
      }
      this.setState({ isFollowed: false });
    } catch (e) {
      alert(e.message);
    }
    this.setState({ loading: false });
  }

  decideUser = newData => {
    const { navigation, userObj } = this.props;
    let userData = '';
    if (!!userObj.userId) {
      if (navigation.state.params.otherUser) {
        userData = navigation.state.params.otherUser;
      } else {
        userData = newData ? newData : userObj;
      }
      this.setState({ userData });
    }
  };

  componentWillReceiveProps(nextProps) {
    this.decideUser(nextProps.userObj);
  }
  videoIsReady() {
    this.setState({ hidePlayPause: false, hideSeekbar: false });
  }

  navigateToDetails(blog, userData) {
    const { navigation } = this.props;
    blog.userObj = userData;
    navigation.navigate('BlogDetail', { data: blog });
  }

  render() {
    const { navigation, userObj } = this.props;
    if (!userObj) {
      navigation.navigate('Auth');
      return null;
    }
    let { comments, blogs, loading, isFollowed, userData } = this.state;
    const { userName, followers, following, userId, photoUrl } = userData;
    return (
      <ScrollView
        stickyHeaderIndices={[0]}
        style={{ backgroundColor: '#323643', flex: 1 }}>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{ color: '#fff' }}
        />
        <CustomHeader
          title={'PROFILE'}
          navigation={navigation} />
        <View style={{
          flexDirection: "row", justifyContent: "space-around",
          marginVertical: 25
        }}>
          <View style={{ alignSelf: 'center', alignItems: 'center' }}>
            <View style={styles.imageWrapper}>
              {photoUrl ? (
                <Image
                  source={{ uri: photoUrl }}
                  style={[styles.imageStyle, { borderRadius: 125 }]}
                />
              ) : (
                  <Image
                    source={require('../assets/avatar.png')}
                    style={[styles.imageStyle, { borderRadius: 125 }]}
                  />
                )}
            </View>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>
              {userName}
            </Text>
            <Text style={{ color: '#ccc', }}>Graphic Designer</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 25 }}>
            {!!userId && userId !== userObj.userId && (
              <View>
                {isFollowed ? (
                  <CustomButton
                    title="Following"
                    backgroundColor={pinkColor}
                    width={110}
                    height={48}
                    onPress={() => this.unFollow(userId)}
                  />
                ) : (
                    <CustomButton
                      title="Follow"
                      backgroundColor={pinkColor}
                      width={110}
                      height={48}
                      onPress={() => this.follow(userId)}
                    />
                  )}
              </View>
            )}
            {userObj.userId === userId && (
              <TouchableOpacity style={{
                height: 50, width: 50, borderRadius: 125, justifyContent: "center", alignItems: "center",
                borderColor: '#ccc', borderWidth: 0.5, marginLeft: 4
              }}>
                <Icon type={'material-community'} name={'pencil-outline'}
                  color={"#ccc"} size={30} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.statsView}>
          {!!userData && this.statsNumber('FOLLOWING', following.length)}
          {!!userData && this.statsNumber('FOLLOWER', followers.length)}
        </View>


        <Text style={{
          margin: 6, fontWeight: "bold", color: "#fff",
          fontSize: 20, letterSpacing: 1
        }}>BLOGS</Text>
        <View
          style={{
            backgroundColor: themeColor,
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {!!blogs.length &&
              blogs.map((data, index) => {
                return (
                  <TouchableOpacity
                    style={{ height: 120, width: 125, margin: 2, }}
                    onPress={() => this.navigateToDetails(data, userData)}
                  >
                    <Image
                      source={{ uri: data.imageUrl }}
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 5,
                        resizeMode: 'stretch',
                      }}
                    />
                    {!!data.videoUrl && (
                      <View
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginVertical: 10,
                        }}>
                        {/* {Platform.OS === 'ios' ? (
                        <Video
                          source={{uri: data.videoUrl}}
                          style={{width: '32%', height: 110}}
                          paused={true}
                          pictureInPicture={true}
                          controls={true}
                          onLoad={() => this.videoIsReady()}
                          ref={ref => (this.videoRef = ref)}
                        />
                      ) : (
                        <VideoPlayer
                          source={{uri: data.videoUrl}}
                          videoStyle={{
                            width: '100%',
                            height: 160,
                            backgroundColor: 'red'
                          }}
                          style={{
                            width: 180,
                            height: 160,
                          }}
                          disableVolume={true}
                          fullscreen={false}
                          paused={this.state.paused}
                          onLoad={() => this.videoIsReady()}
                          disablePlayPause={this.state.hidePlayPause}
                          disableSeekbar={this.state.hideSeekbar}
                          disableBack={true}
                        />
                      )} */}
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
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
    resizeMode: 'contain',
  },
  imageWrapper: {
    height: 100,
    width: 100,
    borderRadius: 125,
    borderColor: pinkColor,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 12,
    height: 100,
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    borderWidth: 5,
  },
  heading: { color: 'grey', fontSize: 14, fontWeight: 'bold', margin: 4 },
  number: { color: '#fff', fontSize: 20, textAlign: 'center' },
});
const mapDispatchToProps = dispatch => {
  return {};
};
const mapStateToProps = state => {
  return {
    userObj: state.auth.user,

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
