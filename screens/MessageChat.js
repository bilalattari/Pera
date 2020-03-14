/* eslint-disable */

import React, { Fragment } from 'react';
import {
  StyleSheet, TextInput,
  View, TouchableOpacity,
  Text, FlatList, ScrollView,
  Image
} from 'react-native';
import { connect } from 'react-redux'
import CustomInput from '../Component/Input'
import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import { withNavigation, NavigationEvents } from 'react-navigation'
import { Icon } from 'react-native-elements';
import { themeColor, pinkColor } from '../Constant';
import DocumentPicker from 'react-native-document-picker';
import firebaseLib from 'react-native-firebase'
import firebase from '../utils/firebase'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      messageList: []
    }
  }
  static navigationOptions = {
    header: null,
  };
  componentDidMount() {
    const { otherUserId } = this.props.navigation.state.params
    const { userId } = this.props.userObj
    const { messageList } = this.state
    const db = firebaseLib.firestore()
    userObj = {
      [userId]: true,
      [otherUserId]: true,
      createdAt: Date.now()
    }
    
    db.collection("Rooms")
    .where("userObj." + userId , '==' , true)
    .where("userObj." + otherUserId , '==' , true)
    .onSnapshot(snapShot => {

      if(snapShot.empty){
        db.collection('Rooms').add({userObj}).then((doc)=> {
          const roomId = doc.id
          this.setState({ roomId })
          return
        })
      }
      snapShot.docChanges.forEach((value)=>{
        this.setState({roomId : value.doc.id})
        db.collection('Rooms').doc(value.doc.id)
        .collection('Messages')
        .orderBy('createdAt')
        .onSnapshot(querySnapShot => {
          if(querySnapShot.empty) return
            querySnapShot.docChanges.forEach((values)=>{              
              messageList.push(values.doc.data())
            })
            this.setState({messageList})
        })

      })

    })

  }
  async sendMessage(){
    const { otherUserId } = this.props.navigation.state.params
    const { userId, userName } = this.props.userObj
    const { roomId, message } = this.state
    const db = firebaseLib.firestore()
    if(!message) return alert('Write a message')
    const msgObj= {
      message: message,
      senderId: userId,
      recieverId: otherUserId,
      createdAt: Date.now(),
      senderName: userName
    } 
    await db.collection('Rooms').doc(roomId).collection('Messages').add(msgObj)
    this.setState({ message: '' })
  }

  render() {
    const { navigation } = this.props.navigation
    const { message, messageList } = this.state
    const { userId } = this.props.userObj
    return (
      <View style={{ flex: 1, backgroundColor: themeColor }}>
        <CustomHeader title={'Messages'}
          navigation={this.props.navigation}
          navigation={this.props.navigation} />
        <ScrollView>
          {messageList.length !== 0 && <FlatList
            data={messageList}
            contentContainerStyle={{ flex: 1 }}
            keyExtractor={item => item}
            renderItem={({ item, index }) =>
              <View style={{
                minHeight: 80, borderRadius: 5, justifyContent: item.senderId === userId ? "flex-end" : "flex-start", width: "60%",
                alignSelf: item.senderId === userId ? "flex-end" : "flex-start", marginHorizontal: 6,
                backgroundColor:  item.senderId === userId  ? '#E2E6EC' : "#FE8369",
              }}>
                <View style={{ minHeight: 60, alignItems: "center", flex: 1, }}>
                  <Text style={[{
                    padding: 12, paddingVertical: 18,
                    color: item.senderId === userId ? themeColor : "#fff",
                  }]}>
                    {item.message} </Text>
                </View>

                <View style={{
                  height: 15, backgroundColor: themeColor, width: '100%',
                  borderTopRightRadius: item.senderId === userId ? 41 : 0, borderTopLeftRadius: item.senderId === userId ? 0 : 41
                }}>
                </View>
              </View>
            }
          />}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={{ width: '14%', }}>
            <Icon type={'font-awesome'} name={'camera'}
              color={'#fff'} containerStyle={{ alignSelf: 'center' }} />
          </TouchableOpacity>
          <TextInput placeholder={'Say Something'} placeholderTextColor={'grey'}
            style={{
              width: '72%', backgroundColor: '#fff', color: pinkColor,
              height: 40, borderRadius: 7, padding: 6
            }}
            onChangeText = {(message) => this.setState({message})}
            value={message}
            />
          <TouchableOpacity style={{ width: '13%', }} onPress={() => this.sendMessage()}>
            <Icon type={'font-awesome'} name={'arrow-right'} color={'#fff'} containerStyle={{ alignSelf: 'center' }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  msgImage: { height: 41, width: 41, borderRadius: 5, marginHorizontal: 10 },
  inputContainer: {
    justifyContent: "flex-end", flexDirection: "row", height: 60,
    borderTopColor: 'grey', borderTopWidth: 0.5, alignItems: 'center'
  },

})
const mapDispatchToProps = (dispatch) => {
  return {}
}
const mapStateToProps = (state) => {
  return {
    userObj: state.auth.user
  }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Chat))


