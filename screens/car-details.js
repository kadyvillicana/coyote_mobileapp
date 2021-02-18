import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from '../components/custom-text';
import CustomView from '../components/custom-view';
import { useTheme } from '@react-navigation/native';
import currencyFormat from '../utils';
import Moment from 'moment';

const CarDetailsScreen = ({route}) => {
  const {colors} = useTheme();
  const {car} = route.params;

  parseStatus = (status) => {
    switch(status){
      case 'available':
        return 'Disponible'
      case 'sold':
        return 'de contado'
      case 'soldCredit':
        return 'a crédito'
    }
  }

  const debt = car.soldPrice - car.paymentsSum;
  const lastPaymentDate = car.status === 'soldCredit' ? Moment(car.lastPaymentDate) : Moment().startOf('day');
  const today =  Moment().startOf('day');
  const daysDiff = lastPaymentDate.diff(today, 'days', false) * -1;

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
          <View style={[styles.detailContainer, {borderLeftWidth:0, borderTopWidth: 0, borderColor: colors.border} ]}>
            <CustomText fontSize='small' secondaryColor>Fecha de Compra</CustomText>
            <CustomText>{Moment(car.purchaseDate).format('DD MMM')}</CustomText>
          </View>
          <View style={[styles.detailContainer, {borderLeftWidth:0, borderTopWidth: 0, borderRightWidth:0, borderColor: colors.border} ]}>
            <CustomText fontSize='small' secondaryColor>Kilometraje</CustomText>
            <CustomText>{car.miles}</CustomText>
          </View>
        </View>
      </View>
      {/* Display if car is sold */}
      {
        car.status !== 'available' ?
        <View style={{marginTop: 15}}>
          <CustomText fontSize='medium' fontType='bold' style={{paddingLeft: 15}}>
            {'Vehículo vendido '+ parseStatus(car.status)}
          </CustomText>
          <View style={{backgroundColor: colors.backgroundVariant, marginTop: 15}}>
            <View style={{flexDirection:'row'}}>
              <View style={[styles.detailContainer, {borderLeftWidth:0, borderColor: colors.border} ]}>
                <CustomText fontSize='small' secondaryColor>Utilidad</CustomText>
                <CustomText>{currencyFormat(car.soldPrice - car.purchasePricePlusOutgoings)}</CustomText>
              </View>
              <View style={[styles.detailContainer, {borderLeftWidth:0, borderColor: colors.border} ]}>
                <CustomText fontSize='small' secondaryColor>Vendida en</CustomText>
                <CustomText>{currencyFormat(car.soldPrice)}</CustomText>
              </View>
              <View style={[styles.detailContainer, {borderLeftWidth:0, borderRightWidth:0, borderColor: colors.border} ]}>
                <CustomText fontSize='small' secondaryColor>Fecha de venta</CustomText>
                <CustomText>{Moment(car.soldDate).format('DD MMM')}</CustomText>
              </View>
            </View>
          </View> 
        </View>
          : null
      }
      {/* Display if car is sold credit */}
      {
        car.status === 'soldCredit' ?
        <View>
          {
            car.paymentsSum === 0 ?
            <View style={{padding: 15}}>
              <CustomText fontSize='medium' fontType='bold' style={[{color: colors.error}]}>
                Aún no han hecho ningun pago
              </CustomText>
            </View>
            :
            car.soldPrice === car.paymentsSum ? 
              <View style={{padding: 15}}>
                  <CustomText fontSize='medium' fontType='bold' style={[{color: colors.green}]}>
                     El vehículo ha sido pagado el día {Moment(lastPaymentDate).format('DD MMM YYYY')}
                  </CustomText>
              </View>
              :
              <View>
                <CustomText fontType='light' style={[{color: colors.text}]}>
                    Han pasado {daysDiff} días desde el ultimo pago y aun se deben 
                    <CustomText fontType='bold' style={[styles.carDetails, 
                        {color: theme.colors.text},
                        debt <= car.soldPrice ? {color: colors.error} : {color: colors.green}]}> {currencyFormat(debt)} </CustomText>
                    del vehículo
                </CustomText>
              </View>
          }
        </View>
        : null
      }

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