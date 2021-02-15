import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import CarCardHorizontal from '../components/car-card-horizontal';
import CustomText from '../components/custom-text';
import CustomView from '../components/custom-view';
import MainScreenContainer from '../components/main-screen-container';
import { carActions } from '../data';
import currencyFormat from '../utils/currencyFormat';

const HomeScreen = () => {
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
        <View style={[styles.headerContainer]}>
          <View>
              <CustomText fontSize='big' fontType='bold'>Inicio</CustomText>
              <View style={{marginTop: 15}}>
                <CustomText
                  secondaryColor 
                  fontSize='medium'>Tienes una inversión total de: <CustomText fontSize='medium'>{currencyFormat()}</CustomText></CustomText>
              </View>
          </View>
        </View>
        <View style={{marginBottom: 30}}>
          <CustomText fontSize='medium' fontType='bold' style={{marginBottom:15}}>
            Este mes has generado
          </CustomText>
          <CustomText fontSize='big' fontType='bold' primaryColor>
            $45,000
          </CustomText>
        </View>
        <View style={{marginBottom:15}}>
          <CustomText
            fontType='bold'
            fontSize='medium'>
            2 Vehículos disponibles
          </CustomText>
        </View>
        <View style={{marginBottom: 30}}>
          <FlatList
            horizontal
            data={list}
            renderItem={
                ({ item }) =>
                <TouchableOpacity>
                    <CarCardHorizontal item={item}/>
                </TouchableOpacity>
            }
            keyExtractor={item => item.id}
          />
        </View>
        {/* <View>
          <CustomText
            fontType='bold'
            fontSize='medium'>
            Credito
          </CustomText>
        </View>
        <View>
          <FlatList
            horizontal
            data={carsCredit}
                    renderItem={
                        ({ item }) =>
                        <TouchableOpacity>
                            <CarCard item={item}/>
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}
                    />
        </View> */}
      </CustomView>
    );
  }

  return(
    <MainScreenContainer isLoading={isLoading} bodyView={<MainBody/>} />
  )

  
  
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 50,
    // backgroundColor: 'red',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 30,
    flexDirection: 'row',
    borderColor: 'blue',
},
})

export default HomeScreen;