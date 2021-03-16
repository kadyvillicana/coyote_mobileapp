import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import { CustomHeaderChild, CarCardVertical, CustomText } from '../components';
import { carActions } from '../data';
import currencyFormat from '../utils';


const CarsByClientScreen = ({navigation, route}) => {
  const {clientName} = route.params;
  const [cars, setCars] = useState([]);
  
  useEffect(() => {
    let mounted = true;
    async function getCars() {
      const cars = await carActions.getCarsByClientName(clientName);
      if(mounted) {
        setCars(cars);
      }
    }
    getCars();
    return () => mounted = false;
  }, []);

  return(
    <View style={{flex: 1}}>
      <CustomHeaderChild
        title={clientName}
      />
      <View style={{padding: 15}}>
        <FlatList
          data={cars}
          renderItem={
            ({item}) => 
            <TouchableOpacity
              onPress={() => navigation.navigate('CarDetails', {carId: item.id})}>
              <CarCardVertical
                title={`${item.make} ${item.version} ${item.model}`}
                subTitleLeft='Vendido en'
                subTitleTextLeft={currencyFormat(item.soldPrice)}
                subTitleRight='Adeudo'
                subTitleTextRight={<CustomText 
                  style={[item.carCreditDebt > 0 ? {color: '#cf6679'}: {color: '#03dac6'}]}>
                   {currencyFormat(item.carCreditDebt, 'Sin adeudo')}</CustomText>}
              />
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  )
}

export default CarsByClientScreen;