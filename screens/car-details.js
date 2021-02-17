import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from '../components/custom-text';
import CustomView from '../components/custom-view';
import { useTheme } from '@react-navigation/native';
import currencyFormat from '../utils/currencyFormat';
import Moment from 'moment';

const CarDetailsScreen = ({route}) => {
  const {colors} = useTheme();
  const {car} = route.params;

  parseStatus = (status) => {
    switch(status){
      case 'available':
        return 'Disponible'
      case 'sold':
        return 'Vendido'
      case 'soldCredit':
        return 'Crédito'
    }
  }

  return(
    <View>
      <View style={{backgroundColor: colors.primary, paddingTop: 85}}>
        <CustomText
          style={{color: colors.black, padding: 15}}
          fontSize='big' fontType='bold'>
          {car.make + ' ' + car.version + ' ' + car.model}
        </CustomText>
      </View>
      {/* Container Car Details */}
      <View style={{backgroundColor: colors.backgroundVariant}}>
        <View style={[styles.detailContainer, {borderWidth:0, flex: 0} ]}>
          <CustomText fontSize='small' secondaryColor>Costo Total</CustomText>
          <CustomText>{currencyFormat(car.purchasePricePlusOutgoings)}</CustomText>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={[styles.detailContainer, {borderLeftWidth:0, borderColor: colors.border} ]}>
            <CustomText fontSize='small' secondaryColor>Total de gastos</CustomText>
            <CustomText>{currencyFormat(car.outgoingsSum, 'Sin gastos')}</CustomText>
          </View>
          <View style={[styles.detailContainer, {borderLeftWidth:0, borderRightWidth:0, borderColor: colors.border} ]}>
            <CustomText fontSize='small' secondaryColor>Precio de Compra</CustomText>
            <CustomText>{currencyFormat(car.purchasePrice)}</CustomText>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={[styles.detailContainer, {borderLeftWidth:0, borderColor: colors.border} ]}>
            <CustomText fontSize='small' secondaryColor>Fecha de Compra</CustomText>
            <CustomText>{Moment(car.purchaseDate).format('DD MMM')}</CustomText>
          </View>
          <View style={[styles.detailContainer, {borderLeftWidth:0, borderRightWidth:0, borderColor: colors.border} ]}>
            <CustomText fontSize='small' secondaryColor>Kilometraje</CustomText>
            <CustomText>{car.miles}</CustomText>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  detailContainer:{
    padding: 15,
    flex:1,
    borderWidth: 1,
  }
})

export default CarDetailsScreen;