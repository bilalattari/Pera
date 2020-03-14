/* eslint-disable */

import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'

class ChartContainer extends Component {
    render() {
        const { data, removeFromCart } = this.props
        return (
            <View style={styles.container}>
                {/* <View style={[{ flexDirection: 'row', flex: 1 }, styles.cartImage]}>
                    <Image
                        source={{uri: data.imageUrl}}
                        style={styles.imageStyle}
                    />
                    <View>
                        <Text style={{ paddingTop: 4, color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                            {data.productName}
                        </Text>
                        <Text style={styles.descriptionText}>
                            {data.discription}
                        </Text>
                    </View>
                    <Text style={[styles.descriptionText, { paddingTop: 4, }]}>{`$ ${data.price}`}</Text>
                </View> */}
                <View style={styles.detailContainer}>
                    <Image
                        source={{ uri: data.imageUrl }}
                        style={styles.imageStyle}
                    />
                    <View style={styles.flexColumn}>
                        <View style={styles.miniContainer}>
                            <Text style={[styles.colorWhite]}>
                                {data.productName}
                            </Text>
                            <Text style={[styles.colorWhite, styles.price]}>{`$ ${data.price}`}</Text>
                            <TouchableOpacity style={styles.closeIconBox} onPress={() => removeFromCart(data)}>
                                <Image source={require('../assets/close.png')} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.colorWhite]} >
                            {data.discription}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}
export default ChartContainer

const styles = StyleSheet.create({
    // container: {
    //   flex: 1
    // },
    // title : { flexDirection: 'row', paddingHorizontal: 6, alignItems: 'center' },
    // imageStyle: {
    //   height: 111,
    //   width: 111,
    //   borderRadius: 12    ,
    //   marginHorizontal: 12,
    //   resizeMode: 'contain'
    // },
    // cartImage : { height : 150},
    // descriptionText : { color: '#fff', fontSize: 13 , color : 'grey', flexWrap: 'wrap'},
    // listHeading : {paddingLeft: 18 , fontSize : 16 , color : '#fff' ,
    // fontWeight : 'bold' , marginVertical: 12,},
    // input : {height : 45 , backgroundColor : '#fff' , borderRadius  : 5 , paddingLeft : 6},
    // inputView : {flexDirection : 'row' , justifyContent : 'space-around' , marginVertical : 5 },
    // borderButton : {borderColor : '#ccc' , borderWidth:  1, height : 40 },
    // borderBottom : {borderBottomColor : '#454545' , borderBottomWidth : 8 , paddingBottom : 25},
    // imageBtn : {height : 40 , width : 40 , backgroundColor :'#fff' , borderRadius : 25  ,
    // justifyContent : 'center'  , alignItems : 'center' },
    // productName : {margin: 12, color : '#fff' , fontSize : 28 , fontWeight : 'bold'},
    container: {
        paddingHorizontal: 10,
        marginVertical: 15
    },
    detailContainer: {
        flexDirection: 'row',
    },
    imageStyle: {
        width: 120,
        height: 120
    },
    miniContainer: {
        flexDirection: 'row',
        flex:0.3,
    },
    colorWhite: {
        color: '#fff'
    },
    flexColumn: {
        flexDirection: 'column',
        flex: 1,
        marginLeft: 10
    },
    price:{
        marginLeft: 20
    },
    closeIconBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    closeIcon: {
        width: 14,
        height: 14
    }
})
