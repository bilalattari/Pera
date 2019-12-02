import React, { Fragment } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Text,Switch,
  ScrollView
} from 'react-native'
import { SearchBar, Icon , Input  } from 'react-native-elements'
import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Picker } from 'native-base'
import { themeColor, pinkColor } from '../Constant'
import countries from '../Constant/countries';
class Checkout extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          selected: '1',
          switch : false
        }
      }
      static navigationOptions = {
        header: null
      }
      onValueChange (value) {
        this.setState({
          selected: value
        })
      }
  render () {
    const { navigation } = this.props
    return (
      <ScrollView stickyHeaderIndices = {[0]} style={{ backgroundColor: '#323643', flex: 1 }}>
        <CustomHeader navigation = {navigation} title={'Check Out'} />
              <Input 
                placeholder = {"Name on Card"}
                containerStyle = {{width : "100%" , }}
                inputStyle = {styles.inputStyle}
                placeholderTextColor = {"#bbb"}
                inputContainerStyle = {styles.inputContainer} />
                <Input 
                placeholder = {"Card Number"}
                containerStyle = {{width : "100%" , }}
                inputStyle = {styles.inputStyle}
                keyboardType = {'numeric'}
                placeholderTextColor = {"#bbb"}
                inputContainerStyle = {styles.inputContainer} />

                <View style = {{flexDirection : 'row' , borderBottomColor  : "#444B60" , borderBottomWidth : 5 , }}> 
                <Input 
                placeholder = {"MM/YY"}
                containerStyle = {{width : "50%" , borderRightColor : 'grey' , borderRightWidth : 0.5 }}
                inputStyle = {styles.inputStyle}
                placeholderTextColor = {"#bbb"}
                inputContainerStyle = {styles.inputContainer} />
                <Input 
                placeholder = {"CVV"}
                containerStyle = {{width : "50%" , }}
                inputStyle = {styles.inputStyle}
                keyboardType = {'numeric'}
                placeholderTextColor = {"#bbb"}
                inputContainerStyle = {styles.inputContainer} />
                </View>

                <View  style={[styles.picker , {flexDirection : 'row' ,  justifyContent  : 'space-between' , alignItems : 'center'}]} >
                   <Text style = {{color : '#bbb' , fontSize : 16 , paddingLeft: 5 ,}}>Same with delivery address</Text>
                    <Switch value = {this.state.switch} onChange = {()=> this.setState({switch :!this.state.switch })} />
                </View>
                <View  style={styles.picker} >
          <Picker
            note
            mode='dropdown'
            style={{ width: '100%', color: '#bbb'  , alignItems : "flex-end"}}
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label='Country' key = {1} />
            {
             Object.keys(countries).map((country , index)=> <Picker.Item label={countries[country]} key = {country} />)  
            }
          </Picker>
        </View>
                 <Input 
                placeholder = {"Address"}
                containerStyle = {{width : "100%" , }}
                inputStyle = {styles.inputStyle}
                placeholderTextColor = {"#bbb"}
                inputContainerStyle = {styles.inputContainer} />
                 <Input 
                placeholder = {"City"}
                containerStyle = {{width : "100%" , }}
                inputStyle = {styles.inputStyle}
                placeholderTextColor = {"#bbb"}
                inputContainerStyle = {styles.inputContainer} />
                 <Input 
                placeholder = {"Postal Code"}
                keyboardType = {'numeric'}
                containerStyle = {{width : "100%" , }}
                inputStyle = {styles.inputStyle}
                placeholderTextColor = {"#bbb"}
                inputContainerStyle = {styles.inputContainer} />
                <View style = {{marginVertical : 25}}>
                    <CustomButton  title = {'Check Out'} backgroundColor = {pinkColor} 
        containerStyle = {[{width : '90%' }]} />
                    </View>
                
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageStyle: {
    height: 85,
    width: 85,
    borderRadius: 125,
    marginHorizontal: 12,
    resizeMode: 'contain'
  },
  picker :{
    width: '99%',
    alignSelf: 'center',
    paddingHorizontal: 4,
    backgroundColor: themeColor,
    height: 60,
    alignItems : "flex-end",

    borderBottomColor : "#444B60" , borderBottomWidth: 0.5,
    borderRadius: 7
  },
  imageWrapper : {
    height: 100,
    width: 100,
    borderRadius: 125,
    borderColor: pinkColor,
    marginVertical: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsView : {flexDirection : "row" , justifyContent : "space-around" , 
  alignItems : 'center' , height : 100 ,
   borderTopColor : "#ccc" , borderBottomColor : "#BBB" , borderWidth : 0.5},
   heading : {color : "grey" , fontSize : 14 ,  fontWeight : "bold" , margin : 4},
   number : {color : "#fff" , fontSize : 16 , textAlign : "center"},
   inputStyle : {  color : "#ccc", fontSize : 15},
   inputContainer : {backgroundColor : themeColor ,height : 60,borderBottomColor : "#444B60" , borderBottomWidth: 0.5,
},
})
export default Checkout
