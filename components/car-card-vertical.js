import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import CustomText from './custom-text';
import currencyFormat from '../utils';

const CarCardVertical = ({
  title,
  subTitleLeft,
  subTitleTextLeft,
  subTitleTextRight,
  subTitleRight,
}) => {
  const { colors } = useTheme();
  return (
    <View style={
      {
        backgroundColor: colors.backgroundVariant, 
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
      }
    }>
      <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
          <View>
              <CustomText
                  fontType='bold'>
                      {title ? title : ''}
              </CustomText>
          </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 1}}>
              <CustomText
                secondaryColor
                fontSize='small'
                  fontType='light'>{subTitleLeft ? subTitleLeft : ''}</CustomText>
              <CustomText>{subTitleTextLeft ? subTitleTextLeft : ''}</CustomText>
          </View>
          <View style={{flex: 1}}>
              <CustomText
                secondaryColor
                fontSize='small'
                  fontType='light'>{subTitleRight ? subTitleRight : ''}</CustomText>
              <CustomText>{subTitleTextRight ? subTitleTextRight : ''}</CustomText>
          </View>
      </View>
    </View>
  );
}

export default CarCardVertical;