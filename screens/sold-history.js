import React, { useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View } from 'react-native';
import { CustomText, MainScreenContainer, CustomHeader, CarCardVertical } from '../components';
import { carActions } from '../data';
import Moment from 'moment';
import currencyFormat from '../utils';
import { useFocusEffect } from '@react-navigation/native';

const SoldHistoryScreen = ({navigation}) => {

  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function getCars(){
      const cars = await carActions.getAllSoldCars();
      if(mounted) {
        setList(cars);
        setIsLoading(false);
      }
    }
    getCars();
    return () => mounted = false;
  }, []);
  
  useFocusEffect(
    React.useCallback(() => {
      let mounted = true;
      async function getCars(){
        try {
          const cars = await carActions.getAllSoldCars();
          if(mounted){
            setList(cars);
          }
        } catch(e){

        }
      }
      getCars();
      return () => mounted = false;
    }, [])
  );

  const parseStatus = (status) => {
    switch(status){
      case 'sold':
        return 'contado'
      case 'soldCredit':
        return 'crédito'
    }
  }

  const NoBody = () => {
    return(
    <View style={{flex: 1, padding:  15}}>
      <CustomHeader
        header='Historial'
      />
      <View
          style={{alignItems: 'center', justifyContent: 'center', marginTop: 180}}>
          <CustomText
            style={{marginBottom: 25}}
            fontType='bold'
            fontSize='medium'
          >Aún no has tenido ventas</CustomText>
        </View>
    </View>
    )
  }

  const MainBody = () => {
    return(
      <View
        style={{padding: 15}}>
        <CustomHeader 
          header='Historial'
          subHeader={`Fecha de última venta: ${Moment(list[0].soldDate).format('DD MMM YYYY')}`}
        />
        <View style={{marginBottom: 15}}>
          <CustomText
            fontType='bold'
            fontSize='medium'>
            {list.length} Vehículos vendidos
          </CustomText>
        </View>
        <View style={{marginBottom: 230}}>
          <FlatList
            data={list}
            renderItem={
                ({ item }) =>
                <TouchableOpacity onPress={() => navigation.navigate('CarDetails', {carId: item.id})}>
                    <CarCardVertical 
                      title={item.make + ' ' + item.version + ' ' + item.model}
                      subTitleLeft='Utilidad'
                      subTitleTextLeft={<CustomText 
                        style={[item.carRevenue <= 0 ? {color: '#cf6679'}: {color: '#03dac6'}]}>
                         {currencyFormat(item.carRevenue, 'Sin valor')}</CustomText>}
                      subTitleRight='Fecha de Venta'
                      subTitleTextRight={Moment(item.soldDate).format('DD MMM') + ' (' + parseStatus(item.status) + ')'}
                    item={item}/>
                </TouchableOpacity>
            }
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    )
  }

  return(
    <MainScreenContainer isLoading={isLoading} 
      bodyView={list && list.length > 0 ? <MainBody/> : <NoBody/>} 
    />
  )
}

export default SoldHistoryScreen;