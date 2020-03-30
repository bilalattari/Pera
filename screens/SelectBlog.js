/* eslint-disable */

import React, { Fragment } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import firebaseLib from 'react-native-firebase';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import Text from '../Component/Text'
import VideoPlayer from 'react-native-video-controls';
import CustomHeader from '../Component/header';
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
      categoryList: [
        { name: "Photography", image: require('../assets/interest/photography.jpg'), selected: false },
        { name: "Food", image: require('../assets/interest/food.jpg'), selected: false },
        { name: "Health", image: require('../assets/interest/health.jpg'), selected: false },
        { name: "Lifestyle", image: require('../assets/interest/lifestyle.jpg'), selected: false },
        { name: "Politics", image: require('../assets/interest/politics.jpg'), selected: false },
        { name: "Sports", image: require('../assets/interest/sports.jpg'), selected: false },
        { name: "Travel", image: require('../assets/interest/travel.jpg'), selected: false },
        { name: "Music", image: require('../assets/interest/music.jpg'), selected: false },
        { name: "Business", image: require('../assets/interest/business.jpg'), selected: false },
      ],
    };
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const { selectedIndex } = this.state;
    this.getBlog({ name: 'photography' }, selectedIndex);
  }
  getBlog(item, index) {
    console.log(item.name, 'iteem')
    this.setState(
      { blogsArr: [], loading: true, selectedIndex: index },
      async () => {
        const {
          userObj: { following, blogCategory },
        } = this.props;
        const { blogsArr, errMessage } = this.state;
        const db = firebaseLib.firestore();
        try {
          const blogs =
            item === 'For you' ? await db
              .collection('Blog')
              .get() :
              await db
                .collection('Blog')
                .where('category', '==', item.name.toLowerCase())
                .get();
          if (blogs.empty) {
            this.setState({ errMessage: 'Sorry no Blogs found', blogsArr: [] });
          }
          blogs.docs.forEach(blog => {
            if (following.indexOf(blog.data().userId) !== -1) {
              blogsArr.push(blog.data());
            }
            this.setState({ blogsArr: [...blogsArr] });
          });
        } catch (e) {
          alert(e.message);
        }
        this.setState({ loading: false });
      },
    );
  }
  videoIsReady() {
    this.setState({ hidePlayPause: false, hideSeekbar: false });
  }

  render() {
    const { navigation  , fontfamily} = this.props;
    let { category, blogsArr, errMessage, loading, selectedIndex, categoryList } = this.state;
    return (
      <View style={{ backgroundColor: '#323643', flex: 1 }}>
        <CustomHeader navigation={navigation} title={'BLOG'} />
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{ color: '#fff' }}
        />
        <View
          style={{
            height: 50,
            borderBottomColor: '#ccc',
            borderBottomWidth: 0.3,
          }}>
          <FlatList
            data={categoryList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => this.getBlog(item, index)}>
                <Text
                fontFamily = {fontfamily}
                  align = {'left'}
                  text={item.name}
                  style={{ padding: 12}}
                  color={selectedIndex === index ? '#fff' : '#bbb'}
                  bold={selectedIndex === index ? 'bold' : 'normal'} />
              </TouchableOpacity>
            )}
          />
        </View>
        <ScrollView>
          <Image source={categoryList[selectedIndex].image} style={{ width: "100%", height: 220, marginVertical: 12, resizeMode: "stretch" }} />
          {!!blogsArr.length ? (
            <FlatList
              data={blogsArr}
              numColumns={2}
              renderItem={({ item, index }) => (
                <TouchableOpacity style={styles.imageContainer}>
                  {!!item.imageUrl && (
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
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
                          source={{ uri: item.videoUrl }}
                          style={{ width: '100%', height: 250 }}
                          paused={true}
                          pictureInPicture={true}
                          controls={true}
                          onLoad={() => this.videoIsReady()}
                          ref={ref => (this.videoRef = ref)}
                        />
                      ) : (
                          <VideoPlayer
                            source={{ uri: item.videoUrl }}
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
                  <View style={{ paddingLeft: 12, marginTop: 4 }}>
                    <Text fontFamily = {fontfamily} align = {'left'} text={item.blog} bold={true} />
                    <Text fontFamily = {fontfamily} align = {'left'} color={'#ccc'} text={item.comments.length + '  comments'} />
                  </View >
                </TouchableOpacity>
              )}
            />
          ) : (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text fontFamily = {fontfamily} text={errMessage} style={styles.errMessage} />
              </View>
            )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: { width: '47%', margin: 5 },
  image: {
    height: 200,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 4,
  },
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
  errMessage: { color: '#fff', textAlign: 'center', fontSize: 20, marginTop: 20 },
});

const mapDispatchToProps = dispatch => {
  return {};
};
const mapStateToProps = state => {
  return {
    userObj: state.auth.user,
    fontfamily: state.font.fontFamily
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectBlog);
