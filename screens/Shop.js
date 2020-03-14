/* eslint-disable */

import React, { Component } from 'react'
import { Text, View, ScrollView, Image, AsyncStorage } from 'react-native'
import firebase from 'react-native-firebase'

import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import ProductContainer from '../Component/ProductContainer'


class Shop extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        products: [],
        isProducts: false
    }
     componentDidMount() {
        const db = firebase.firestore()
         db.collection('Products').orderBy('createdAt').onSnapshot(snapShot => {
            snapShot.docChanges.forEach((change) => {
              if (change.type === "added") {
                const { products } = this.state
                if(!change.doc.data().deleted){
                    products.unshift({ id: change.doc.id, ...change.doc.data() })
                    this.setState({ products: [...products], isProducts: true })
                }
      
              }
              if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
              }
              if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
              }
            })
            // console.log('snapShot ====>' , snapShot);
      
          })  
    }    
    render() {
        const { navigation } = this.props
        const { products } = this.state
        return (
            <ScrollView stickyHeaderIndices={[0]} style={{ backgroundColor: '#323643', flex: 1 }}>
                <CustomHeader title={'SHOP'} navigation={navigation} shop />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, flexWrap: 'wrap' }}>
                    {/* <View>
                        <Image source={require('../assets/avatar.png')} style={{width: 135, height: 135}} />
                        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                            <Text>Product</Text>
                            <Text>200</Text>
                        </View>
                    </View> */}
                    {products.map(val => 
                        <ProductContainer data={val} navigate={()=> navigation.navigate('Detail' , {data: val})} />
                    )}
                </View>
            </ScrollView>
        )
    }
}

export default Shop