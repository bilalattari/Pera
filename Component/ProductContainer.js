/* eslint-disable */

import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
let width = Dimensions.get('screen').width
class ProductContainer extends Component {
  render() {
    const { data, navigate, userObj } = this.props;
    return (
      userObj.userId !== data.userId && (
        <TouchableOpacity onPress={navigate}>
          <View style={styles.productMainContainer}>
            <Image
              source={{ uri: data.imageUrl }}
              style={{
                width: width / 2.2, height: width / 2.2, alignSelf: "center",
                resizeMode: 'contain', borderRadius: 7 ,
              }}
            />
            <View style={styles.prodcutDetailContainer}>
              <Text style={styles.productName}>{data.productName}</Text>
              <Text style={styles.productPrice}>{data.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    );
  }
}

const styles = StyleSheet.create({
  productMainContainer: {
    marginVertical: 14,
  },
  prodcutDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8, 
  },
  productName: {
    fontSize: 16,
    color: '#ffffff',
    flex: 0.9,
    flexWrap: 'wrap-reverse',
  },
  productPrice: {
    fontSize: 16,
    color: '#ffffff',
  },
});

const mapDispatchToProps = dispatch => {
  return {};
};
const mapStateToProps = state => {
  return {
    userObj: state.auth.user,
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(ProductContainer),
);
