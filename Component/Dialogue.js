/* eslint-disable */

import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Dialog from "react-native-dialog";


export default class Dialogue extends Component {    
      render() {
          const { handleOk, handleCancel, dialogVisible, title, description, okButtonLabel } = this.props
        return (
          <View>
            <Dialog.Container visible={dialogVisible}>
            <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Description>
                {description}
              </Dialog.Description>
              <Dialog.Button label="Cancel" onPress={()=> handleCancel()} />
              <Dialog.Button label={okButtonLabel} onPress={()=> handleOk()} />
            </Dialog.Container>
          </View>        )
    }
}
