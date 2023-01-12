import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { CustomHeaderChild } from '../components';

const SoldByScreen = ({route, navigation}) => {

	// const carId = route.params.carId;

  return(
    <View>
      <CustomHeaderChild
			title='¿Quién te lo vendió?'
			customPadding={35}
      />
    </View>
  )
};

export default SoldByScreen;