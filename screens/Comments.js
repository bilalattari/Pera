/* eslint-disable */

import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Input, Button} from 'react-native-elements';
import firebaseLib from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';

import {themeColor, pinkColor} from '../Constant';
import CustomHeader from '../Component/header';
import CustomButton from '../Component/Button';

class Comments extends Component {
  state = {
    comment: '',
    loading: false,
    commentsArr: [],
  };
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const commentsArr = this.props.navigation.state.params.blog.comments;
    this.setState({commentsArr});
  }

  async commentBlog() {
    const blogId = this.props.navigation.state.params.blog.id;
    const db = firebaseLib.firestore();
    const FieldValue = firebaseLib.firestore.FieldValue;
    const {userObj} = this.props;
    const {comment, commentsArr} = this.state;
    const {userName, userId, photoUrl} = userObj;
    if (!comment) return alert('Field is required');
    const commentObj = {
      userName,
      userId,
      photoUrl,
      comment,
    };
    try {
      commentsArr.push(commentObj);
      this.setState({loading: true});
      await db
        .collection('Blog')
        .doc(blogId)
        .update({
          comments: FieldValue.arrayUnion(commentObj),
        });
    } catch (e) {
      alert(e.message);
    }
    this.setState({loading: false, comment: ''});
  }

  render() {
    const {navigation} = this.props;
    const {comment, loading, commentsArr} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#323643'}}>
        <ScrollView style={{flex: 1}}>
          <CustomHeader title={'Comments'} navigation={navigation} />
          <Spinner
            visible={loading}
            textContent={'Loading...'}
            textStyle={{color: '#fff'}}
          />
          {!!commentsArr.length &&
            commentsArr.map(item => (
              <View style={styles.commentBox}>
                <Image
                  source={
                    item.photoUrl
                      ? {uri: item.photoUrl}
                      : require('../assets/avatar.png')
                  }
                  style={styles.imageStyle}
                />
                <View>
                  <Text style={styles.userName}>{item.userName}</Text>
                  <Text style={styles.comment}>{item.comment}</Text>
                </View>
              </View>
            ))}
        </ScrollView>
        <Input
          placeholder={'Write Comment'}
          value={comment}
          placeholderTextColor={'#fff'}
          inputContainerStyle={{height: 60}}
          inputStyle={{
            color: '#fff',
            fontWeight: 'bold',
            letterSpacing: 2,
            fontSize: 20,
          }}
          onChangeText={text => this.setState({comment: text})}
        />
        <CustomButton
          title={'Post Comment'}
          buttonStyle={{
            borderColor: '#ccc',
            borderWidth: 1,
            marginVertical: 5,
          }}
          onPress={() => this.commentBlog()}
        />
      </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Comments);

const styles = StyleSheet.create({
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 125,
    marginHorizontal: 12,
    resizeMode: 'contain',
  },
  commentBox: {
    flexDirection: 'row',
    marginTop: 15,
  },
  comment: {
    color: '#fff',
    fontSize: 19,
  },
  userName: {
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 4,
      fontSize: 11
  }
});
