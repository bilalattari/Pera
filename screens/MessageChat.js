import React, { Fragment } from 'react';
import {
    StyleSheet,TextInput,
    View,TouchableOpacity,
    Text,FlatList,ScrollView,
    Image
} from 'react-native';
import CustomInput from '../Component/Input'
import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import {withNavigation , NavigationEvents}  from 'react-navigation'
import { Icon } from 'react-native-elements';
import { themeColor, pinkColor } from '../Constant';
import DocumentPicker from 'react-native-document-picker';
 class Chat extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  static navigationOptions = {
    header: null,
};

render() {
      const {navigation} = this.props.navigation
        return (
          <View style = {{flex : 1 , backgroundColor : themeColor}}>
              <CustomHeader    title = {'Messages'}
              navigation = {this.props.navigation}
              navigation = {this.props.navigation} />
              <ScrollView>
                   <FlatList
                   data = {['1' , '2' , '3','4',]}
                   contentContainerStyle = {{flex : 1}}
                   renderItem  ={({data , index})=> 
                   <View style = {{minHeight : 80 ,   borderRadius : 5,  justifyContent : index%2 == 0 ? "flex-start" : "flex-end" ,width : "60%",
                   alignSelf : index%2 == 0 ?  'flex-start' : "flex-end", marginHorizontal : 6,
                   backgroundColor : index%2 == 0 ?  '#FE8369' : "#E2E6EC" ,}}>
                   <View style = {{minHeight : 60 , alignItems : "center" , flex  : 1 , }}>
                       <Text style = {[{padding : 12 , paddingVertical:  18, 
                        color : index%2 != 0 ?  themeColor : "#fff" , }]}>
                           Cahattttttttttttt Cahattttttttttttt  </Text>
                    </View>

                    <View style = {{height : 15 , backgroundColor : themeColor , width : '100%' ,
                     borderTopRightRadius  : index%2 != 0 ? 41 : 0 , borderTopLeftRadius : index%2 != 0 ? 0 : 41 }}>
                      </View>
                    </View>
                }
                   />
                  </ScrollView>
                   <View style = {styles.inputContainer}>
                   <TouchableOpacity style = {{width : '14%',}}>
                         <Icon type = {'font-awesome'} name = {'camera'}
                          color = {'#fff'} containerStyle = {{ alignSelf : 'center'}}  />
                    </TouchableOpacity>
                        <TextInput placeholder = {'Say Something'} placeholderTextColor = {'grey'}
                         style = {{ width : '72%' , backgroundColor : '#fff' ,  color : pinkColor,
                         height : 40 , borderRadius : 7 , padding : 6 }} />
                         <TouchableOpacity style = {{width : '13%',}}>
                         <Icon type = {'font-awesome'} name = {'arrow-right'} color = {'#fff'} containerStyle = {{ alignSelf : 'center'}}  />
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
      msgImage : {height : 41 , width : 41 , borderRadius : 5 , marginHorizontal : 10},
      inputContainer : {justifyContent : "flex-end" , flexDirection : "row" , height : 60 ,
      borderTopColor : 'grey' , borderTopWidth : 0.5 , alignItems : 'center'},

    })
    export default withNavigation(Chat)
