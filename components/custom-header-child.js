import React from 'react';
import { View } from 'react-native';
import { CustomText } from '../components';
import { useTheme } from '@react-navigation/native';

const CustomHeaderChild = ({title}) => {
  const {colors} = useTheme();
  return(
    <View>
      <View style={{backgroundColor: colors.primary, paddingTop: 85}}>
        <CustomText
          style={{color: colors.black, padding: 15}}
          fontSize='big' fontType='bold'>
          {title}
        </CustomText>
      </View>
    </View>
  )
}

export default CustomHeaderChild;