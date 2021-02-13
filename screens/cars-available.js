import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomText from '../components/custom-text';
import CustomView from '../components/custom-view';
import MainScreenContainer from '../components/main-screen-container';
import { carActions } from '../data';

const CarsAvailableScreen = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
 
  const CarCard = ({item}) => {
    return (
      <View style={{backgroundColor:'#2b3137', marginBottom: 15, borderRadius: 10, padding: 15}}>
          <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
              <View>
                  <CustomText
                      fontType='bold'>
                          {item.make + ' ' + item.version + ' ' + item.model}
                  </CustomText>
              </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 15}}>
              <View style={{flex: 1}}>
                  <CustomText
                    secondaryColor
                    fontSize='small'
                      fontType='light'>Costo total</CustomText>
                  <CustomText>{item.purchasePricePlusOutgoings}</CustomText>
              </View>
              <View style={{flex: 1}}>
                  <CustomText
                    secondaryColor
                    fontSize='small'
                      fontType='light'>Precio suguerido</CustomText>
                  <CustomText>{item.salePrice}</CustomText>
              </View>
          </View>
      </View>
    )
}

  const MainBody = () => {
    return(
      <CustomView>
        <View style={[styles.headerContainer]}>
          <View>
              <CustomText fontSize='big' fontType='bold'>Disponibles</CustomText>
              <View style={{marginTop: 15}}>
                <CustomText
                  secondaryColor 
                  fontSize='medium'>Inversión total de: $445,0404</CustomText>
              </View>
          </View>
        </View>
          <FlatList
                    data={list}
                    renderItem={
                        ({ item }) =>
                        <TouchableOpacity>
                            <CarCard item={item}/>
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}
                    />
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

export default CarsAvailableScreen;