import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import CustomText from './custom-text';

const CustomHeader = ({header, subHeader}) => {
  const paddingTopByPlatform = Platform.OS === 'ios' ? 30 : 10
  const paddingBottomByPlatform = Platform.OS === 'ios' ? 30 : 20
  return (
  <View style={[styles.headerContainer],{paddingTop: paddingTopByPlatform, paddingBottom: paddingBottomByPlatform}}>
    <View>
      <CustomText fontSize='big' fontType='bold'>{header}</CustomText>
      <View style={{marginTop: 15}}>
        <CustomText
          secondaryColor 
          fontSize='regular'>{subHeader}</CustomText>
      </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
  },
})


export default CustomHeader;