import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomView, CustomHeader, CustomText, CarCardVertical, MainScreenContainer } from '../components';
import { carActions } from '../data';
import currencyFormat from '../utils';

const HomeScreen = ({navigation}) => {
  const [list, setList] = useState([]);
  const [carsCredit, setCarsCredit] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function getCars() {
      const cars = await carActions.getAvailableCars();
      const carsCredit = await carActions.getSoldCreditCars();
      if(mounted) {
        setList(cars);
        setCarsCredit(carsCredit)
        setIsLoading(false);
      }
    }
    getCars();
    return () => mounted = false;
  }, []);

  const MainBody = () => {
    return(
      <CustomView>
        <CustomHeader 
          header='Inicio'
          subHeader={'Inversión Actual: ' + currencyFormat(list.reduce((sum, {purchasePricePlusOutgoings}) => sum + purchasePricePlusOutgoings, 0)) }
        />
        <View style={{marginBottom:15}}>
          <CustomText
            fontType='bold'
            fontSize='medium'>
            {list.length} Vehículos disponibles
          </CustomText>
        </View>
        <View style={{marginBottom: 30}}>
          <FlatList
            data={list}
            renderItem={
              ({ item }) =>
              <TouchableOpacity onPress={() => navigation.navigate('CarDetails', {car: item})}>
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
        </View>
      </CustomView>
    );
  }

  return(
    <MainScreenContainer isLoading={isLoading} bodyView={<MainBody/>} />
  )

  
  
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 30,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 30,
    flexDirection: 'row',
    borderColor: 'blue',
},
})

export default HomeScreen;