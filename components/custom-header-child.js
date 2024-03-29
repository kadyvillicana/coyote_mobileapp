import React from 'react';
import { View, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import CustomText from './custom-text';

const CustomHeaderChild = ({title, onPressRightButton}) => {
  const {colors} = useTheme();
  const paddingTopByPlatform = Platform.OS === 'ios' ? 75 : 35;

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
        {
          onPressRightButton ?  
            <View style={{alignContent:'center', justifyContent:'center', flex: 1}}>
              <IconButton
                icon="pencil"
                color={colors.backgroundColor}
                size={20}
                onPress={onPressRightButton}
              />
            </View>
          : null
        }
      </View>
    </View>
  )
}

export default CustomHeaderChild;