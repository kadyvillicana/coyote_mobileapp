import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Portal, Provider, FAB } from 'react-native-paper';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import currencyFormat from '../utils';
import Moment from 'moment';
import { CustomHeaderChild, CustomText} from '../components';
import { carActions } from '../data';

const CarDetailsScreen = ({route, navigation}) => {
  const {colors} = useTheme();
  const carId = route.params.carId;
  const [car, setCar] = useState({});

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;


  useEffect(() => {
    let mounted = true;
    async function getCar() {
      const car = await carActions.getCarById(carId);
      if(mounted) {
        setCar(car);
      }
    }
    getCar();
    return () => mounted = false;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      async function getCars(){
        try{
          const _car = await carActions.getCarById(carId)
          if(isActive) {
            setCar(_car);
          }
        } catch(e) {
        }
      }
      getCars();
      return () => isActive = false;
    }, [])
);

  const parseStatus = (status) => {
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
    <Provider>
      <Portal>
        <CustomHeaderChild 
          title={car.make + ' ' + car.version + ' ' + car.model}
          // onPressRightButton={() => navigation.navigate('EditCar', {carId})}
        />
      {/* Container Car Details */}
      <View style={{backgroundColor: colors.backgroundVariant}}>
        <View style={[styles.detailContainer, {borderWidth:0, flex: 0} ]}>
          <CustomText fontSize='small' secondaryColor>Costo Total</CustomText>
          <CustomText>{currencyFormat(car.purchasePricePlusOutgoings)}</CustomText>
        </View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            style={[styles.detailContainer, {borderLeftWidth:0, borderColor: colors.border} ]}
            onPress={() => navigation.navigate('Outgoings', {outgoings: car.outgoingsList ? car.outgoingsList : [], carId: car.id})}>
            <View>
              {/* TODO: Add a + button  */}
              <CustomText fontSize='small' secondaryColor>Total de gastos</CustomText>
              <CustomText>{currencyFormat(car.outgoingsSum, 'Sin gastos')}</CustomText>
            </View>
          </TouchableOpacity>
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

      <FAB.Group
          open={open}
          icon={open ? 'close' : 'dots-vertical'}
          fabStyle={{backgroundColor: colors.primary}}
          theme={{dark: true}}
          actions={[
            { 
              icon: 'pencil-outline',
              label: 'Editar',
              onPress: () => navigation.navigate('EditCar', {carId: car.id}) 
            },
            {
              icon: 'check',
              label: 'Vender',
              onPress: () => console.log('Pressed star'),
            },
            {
              icon: 'currency-usd',
              label: 'Gastos',
              onPress: () => navigation.navigate('Outgoings', {outgoings: car.outgoingsList ? car.outgoingsList : [], carId: car.id}),
            },
            {
              icon: 'credit-card-outline',
              label: 'Pagos',
              onPress: () => console.log('Pressed star'),
            },
            
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
              //<ion-icon name="ellipsis-vertical-outline"></ion-icon>
            }
          }}
        />
      </Portal>

    </Provider>
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