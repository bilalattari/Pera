import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,TouchableOpacity,
    Text,ScrollView,ImageBackground,
    Image
} from 'react-native';
import {withNavigation} from 'react-navigation'
import { Dimensions,Platform , TimePickerAndroid, TextInput} from 'react-native';
import {DatePicker , Picker} from 'native-base';
import {themeColor, pinkColor} from '../Constant/index'
import ImagePicker from 'react-native-image-picker';
import { openDatabase } from 'react-native-sqlite-storage';
import CustomInput from '../Component/Input'
import CustomButton from '../Component/Button'
import Modal from "react-native-modal";
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

  const height = Dimensions.get('window').height
 class Measurment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        chosenDate : new Date(),
        time : '',
        isVisible : false,
        styleName : '',
        selected: "femaleMeasurment",
        uri : '',
        description : "",
        femaleMeasurment : {
            Height : "",
            Neck : "",
            UpperBust : "",
            Bust : '',
            Shoulder_to_Nipple: '',
            Bra_Size: '',
            Under_Bust: '',
            Waist  : '',
            High_Hip : '',
            Hip: '',
            Buttocks: '',
            Shoulder_Width: '',
            Bicep: '',
            Wrist: '',
            Inside_Arm: '',
            Knuckle: '',
            Top_Thigh: '',
            Crotch_Floor: '',
            Buttock_Floor: '',
            Knee: '',
            Calf: '',
            Ankle: '',
            UnderBust_Waist: '',
            UnderBust_Crotch: '',
            UnderBust_Knee: '',
            UnderBust_Floor: '',
            Nape_Crotch: '',
            Nape_to_Crotch_to_Neck: '',
            Shoe_Size: '',
            
        },
        maleMeasurment : {
            Neck : '',
    	    Chest_Upper: '',
    	    Waist: '',
    	    Hip: '',
    	    Top_Thigh: '',
    	    Knee: '',
    	    Calf_at_Widest: '',
    	    Bicep: '',
    	    Wrist: '',
    	    Shoulder_to_Shoulder: '',
    	    Crotch: '',
    	    Knee_to_Ankle: '',
    	    Neck_to_Shoulder: '',
    	    Shoulder_to_Elbow: '',
    	    Elbow_to_Wrist: '',
    	    Outer_Thigh: '',
    	    Waist_to_Knee: '',
        }
    }
    this.inputRef = [];
    
  }
componentWillMount = ()=>{
  let measurments = this.props.navigation.getParam("data")
  console.log(measurments , 'measurmentsmeasurments')
}

