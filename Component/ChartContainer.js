/* eslint-disable */

import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Text from './Text'
import { Icon } from 'react-native-elements'
class ChartContainer extends Component {
    render() {
        const { data, removeFromCart } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.detailContainer}>
                    <Image
                        source={{ uri: data.imageUrl }}
                        style={styles.imageStyle}
                    />
                    <View style={styles.flexColumn}>
                        <View style={styles.miniContainer}>
                            <Text text={data.productName} font={18} bold={true} />
                            <Text text={`$${data.price}`} color={'#ccc'} />
                        </View>
                        <Text text={data.discription} align={'left'} color={'#ccc'} style = {{flex : 1}} />
                        <TouchableOpacity style={styles.closeIconBox} onPress={() => removeFromCart(data)}>
                            <Icon type = {'antdesign'} name = {'delete'} color = {'red'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
export default ChartContainer

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginVertical: 15
    },
    detailContainer: {
        flexDirection: 'row',
    },
    imageStyle: {
        width: 130,
        height: 130,
        borderRadius: 12
    },
    miniContainer: {
        flexDirection: 'row',
        // flex: 0.3,
        height: 30,
        marginRight: 6,
        justifyContent: "space-between"
    },
    colorWhite: {
        color: '#fff'
    },
    flexColumn: {
        flexDirection: 'column',
        flex: 1,
        marginLeft: 10
    },
    price: {
        marginLeft: 20
    },
    closeIconBox: {
        height : 30,       
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    closeIcon: {
        width: 20,
        height: 20
    }
})
