/* eslint-disable */

import React from 'react';
import {Button, Icon} from 'react-native-elements';
import {themeColor, pinkColor} from '../Constant/index';
import {FlatList, View, Text, StyleSheet, Image} from 'react-native';
export default HorizontalList = props => {
  const {data} = props;
  const renderRandomProducts = () => {
    const {data} = props;
    if (data) {
      const randomNumbers = [];
      data.map((item, i) => {
        if (randomNumbers.length === 5) return;
        const number = Math.floor(Math.random() * data.length);
        if (randomNumbers.indexOf(number) === -1) {
          randomNumbers.push(number);
        }
      });
      return randomNumbers;
    }
  };

  return (
    !!data && (
      <View>
        <FlatList
          data={renderRandomProducts()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View style={{marginHorizontal: 5}}>
              <Image
                source={{uri: data[item].imageUrl}}
                style={{
                  height: props.height ? props.height : 120,
                  width: props.height ? props.height : 120,
                  backgroundColor: '#fff',
                  borderRadius: 5,
                }}
              />
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 15,
                  margin: 2,
                }}>
                {data[item].productName}
              </Text>
              <Text style={{color: 'grey', fontSize: 12, margin: 2}}>
                {data[item].price}
              </Text>
            </View>
          )}
        />
      </View>
    )
  );
};
