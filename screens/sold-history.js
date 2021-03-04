import React, { useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View } from 'react-native';
import { CustomView, CustomText, MainScreenContainer, CustomHeader, CarCardVertical } from '../components';
import { carActions } from '../data';
import Moment from 'moment';
import currencyFormat from '../utils';

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

  const parseStatus = (status) => {
    switch(status){
      case 'sold':
        return 'contado'
      case 'soldCredit':
        return 'crédito'
    }
  }

  const MainBody = () => {
    return(
      <CustomView>
        <CustomHeader 
          header='Historial'
          subHeader='Fecha de última venta: 20 ene 21'
        />
        <View style={{marginBottom: 15}}>
          <CustomText
            fontType='bold'
            fontSize='medium'>
            {list.length} Vehículos vendidos
          </CustomText>
        </View>
        <View style={{marginBottom: 130}}>
          <FlatList
            data={list}
            renderItem={
                ({ item }) =>
                <TouchableOpacity onPress={() => navigation.navigate('CarDetails', {carId: item.id})}>
                    <CarCardVertical 
                      title={item.make + ' ' + item.version + ' ' + item.model}
                      subTitleLeft='Utilidad'
                      subTitleTextLeft={currencyFormat(item.soldPrice - item.purchasePricePlusOutgoings)}
                      subTitleRight='Fecha de Venta'
                      subTitleTextRight={Moment(item.soldDate).format('DD MMM') + ' (' + parseStatus(item.status) + ')'}
                    item={item}/>
                </TouchableOpacity>
            }
            keyExtractor={item => item.id}
          />
        </View>
      </CustomView>
    )
  }

  return(
    <MainScreenContainer isLoading={isLoading} bodyView={<MainBody/>} />
  )
}

export default SoldHistoryScreen;