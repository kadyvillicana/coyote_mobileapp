import React, { useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View } from 'react-native';
import { CustomView, CustomText, MainScreenContainer, CustomHeader, CarCardVertical } from '../components';
import { carActions } from '../data';

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
  }, [])

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
                <TouchableOpacity onPress={() => navigation.navigate('CarDetails', {car: item})}>
                    <CarCardVertical item={item}/>
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