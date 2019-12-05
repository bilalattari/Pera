import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,TouchableOpacity,
    Text,ScrollView
} from 'react-native';
import {Icon , Input , Button} from 'react-native-elements'
import { themeColor, pinkColor } from '../Constant';
import CustomButton from '../Component/Button'

 class PostBlog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        blog : 'Lorem spums dsa Lorem spums dsa Lorem spums dsa Lorem spums dsa Lorem spums dsa'
    }
  }
  static navigationOptions = {
    header: null,
};
    render() {
      const {navigation} = this.props
        return (
            <ScrollView style={styles.container}>
                <View style = {{height : 100 , flexDirection : 'row' , alignItems : 'center' ,
                 justifyContent : 'space-between' , marginHorizontal : 15 ,}}>
                    <Text style = {{color : '#fff' , fontSize : 25 , fontWeight : 'bold' , marginTop : 12}}>Blog</Text>
                    <Icon type = {'font-awesome'} name  = {'angle-left'} color = {'#fff'} containerStyle = {{marginTop : 8}} 
                    size = {25} />

                 </View>
                    <View style = {{flexDirection : 'row' , justifyContent : 'space-between' ,
                     marginHorizontal : 12 , marginVertical : 12}}>
                        <CustomButton title = {'Close'}  buttonStyle = {{borderColor : '#ccc' , borderWidth:  1 }}/>
                        <CustomButton title = {'Publish'} backgroundColor ={pinkColor} />
                    </View>

                    <Input  placeholder = {'Beauty'} 
                    placeholderTextColor = {'#fff'}
                    inputContainerStyle = {{height : 80}}
                    inputStyle = {{textAlign : 'center' , color : '#fff' , 
                    fontWeight : 'bold' , letterSpacing : 2 , fontSize : 20}}/>
                     <Input  
                    value = {this.state.blog}
                    multiline = {true}
                    numberOfLines = {16}
                    onChangeText = {(text)=> this.setState({blog :text }) } 
                    placeholder = {'Beauty'} 
                    placeholderTextColor = {'#fff'}
                    inputContainerStyle = {{height : '75%'}}
                    inputStyle = {{ color : '#fff' ,  letterSpacing : 2 }}/>
          </ScrollView>
        );
      }   
    }   
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
backgroundColor : themeColor
      },
    })
    export default PostBlog
 