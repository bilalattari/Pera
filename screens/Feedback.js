import React, { Fragment } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  ScrollView
} from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'
import CustomInput from '../Component/Input'
import CustomButton from '../Component/Button'
import CustomHeader from '../Component/header'
import { SwipeListView } from 'react-native-swipe-list-view'

import { themeColor, pinkColor } from '../Constant'
class Feedback extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: false
    }
  }
  static navigationOptions = {
    header: null
  }

  swipListItem = (item, index) => (
    <View
      style={[
        styles.itemContainer,
        {
          flexDirection: 'column',
          minHeight: 110,
          alignItems: 'flex-start',
          width: '95%',
          justifyContent: 'space-around'
        }
      ]}
    >
      <View style={{ flexDirection: 'row', padding: 6, alignItems: 'center' }}>
        <Image
          source={require('../assets/avatar.png')}
          style={styles.imageStyle}
        />
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
          Jesicca DOE
        </Text>
      </View>
      <Text style={{ color: '#ccc', marginHorizontal: 25 }}>
        Lorun Ispem Lorun Ispem Lorun Ispem Lorun Ispem Lorun Ispem Lorun Ispem
      </Text>
    </View>
  )

  feedBackListItem = (item , index) =><View style={styles.itemContainer}>
  <View>
    <Image
      source={require('../assets/avatar.png')}
      style={styles.imageStyle}
    />
    <Icon
      type={'font-awesome'}
      name={index % 2 !== 1 ? 'heart-o' : 'user-plus'}
      color={'#fff'}
      size={10}
      containerStyle={[
        styles.iconContainer,
        {
          backgroundColor:
            index % 2 !== 1 ? pinkColor : '#72CEBA'
        }
      ]}
    />
  </View>
  <View>
    <Text
      style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}
    >
      {' '}
      Ivan Morris{' '}
      <Text
        style={{ fontWeight: '400', color: '#ccc', fontSize: 12 }}
      >
        {' '}
        added you to friends
      </Text>
    </Text>
    <Text style={{ color: '#ccc', fontSize: 12 }}>
      {' '}
      4 Hrs ago
    </Text>
  </View>
</View>
  render () {
    const { navigation } = this.props
    let { comments } = this.state
    return (
      <View style={{ backgroundColor: '#323643', flex: 1 }}>
        <CustomHeader home title={comments ? 'Comments' : 'Feedback'} />
        <SearchBar
          containerStyle={{
            margin: 8,
            borderRadius: 5,
            borderTopColor: themeColor,
            borderBottomColor: themeColor
          }}
          placeholder={'Search'}
          inputContainerStyle={{ backgroundColor: '#fff' }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 12
          }}
        >
          <CustomButton
            onPress={() => this.setState({ comments: true })}
            buttonStyle={styles.commentButton}
            title={'Comments'}
            backgroundColor={comments ? pinkColor : themeColor}
          />
          <CustomButton
            onPress={() => this.setState({ comments: false })}
            buttonStyle={styles.commentButton}
            backgroundColor={!comments ? pinkColor : themeColor}
            title={'Feedback'}
          />
        </View>

        {comments ? (
          <SwipeListView
            data={['1', '2', '3', '4', '5', '6', '7']}
            renderItem={(data, rowMap) => this.swipListItem(data, rowMap)}
            renderHiddenItem={(data, rowMap) => (
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 20,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <TouchableOpacity style={styles.arrowButton}>
                  <Icon type={'font-awesome'} name={'reply'} color={'#fff'} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe
            leftOpenValue={0}
            rightOpenValue={-75}
          />
        ) : (
          <FlatList
            data={['1', '2', '3', '4', '5', '6', '7']}
            keyExtractor={item => item}
            renderItem={({ item, index }) => this.feedBackListItem(item , index)}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageStyle: {
    height: 45,
    width: 45,
    borderRadius: 125,
    marginHorizontal: 12,
    resizeMode: 'contain'
  },
  itemContainer: {
    minHeight: 80,
    backgroundColor: '#444B60',
    flexDirection: 'row',
    marginHorizontal: 12,
    borderRadius: 12,
    marginVertical: 4,
    alignItems: 'center'
  },
  iconContainer: {
    height: 18,
    width: 18,
    backgroundColor: pinkColor,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -12,
    marginLeft: 8
  },
  commentButton: { borderColor: pinkColor, borderWidth: 1, width: 150 },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  arrowButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: pinkColor,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default Feedback
