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
  Platform,
} from 'react-native';
import {SearchBar, Icon} from 'react-native-elements';
import {NavigationEvents} from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import Drawer from 'react-native-drawer';
import firebaseLib from 'react-native-firebase';
import {connect} from 'react-redux';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

import CustomInput from '../Component/Input';
import ControlPanel from '../screens/ControlPanel';
import CustomButton from '../Component/Button';
import CustomHeader from '../Component/header';

import {themeColor, pinkColor} from '../Constant';
class SelectBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 0,
      blogsArr: [],
      errMessage: '',
      loading: true,
      selectedIndex: 0,
      controls: false,
      paused: true,
      hidePlayPause: true,
      hideSeekbar: true,
    };
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const {selectedIndex} = this.state;
    this.getBlog('photography', selectedIndex);
  }

  getBlog(item, index) {
    this.setState(
      {blogsArr: [], loading: true, selectedIndex: index},
      async () => {
        const {
          userObj: {following},
        } = this.props;
        const {blogsArr, errMessage} = this.state;
        const db = firebaseLib.firestore();
        try {
          const blogs = await db
            .collection('Blog')
            .where('category', '==', item.toLowerCase())
            .get();
          if (blogs.empty) {
            this.setState({errMessage: 'Sorry no Blogs found', blogsArr: []});
          }

          blogs.docs.forEach(blog => {
            if (following.indexOf(blog.data().userId) !== -1) {
              blogsArr.push(blog.data());
            }
            this.setState({blogsArr: [...blogsArr]});
          });
        } catch (e) {
          alert(e.message);
        }
        this.setState({loading: false});
      },
    );
  }
  videoIsReady() {
    this.setState({hidePlayPause: false, hideSeekbar: false});
  }

  render() {
    const {navigation} = this.props;
    let {category, blogsArr, errMessage, loading, selectedIndex} = this.state;
    return (
      <View style={{backgroundColor: '#323643', flex: 1}}>
        <CustomHeader navigation={navigation} title={'BLOG'} />
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: '#fff'}}
        />
        <View
          style={{
            height: 60,
            borderBottomColor: '#ccc',
            borderBottomWidth: 0.3,
          }}>
          <FlatList
            data={['Photography', 'For you', 'Technology', 'Design', 'For you']}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => this.getBlog(item, index)}>
                <Text
                  style={{
                    padding: 12,
                    color: selectedIndex === index ? '#fff' : '#bbb',
                    fontSize: 16,
                  }}>
                  {' '}
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {!!blogsArr.length ? (
          <FlatList
            data={blogsArr}
            numColumns={2}
            renderItem={({item, index}) => (
              <View style={styles.imageContainer}>
                {!!item.imageUrl && (
                  <Image source={{uri: item.imageUrl}} style={styles.image} />
                )}
                {!!item.videoUrl && (
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    {Platform.OS === 'ios' ? (
                      <Video
                        source={{uri: item.videoUrl}}
                        style={{width: '100%', height: 250}}
                        paused={true}
                        pictureInPicture={true}
                        controls={true}
                        onLoad={() => this.videoIsReady()}
                        ref={ref => (this.videoRef = ref)}
                      />
                    ) : (
                      <VideoPlayer
                        source={{uri: item.videoUrl}}
                        videoStyle={{
                          width: '100%',
                          height: 160,
                        }}
                        style={{
                          width: '100%',
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
                    )}
                  </View>
                )}
                <Text style={styles.textHeading}>{item.blog}</Text>
                <Text style={{color: '#ccc'}}>73 Comments</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.errMessage}>{errMessage}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {width: '47%', margin: 5},
  image: {
    height: 160,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 4,
  },
  textHeading: {color: '#fff', fontWeight: 'bold', fontSize: 16},
  drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
  errMessage: {color: '#fff', textAlign: 'center', fontSize: 20, marginTop: 20},
});

const mapDispatchToProps = dispatch => {
  return {};
};
const mapStateToProps = state => {
  return {
    userObj: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectBlog);
