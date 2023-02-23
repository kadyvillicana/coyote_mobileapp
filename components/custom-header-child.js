import React from 'react';
import { View, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import CustomText from './custom-text';

const CustomHeaderChild = ({title, customPadding}) => {
  const {colors} = useTheme();
  var paddingTopByPlatform = Platform.OS === 'ios' ? 75 : 35;
  paddingTopByPlatform = customPadding ? customPadding : paddingTopByPlatform;

  return(
    <View>
      <View style={{backgroundColor: colors.primary, paddingTop: paddingTopByPlatform, flexDirection:'row'}}>
        <View style={{flex: 6}}>
          <CustomText
            numberOfLines={1}
            style={{color: colors.black, padding: 15}}
            fontSize='big' fontType='bold'>
            {title}
          </CustomText>
        </View>
      </View>
    </View>
  )
}

export default CustomHeaderChild;