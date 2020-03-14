/* eslint-disable */

import React, {Fragment} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Text,
  ScrollView,
} from 'react-native';
import {SearchBar, Icon, Input} from 'react-native-elements';
import CustomInput from '../Component/Input';
import CustomButton from '../Component/Button';
import CustomHeader from '../Component/header';
import {SwipeListView} from 'react-native-swipe-list-view';
import HorizontalList from '../Component/HorizontalList';
import {themeColor, pinkColor} from '../Constant';
import {connect} from 'react-redux';
import {addToChart} from '../redux/actions/chartActions';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      follow: false,
    };
  }
  static navigationOptions = {
    header: null,
  };

  textViews = (name, description) => (
    <View
      style={{
        minHeight: 80,
        justifyContent: 'space-around',
        padding: 12,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
      }}>
      <Text style={{fontSize: 18, fontWeight: 'bold', color: '#bbb'}}>
        {name}
      </Text>
      <Text style={{color: 'grey'}}>{description}</Text>
    </View>
  );

  addIntoChart(data) {
    const {addToChart, chart} = this.props;
    const findObj = chart.some(item => item.id === data.id);
    if (!findObj) {
      chart.push(data);
      addToChart(chart);
      alert('Added in chart');
      return;
    }
    alert('You have already added this item in your chart');
  }

  render() {
    const {navigation} = this.props;
    const {
      state: {
        params: {data},
      },
    } = navigation;
    let {follow} = this.state;
    return (
      <ScrollView
        stickyHeaderIndices={[0]}
        style={{backgroundColor: '#323643', flex: 1}}>
        <CustomHeader title={'DETAIL'} navigation={navigation} />
        <ImageBackground
          source={{uri: data.imageUrl}}
          style={{
            height: 250,
            width: '100%',
            backgroundColor: '#ccc',
            justifyContent: 'space-between',
          }}
          resizeMode="stretch">
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: 5,
              marginTop: 5,
            }}>
            {/* <TouchableOpacity style={styles.imageBtn}>
              <Icon type={'font-awesome'} name={'star-o'} color={'#000'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageBtn}>
              <Icon type={'feather'} name={'upload'} color={'#000'} />
            </TouchableOpacity> */}
          </View>
          <View>
            <Text style={styles.productName}>{data.productName}</Text>
          </View>
        </ImageBackground>
        <View style={[styles.borderBottom, {paddingTop: 8}]}>
          <View style={styles.inputView}>
            {/* <Input
              placeholder={'Select Color'}
              containerStyle={{width: '70%'}}
              inputContainerStyle={styles.input}
            /> */}
            <CustomButton
              title={`$ ${data.price}`}
              buttonStyle={styles.borderButton}
              containerStyle={{width: 100}}
              backgroundColor={this.state.follow ? pinkColor : themeColor}
            />
          </View>
          <CustomButton
            title={'Buy'}
            backgroundColor={pinkColor}
            containerStyle={[{width: '90%', marginTop: 12}]}
            onPress={() => this.addIntoChart(data)}
          />
        </View>
        <View style={{paddingVertical: 25}}>
          {this.textViews('Description', data.discription)}
          {this.textViews('Ships From', data.shipFrom)}
          {this.textViews('Deliver Info', data.deliverInfo)}
          <View
            style={{
              minHeight: 80,
              justifyContent: 'space-around',
              padding: 12,
              paddingBottom: 15,
              borderBottomColor: '#454545',
              borderBottomWidth: 8,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#bbb'}}>
              Return Policy
            </Text>
            <Text style={{color: 'grey'}}>{data.returnPolicy}</Text>
          </View>
          {/* <View style={styles.borderBottom}>
            <View style={[styles.title, {marginVertical: 15}]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../assets/avatar.png')}
                  style={styles.imageStyle}
                />
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                  Jesicca DOE
                </Text>
              </View>
              <CustomButton
                title={'Follow'}
                buttonStyle={styles.borderButton}
                containerStyle={{width: 120}}
                backgroundColor={this.state.follow ? pinkColor : themeColor}
              />
            </View>
            <HorizontalList />
          </View>
          <Text
            style={{
              paddingLeft: 18,
              fontSize: 16,
              color: '#fff',
              fontWeight: 'bold',
              marginVertical: 12,
            }}>
            OTHER PRODUCTS
          </Text>
          <HorizontalList height={140} productInfo={true} /> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: 45,
    width: 45,
    borderRadius: 125,
    marginHorizontal: 12,
    resizeMode: 'contain',
  },
  input: {height: 45, backgroundColor: '#fff', borderRadius: 5, paddingLeft: 6},
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  borderButton: {
    borderColor: '#000000',
    borderWidth: 1,
    height: 40,
    backgroundColor: '#000000',
  },
  borderBottom: {
    borderBottomColor: '#454b61',
    borderBottomWidth: 8,
    paddingBottom: 25,
  },
  imageBtn: {
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {margin: 12, color: '#fff', fontSize: 28, fontWeight: 'bold'},
});
const mapDispatchToProps = dispatch => {
  return {
    addToChart: data => dispatch(addToChart(data)),
  };
};
const mapStateToProps = state => {
  return {chart: state.chart.chart};
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
