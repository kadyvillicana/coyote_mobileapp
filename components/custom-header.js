import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from './custom-text';

const CustomHeader = ({header, subHeader}) => {
  return (
  <View style={[styles.headerContainer]}>
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
    paddingTop: 30,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 30,
    flexDirection: 'row',
},
})


export default CustomHeader;