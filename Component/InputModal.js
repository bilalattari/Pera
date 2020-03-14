/* eslint-disable */

import React, {useState} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const {height, width} = Dimensions.get('window');
const InputModal = props => {
  const [input, setInput] = useState('');

  const {
    title = '',
    description = '',
    submitText = '',
    cancelText = '',
    visible = false,
    onCancel = () => {},
    onSubmit = () => {},
    modalContainerStyle = '',
    titleStyle = '',
    descriptionStyle = '',
    inputStyle = '',
    cancelButtonStyle = '',
    submitButtonStyle = '',
  } = props;

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.mainContainer}>
        <View style={[styles.modalContainer, modalContainerStyle]}>
          <View style={styles.modalMiniContainer}>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            <Text style={[styles.description, descriptionStyle]}>
              {description}
            </Text>
            <TextInput
              style={[styles.input, inputStyle]}
              {...props}
              onChangeText={text => setInput(text)}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => onCancel()}>
              <Text style={[styles.cancelButton, cancelButtonStyle]}>
                {cancelText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSubmit(input)}>
              <Text style={[styles.submitButton, submitButtonStyle]}>
                {submitText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InputModal;

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '85%',
    height: '30%',
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
  },
  modalMiniContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    width: '90%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  description: {
    marginTop: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  cancelButton: {
    fontSize: 16,
    marginRight: 15,
  },
  submitButton: {
    fontSize: 16,
  },
});
