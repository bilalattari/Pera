import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,TouchableOpacity,
    Text,FlatList,ScrollView,TouchableWithoutFeedback,
    Image , StatusBar
} from 'react-native';
import CustomInput from '../Component/Input'
import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import {withNavigation , NavigationEvents}  from 'react-navigation'
import { Icon , SearchBar } from 'react-native-elements';
import { themeColor , pinkColor  } from '../Constant/index';
import DocumentPicker from 'react-native-document-picker';

 class Messages extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      image : ''
    }
  }
  static navigationOptions = {
    header: null,
};

messageList = ( item )=> <TouchableOpacity
onPress = {()=> this.props.navigation.navigate("Chat")}
style = {styles.messageContainer}>
  <View>
<Image source = {require('../assets/avatar.png')} 
style = {styles.msgImage} />
<View style={[styles.iconContainer,{backgroundColor:pinkColor }]}>
  <Text style = {{color : '#fff' , fontSize : 10}}> 1</Text>
  </View>
    </View>
<View style = {{flex : 1 }}>
<View style = {styles.msgName}> 
<Text style = {styles.name}>User Name</Text>
</View>
<Text style ={{paddingLeft : 5 , color : '#ccc'}}>dashkhdskja dashkhdskjadashkhdskjadashkhdskja dashkhdskja</Text>
</View>
</TouchableOpacity>


render() {
      const {navigation} = this.props.navigation
        return (
          <View style = {styles.container}>
         <StatusBar backgroundColor={themeColor} translucent />
              <View style = {{height : 100 , flexDirection : 'row' , alignItems : 'center' ,
                 justifyContent : 'space-between' , marginHorizontal : 15 ,}}>
                    <Text style = {{color : '#fff' , fontSize : 25 , fontWeight : 'bold' , marginTop : 12}}>Messages</Text>
                 </View>
              <SearchBar
          containerStyle={{
            margin: 8,
            borderRadius: 5,
            backgroundColor : themeColor,
            borderTopColor: themeColor,
            borderBottomColor: themeColor
          }}
          placeholder={'Search'}
          inputContainerStyle={{ backgroundColor: '#fff' }}
        />
        <View style = {{paddingHorizontal : 12 , borderBottomColor : 'grey' , borderBottomWidth : 3}}>
        <Text style = {{color : '#ccc' , fontSize : 13 , fontWeight : 'bold'}}> ONLINE CONTACTS</Text>
        <View style = {{paddingVertical : 12 , }}>
        <FlatList
                   data = {['1' , '2' , '3','4','5' , '6']}
                   horizontal = {true}
                   showsHorizontalScrollIndicator = {false}
                   renderItem  ={({item , index}) => <View >
                       <View>
<Image source = {require('../assets/avatar.png')} 
style = {styles.msgImage} />
<View style={[styles.iconContainer,{backgroundColor:'green' , height : 12 , width : 12 , marginRight : 12 }]}/>
    </View>
    <Text style = {{color : '#ccc' , fontSize : 11 , fontWeight : 'bold' ,
     textAlign : 'center' , marginTop : 8}}>ABCD</Text>
      </View> }
                   />
          </View>
                   </View>
                   <FlatList
                   data = {['1' , '2' , '3','4','5' , '6']}
                   renderItem  ={({item , index}) => this.messageList(item)}
                   />
            </View>
        );
      }   
    }   
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor : themeColor
      },
      iconContainer: {
        height: 18,
        width: 18,
        backgroundColor: pinkColor,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf : 'flex-end',
        marginTop: -12,
        marginRight: 8
      },
      messageContainer : {minHeight : 100 , flexDirection : 'row' , alignItems : "center", 
       borderBottomWidth : 0.5  ,   borderBottomColor : 'grey'},
      msgImage : {height : 55 , width : 55 , borderRadius : 25 , marginHorizontal : 10},
      msgName : {flexDirection  : "row" , justifyContent : 'space-between' ,
      marginHorizontal : 5 , height : 30 , alignItems : "center" , },
      name : {fontWeight : 'bold' , fontSize : 18  , color : '#fff' },

    })
    export default withNavigation(Messages)
