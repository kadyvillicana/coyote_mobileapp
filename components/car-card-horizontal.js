import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import CustomText from './custom-text';
import currencyFormat from '../utils/currencyFormat';

const CarCardHorizontal = ({item}) => {
  const { colors } = useTheme();
  return (
    <View style={
      {
        backgroundColor: colors.backgroundVariant, 
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10, 
        padding: 15, width: 280, marginRight: 15
      }
    }>
      <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
          <View>
              <CustomText
                  fontType='bold'>
                      {item.make + ' ' + item.version + ' ' + item.model}
              </CustomText>
          </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 1}}>
              <CustomText
                secondaryColor
                fontSize='small'
                  fontType='light'>Costo total</CustomText>
              <CustomText>{currencyFormat(item.purchasePricePlusOutgoings)}</CustomText>
          </View>
          <View style={{flex: 1}}>
              <CustomText
                secondaryColor
                fontSize='small'
                  fontType='light'>Precio suguerido</CustomText>
              <CustomText>{currencyFormat(item.salePrice)}</CustomText>
          </View>
      </View>
    </View>
  );
}

export default CarCardHorizontal;