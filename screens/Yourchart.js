/* eslint-disable */

import React, { Fragment } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList, ImageBackground,
  ScrollView,
} from 'react-native'
import { SearchBar, Icon, Input } from 'react-native-elements'
import Text from '../Component/Text'
import Button from '../Component/Button'
import CustomHeader from '../Component/header'
import { SwipeListView } from 'react-native-swipe-list-view'
import HorizontalList from '../Component/HorizontalList'
import { themeColor, pinkColor } from '../Constant'
import ChartContainer from '../Component/ChartContainer'
import { connect } from 'react-redux'
import { addToChart } from '../redux/actions/chartActions'
import firebase from '../utils/firebase'


class Yourchart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      next: false,
      products: [],
    }
  }
  static navigationOptions = {
    header: null
  }

  async componentDidMount() {
    try {
      const products = await firebase.getCollection('Products')
      this.setState({ products });

    }
    catch (e) {
      alert(e.message)
    }
  }

  goforPay(amount) {
    this.props.navigation.navigate('ProductPay', { amount })
  }

  removeFromCart = (data) => {
    const { chart, addToChart } = this.props
    const findedIndex = chart.findIndex(item => item.id === data.id)
    chart.splice(findedIndex, 1)
    addToChart(chart)
  }
  render() {
    const { navigation, chart } = this.props
    const { products } = this.state
    let amount = 0
    chart.map(item => amount = item.price + amount)

    let { next } = this.state
    return (
      <ScrollView stickyHeaderIndices={[0]} style={{ backgroundColor: '#323643', flex: 1 }}>
        <CustomHeader navigation={navigation} title={'Your Cart'} />
        {!!chart.length ?
          chart.map(val => (
            <ChartContainer data={val} removeFromCart={this.removeFromCart} />
          ))
          :
          <View style={styles.cartContainer}>
            <Icon type={'material-community'} name={'cart-outline'}
              color={'#fff'}
              size={60} containerStyle={{ marginVertical: 15 }} />
            <Text text={"You Don't Have Any Item In Your Chart"} />
          </View>
        }
        {!!chart.length &&
        <Button title = {`Pay (${amount}$)`} 
        onPress={()=> this.goforPay(amount)} 
        backgroundColor = {pinkColor} 
        height = {45} width = {'90%'} />
          }
        <Text font={20} text={"Last Viewed"} bold={true}
          align={'left'}
          style={{ margin: 12, marginLeft: 12 }} />
        {/* <Text style={styles.listHeading}>Last Viewed</Text> */}
        {!!products.length && <HorizontalList productInfo={true} data={products} />}
        {/* <Text style={styles.listHeading}>Your Wish List</Text>
        <HorizontalList productInfo={true} /> */}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cartContainer: {
    height: 300, justifyContent: 'center', alignItems: "center", borderBottomColor: '#ccc',
    borderBottomWidth: 0.5, marginHorizontal: 12
  },
  title: { flexDirection: 'row', paddingHorizontal: 6, alignItems: 'center', justifyContent: 'space-between' },
  imageStyle: {
    height: 111,
    width: 111,
    borderRadius: 12,
    marginHorizontal: 12,
    resizeMode: 'contain'
  },
  cartImage: { justifyContent: 'center', alignItems: 'center', height: 150 },
  descriptionText: { color: '#fff', fontSize: 13, color: 'grey' },
  listHeading: {
    paddingLeft: 18, fontSize: 16, color: '#fff',
    fontWeight: 'bold', marginVertical: 12,
  },
  input: { height: 45, backgroundColor: '#fff', borderRadius: 5, paddingLeft: 6 },
  inputView: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 5 },
  borderButton: { borderColor: '#ccc', borderWidth: 1, height: 40 },
  borderBottom: { borderBottomColor: '#454545', borderBottomWidth: 8, paddingBottom: 25 },
  imageBtn: {
    height: 40, width: 40, backgroundColor: '#fff', borderRadius: 25,
    justifyContent: 'center', alignItems: 'center'
  },
  productName: { margin: 12, color: '#fff', fontSize: 28, fontWeight: 'bold' },
  btnContainer: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 12,
    backgroundColor: pinkColor,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    borderRadius: 100,
  },
  payText: {
    color: '#fff',
    marginRight: 10
  },
  amount: {
    color: '#fff'
  }
})
const mapDispatchToProps = (dispatch) => {
  return {
    addToChart: (data) => dispatch(addToChart(data))
  }
}
const mapStateToProps = (state) => {
  return { chart: state.chart.chart }
}

export default connect(mapStateToProps, mapDispatchToProps)(Yourchart)
