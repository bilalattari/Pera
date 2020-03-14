/* eslint-disable */

import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  BackHandler,
  CameraRoll,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import {Icon, Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import Spinner from 'react-native-loading-spinner-overlay';
import {Picker} from 'native-base';

import {themeColor, pinkColor} from '../Constant';
import CustomButton from '../Component/Button';
import firebase from '../utils/firebase';
const dimensions = Dimensions.get('window');
const windowHeight = dimensions.height;
const windowWidth = dimensions.width;

class PostBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogTitle: '',
      blog: '',
      videoPath: '',
      path: '',
      controls: false,
      paused: true,
      hidePlayPause: true,
      hideSeekbar: true,
      fullScreenHeight: null,
      fullScreenWidth: null,
      loading: false,
      selected: ''
    };
  }
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    const {userObj} = this.props;
    BackHandler.addEventListener('hardwareBackPress', this.savingDraft);

    const response = await firebase.getDocument('Drafts', userObj.userId);
    if (response.data()) {
      const blog = response.data().blog;
      const blogTitle = response.data().blogTitle;
      this.setState({blog, blogTitle});
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.savingDraft);
  }

  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }

  async publishBlog() {
    const {blogTitle, blog, mime, data, path, videoPath, selected} = this.state;
    const {userObj} = this.props;
    // if(!blogTitle || !blog || (!path || !videoPath) ) return alert('All Feilds are required')
    if (!blogTitle) return alert('All Feilds are required');
    if (!blog) return alert('All Feilds are required');
    if (!selected) return alert('All Feilds are required');
    if (!videoPath && !path) return alert('All Feilds are required');

    this.setState({loading: true});

    const blogData = {
      blogTitle,
      blog,
      userId: userObj.userId,
      imageUrl: '',
      videoUrl: '',
      category: selected,
      createdAt: Date.now(),
      deleted: false,
      likes: [],
      comments: []
    };
    try {
      if (path) {
        const imageUrl = await firebase.uploadImage(path, userObj.userId);
        blogData.imageUrl = imageUrl;
      }
      if (videoPath) {
        const videoUrl = await firebase.uploadImage(videoPath, userObj.userId);
        blogData.videoUrl = videoUrl;
      }
      await firebase.addDocument('Blog', blogData);
      alert('Published');
      this.setState({blog: '', blogTitle: '', path: ''});
      await firebase.deleteDoc('Drafts', userObj.userId);
      this.props.navigation.goBack();
    } catch (e) {
      alert(e.message);
    }
    this.setState({loading: false});
  }

  savingDraft = async () => {
    const {blogTitle, blog} = this.state;
    const {userObj} = this.props;
    if (!blogTitle && !blog) {
      return this.props.navigation.goBack();
    }

    const blogData = {
      blogTitle,
      blog,
      userId: userObj.userId,
      mime: '',
      data: '',
    };

    const response = await firebase.setDocument(
      'Drafts',
      userObj.userId,
      blogData,
    );
    alert('Saved To Draft');
    this.props.navigation.goBack();
  };
  back() {
    this.savingDraft();
  }

  galleryPermissionAndroid() {
    return request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  }
  videoIsReady() {
    this.setState({hidePlayPause: false, hideSeekbar: false});
  }

  async uploadMedia() {
    if (Platform.OS === 'android') {
      const result = await this.galleryPermissionAndroid();
      if (result !== RESULTS.GRANTED) return;
    }
    try{
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        width: 235,
        height: 235,
        includeBase64: true,
        cropping: true,
      });
      this.setState({path: image.path, videoPath: ''});
    } catch (e) {
      alert(e.message)
    }
  }

  
  async uploadVideo() {
    if (Platform.OS === 'android') {
      const result = await this.galleryPermissionAndroid();
      if (result !== RESULTS.GRANTED) return;
    }
    try {
      const video = await ImagePicker.openPicker({
        mediaType: 'video',
      });
      this.setState({videoPath: video.path, path: ''});
    }
    catch(e){
      console.log('Error', e.message)
      alert(e.message)
    }
  }

  render() {
    const {navigation} = this.props;
    const {
      blogTitle,
      blog,
      mime,
      data,
      path,
      videoPath,
      fullScreenHeight,
      fullScreenWidth,
      loading,
      selected
    } = this.state;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: '#fff'}}
        />
        {!fullScreenHeight && (
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
              Blog
            </Text>
            <Icon
              type={'font-awesome'}
              name={'angle-left'}
              color={'#fff'}
              containerStyle={{marginTop: 8}}
              size={25}
            />
          </View>
        )}
        {!fullScreenHeight && (
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
              onPress={() => this.back()}
            />
            <CustomButton
              title={'Publish'}
              backgroundColor={pinkColor}
              onPress={() => this.publishBlog()}
            />
          </View>
        )}
        {!fullScreenHeight && (
          <>
            <Input
              placeholder={'Title'}
              value={blogTitle}
              placeholderTextColor={'#fff'}
              inputContainerStyle={{height: 80}}
              inputStyle={{
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold',
                letterSpacing: 2,
                fontSize: 20,
              }}
              onChangeText={text => this.setState({blogTitle: text})}
            />
            <Input
              value={blog}
              multiline={true}
              numberOfLines={13}
              onChangeText={text => this.setState({blog: text})}
              placeholder={'Your Blog'}
              placeholderTextColor={'#fff'}
              inputStyle={{color: '#fff', letterSpacing: 2}}
            />
            <Picker
              note
              mode="dropdown"
              style={{width: '100%', color: '#bbb', alignItems: 'flex-end'}}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}>
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Photography" value="photography" />
              <Picker.Item label="Design" value="design" />
              <Picker.Item label="Technology" value="technology" />
            </Picker>
          </>
        )}
        {!!path && !fullScreenHeight && (
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Image source={{uri: path}} style={{width: 180, height: 180}} />
          </View>
        )}
        {!!videoPath && (
          <View
            style={{
              textAlign: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            {Platform.OS === 'ios' ? (
              <Video
                source={{uri: videoPath}}
                style={{width: 250, height: 250, backgroundColor: 'black'}}
                paused={true}
                pictureInPicture={true}
                controls={true}
              />
            ) : (
              <VideoPlayer
                source={{uri: videoPath}}
                videoStyle={{
                  width: '100%',
                  height: fullScreenHeight ? fullScreenHeight : 180,
                }}
                style={{
                  width: '100%',
                  height: fullScreenHeight ? fullScreenHeight : 180,
                }}
                disableVolume={true}
                fullscreen={true}
                paused={this.state.paused}
                onLoad={() => this.videoIsReady()}
                disablePlayPause={this.state.hidePlayPause}
                disableSeekbar={this.state.hideSeekbar}
                disableBack={true}
                onEnterFullscreen={() =>
                  this.setState({
                    fullScreenHeight: windowHeight,
                    fullScreenWidth: windowWidth,
                  })
                }
                onExitFullscreen={() =>
                  this.setState({fullScreenHeight: null, fullScreenWidth: null})
                }
              />
            )}
          </View>
        )}
        {!fullScreenHeight && (
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <CustomButton
              title={'Upload'}
              buttonStyle={{
                borderColor: '#ccc',
                borderWidth: 1,
                marginVertical: 10,
              }}
              onPress={() => this.uploadMedia()}
            />
            <CustomButton
              title={'Upload Video'}
              buttonStyle={{
                borderColor: '#ccc',
                borderWidth: 1,
                marginVertical: 10,
              }}
              onPress={() => this.uploadVideo()}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor,
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
export default connect(mapStateToProps, mapDispatchToProps)(PostBlog);
