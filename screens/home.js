import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { CustomHeader, CustomText, CarCardVertical, MainScreenContainer, CustomFab } from '../components';
import { carActions } from '../data';
import currencyFormat from '../utils';

const HomeScreen = ({navigation}) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function getCars() {
      const cars = await carActions.getAvailableCars();
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
        try{
          const cars = await carActions.getAvailableCars();
          if(mounted) {
            setList(cars);
          }
        } catch(e) {
        }
      }
      getCars();
      return () => mounted = false;
    }, [])
  );

  const NoData = () => {
    return(
      <View style={{padding: 15}}>
        <CustomHeader 
          header='Inicio'
        />
        <View
          style={{alignItems: 'center', justifyContent: 'center', marginTop: 180}}>
          <CustomText
            style={{marginBottom: 25}}
            fontType='bold'
            fontSize='medium'
          >Agrega un vehículo</CustomText>
          <CustomFab 
              style={{justifyContent: 'center', position: 'relative'}}
              icon='plus'
              onPress={() => navigation.navigate('AddCar')}
          />
        </View>
      </View>
    )
  }

  const MainBody = () => {
    return(
      <View
        style={{flex:1, padding: 15}}>
        <CustomHeader 
          header='Inicio'
          subHeader={'Inversión: ' + currencyFormat(list.reduce((sum, {purchasePricePlusOutgoings}) => sum + purchasePricePlusOutgoings, 0)) }
        />
        <View style={{marginBottom:15}}>
          <CustomText
            fontType='bold'
            fontSize='medium'>
            {list.length} Vehículos disponibles
          </CustomText>
        </View>
        <FlatList
          data={list}
          renderItem={
            ({ item }) => 
            <TouchableOpacity onPress={() => navigation.navigate('CarDetails', {carId: item.id})}>
              <CarCardVertical
                title={item.make + ' ' + item.version + ' ' + item.model}
                subTitleLeft='Costo total'
                subTitleTextLeft={currencyFormat(item.purchasePricePlusOutgoings)}
                subTitleRight='Precio suguerido'
                subTitleTextRight={currencyFormat(item.salePrice)}
              />
            </TouchableOpacity>
          }
          keyExtractor={item => item.id}
        />
          <CustomFab
            style={{position: 'absolute', bottom: 0, right:0, margin: 30}}
            icon='plus'
            mode='flat'
            onPress={() => navigation.navigate('AddCar')}
          />
      </View>
    );
  }

  return(
    <MainScreenContainer 
      isLoading={isLoading} 
      bodyView={ list && list.length > 0 ? <MainBody/> : <NoData/>}
    />
  )
  
}

export default HomeScreen;