onChangeMeasurment = (type , name , text)=>{
  console.log( Object.keys(this.state.femaleMeasurment)[2])
  let measurment = this.state[type]
  measurment[name] = text
  this.setState({[type  ] :measurment})
}
showImagePicker = ()=>{
  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.uri };
      this.setState({uri : response.uri})
    }
  });
}
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  static navigationOptions = {
    header: null
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  onSubmit = async ()=>{
    let allClients = await AsyncStorage.getItem('Clients')
    let {uri , styleName , selected  , description}  = this.state
    let measurment = this.state[selected]
    let userInfo = this.props.navigation.getParam("data")
    userInfo.styleName = styleName
    userInfo.image = uri
    userInfo.submitDate = new Date()
    userInfo.description = description
    userInfo.gender = selected === 'femaleMeasurment' ? "Female" : "Male"
    userInfo.measurment = measurment
    if(allClients !== null){
      let clients =  JSON.parse(allClients)
      clients.push(userInfo)
      await AsyncStorage.setItem('Clients' ,JSON.stringify(clients)  )
      this.props.navigation.navigate('Home')
    }
    else{
      let clients =  []
      clients.push(userInfo)
      console.log(clients , 'clients')
      await AsyncStorage.setItem('Clients' ,JSON.stringify(clients) )
      this.props.navigation.navigate('Home')
    }
  }

    render() {
      let {index , state ,isVisible , time ,selected, femaleMeasurment ,maleMeasurment , uri } = this.state
      const {navigation} = this.props
      let that = this
        return (
            <ScrollView style = {{flex : 1 , backgroundColor : '#F1F0F2'}}>
                <View style = {styles.topHeader}>
                <Modal isVisible = {this.state.isVisible}
                onBackButtonPress = {()=> this.setState({isVisible : false})}
                onBackdropPress={() => this.setState({ isVisible: false })}
                >
                   <View style={{ height : height/1.2 , width : "100%" }}>
                     <Image 
                     style = {{flex : 1 , resizeMode : "stretch"}}
                     source = {{uri : this.state.selected === 'femaleMeasurment' ? "https://xorek.com.ng/measurementbook/women-guide.jpg" : "https://xorek.com.ng/measurementbook/men-guide.jpg"}} />
                     </View>
                      </Modal>
                    <View style = {styles.header}>
                        <TouchableOpacity
                        onPress = {()=>this.props.navigation.navigate("AddClient")}
                        style = {styles.leftArrowView}>
                        <Icon type = {'antdesign'} color = {'#fff'} 
                  name = {'arrowleft'}  size = {20} containerStyle = {{marginRight : 4}}/>
                            <Text style = {styles.leftArrow}>personal data</Text>
                        </TouchableOpacity>
                        <View style = {styles.centerView}>
                            <Text style = {styles.centerHeading}>Measurment Data</Text>
                        </View>
                        <View style = {{flex : 1 }}>
                            <Text style = {{color : '#fff'}}></Text>
                        </View>
                        </View>
                </View>
                  <View style = {styles.bottomContainer}>
                    {
                      uri !== '' ?
                    <TouchableOpacity onPress = {this.showImagePicker}>
                      <Image source = {{uri : uri}} 
                      style = {{height : height/3.5 , backgroundColor : "#000" , 
                      justifyContent : 'center' , alignItems : "center"}} />
                      </TouchableOpacity>
                       : 
                      <View style = {{height : height/3.5 , backgroundColor : "#EBEBEB" , 
                      justifyContent : 'center' , alignItems : "center"}}>
                          <View>
                              <Icon type = {"material-community"}
                               name = {"account"} color = {'#fff'} 
                               size = {height/5} />
                               <TouchableOpacity 
                               onPress = {this.showImagePicker}
                               style = {styles.iconView}>
                                    <Icon type = {"antdesign"}
                               name = {"plus"} color = {'#fff'} 
                               size = {height/30} />
                                   </TouchableOpacity>
                              </View>
                          </View>
                    }

                      <CustomInput placeholder = {'Name Of Style'} textChange = {(text)=> this.setState({styleName : text})}  />
                      <View style = {styles.datePicker}>
                      <Picker
              note
              mode="dropdown"
              style={{ width: '100%' }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
              >
              <Picker.Item label="Female Measurments" value="femaleMeasurment" />
              <Picker.Item label="Male Measurments" value="maleMeasurment" />
            </Picker>
                          </View>

                          <TouchableOpacity 
                          onPress = {()=> this.setState({isVisible : true})}
                          style = {{height : 40 , justifyContent : "center" ,
                           alignItems : "flex-end" , marginRight : 12 }}>
                                   <Text style = {{color : themeColor}}>{this.state.selected === 'femaleMeasurment' ? "Show Female Guide" : "Show Male Guide"}</Text>
                          </TouchableOpacity>
                      <View style = {{flexDirection : "row" , flexWrap : 'wrap' , justifyContent : 'center' }}>
                      { 
                      selected === 'femaleMeasurment' ? 
                      
Object.keys(femaleMeasurment).map((name , index)=>
<View key = {index} style = {styles.inputView}>
  <TextInput 
  keyboardType = {'number-pad'}
  style = {styles.input} 
  ref={(ref) => this.inputRef[name] = ref}
  onSubmitEditing = {()=> Object.keys(femaleMeasurment)[index + 1] ?  this.inputRef[Object.keys(femaleMeasurment)[index + 1]].focus() : null}
  onChangeText = {(text) => this.onChangeMeasurment('femaleMeasurment' ,name ,text  )}/>
  <Text style = {styles.inputText}>{name}</Text>
</View>)
                        

                        
                       :
                          Object.keys(maleMeasurment).map((name , index)=>
                          <View key = {index} style = {styles.inputView}>
                            <TextInput 
                            keyboardType = {'number-pad'}
                            style = {styles.input}
                            ref={(ref) => this.inputRef[name] = ref}
                            onSubmitEditing = {()=> Object.keys(maleMeasurment)[index + 1] ?  this.inputRef[Object.keys(maleMeasurment)[index + 1]].focus() : null}
                            onChangeText = {(text) => this.onChangeMeasurment('maleMeasurment' ,name ,text  )}
                            />
                            <Text style = {styles.inputText}>{name}</Text>
                          </View>
                          )
                      }
                          </View>
                          <TextInput multiline = {true} 
                        numberOfLines ={3} 
                        underlineColorAndroid = {themeColor}
                        placeholder ={'Note'}
                        style = {{color : "#000" , fontSize : 16  , padding : 8 , margin : 3}}
                        onChangeText = {(text)=> this.setState({description : text})}
                        />
                      </View> 
                          <CustomButton title = {'SUBMIT'} 
                           onPress = {()=>this.onSubmit()}
                           containerStyle = {{width : '80%' ,marginVertical : 12}} /> 
                </ScrollView>
        );
      }   
    }   
    
    const styles = StyleSheet.create({
      container : {
        flex : 1,
      },
      inputText : {fontSize : 12 , fontWeight : "bold" , paddingHorizontal :4 ,
       paddingTop : 2, color : '#000' , textAlign : 'center' },
      input : {height : 40 , width : 40 , backgroundColor : '#fff' , 
      alignItems : "center" , fontSize : 18 , paddingLeft : 5},
      inputView : {minHeight : 90 , width : 90 , margin : 5, marginVertical : 6,
        backgroundColor : '#EBEBEB' , justifyContent : 'center' , alignItems : 'center'},
      iconView : {height : height/17 , width : height/17 , borderRadius : 125,
        backgroundColor : themeColor , position : "absolute" , 
        right :4 , bottom  : '15%' , 
        justifyContent : "center" , alignItems : "center" },
      centerHeading : {color : '#fff' , fontWeight : 'bold' , fontSize : 16},
      centerView : {flex : 1.5 , justifyContent: 'center',alignItems : 'center' },
      leftArrowView : {flex : 1 , flexDirection : "row"  ,
      alignItems: 'center' , paddingLeft : 12 },
      leftArrow : {color : '#fff' , fontWeight : 'bold' , 
      fontSize : 12},
      header : {height : 60 , flexDirection : 'row'},
      datePicker : {height : 45 , borderBottomColor : '#E5E5E5' , borderBottomWidth : 1 , width : '86%' ,
      alignSelf  : 'center' , marginVertical : 6},
      topHeader : {height : 160 , backgroundColor : themeColor ,
        borderBottomLeftRadius : 72 },
        bottomContainer : {width : '88%' , backgroundColor : '#fff' , marginTop : -63 , 
        minHeight : 200 , alignSelf : "center" , borderRadius : 25 , overflow : 'hidden'}
    })
    export default withNavigation(Measurment)
