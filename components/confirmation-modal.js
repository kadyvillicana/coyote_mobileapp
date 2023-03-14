import React from 'react';
import { View } from 'react-native';
import {Modal} from 'react-native-paper';
import CustomButton from './custom-button';
import CustomText from './custom-text';

const ConfirmationModal = (props) => {
  const {title, dismissText, successText, onDismiss, onSuccess, childComponent} = props;
  const containerStyle = {
    margin: 15,
    padding: 15, 
  };
  return(
    <Modal
    {...props}
    contentContainerStyle={containerStyle}
    >
      <View style={{justifyContent: 'center', backgroundColor: '#1b1f23', padding: 15}}>
        <View style={{alignItems:'center'}}>
          <CustomText
            fontSize='medium'
            fontType='bold'>
            {title}
          </CustomText>
        {childComponent}
        </View>
        <View style={{flexDirection: 'row', justifyContent:'space-around', marginTop: 15}}>
          <CustomButton
            onPress={() => onDismiss()}
            warningColor
            style={{padding: 7}}>
            {dismissText ? dismissText : 'cancelar'}
          </CustomButton>
          <CustomButton 
            onPress={() => onSuccess()}
            style={{padding: 7}}>
            {successText ? successText : 'si'}
          </CustomButton>
        </View>
      </View>
    </Modal>
  )
}

export default ConfirmationModal;