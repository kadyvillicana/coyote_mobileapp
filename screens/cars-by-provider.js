import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import { CustomHeaderChild, CarCardVertical, CustomText } from '../components';
import { carProviderActions } from '../data';
import currencyFormat from '../utils';

const CarsByProviderScreen = ({navigation, route}) => {
  const {providerId} = route.params;
  const [cars, setCars] = useState([]);
  
  useEffect(() => {
    let mounted = true;
    async function getCars() {
      const cars = await carProviderActions.carsByProviderId(providerId);
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
        title={providerId}
      />
      <View style={{padding: 15}}>
        <FlatList
          data={cars}
          renderItem={
            ({item}) => 
            <TouchableOpacity>
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

export default CarsByProviderScreen;