import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, FlatList, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { CustomText, MainScreenContainer, CustomHeader, CarCardVertical, CustomTextInput } from '../components';
import { carActions } from '../data';
import Moment from 'moment';
import currencyFormat from '../utils';
import { useFocusEffect } from '@react-navigation/native';

const SoldHistoryScreen = ({navigation}) => {

  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (text) => {
    setSearchTerm(text);
  }

  const contains = ({ make, version, model }, query) => {
    return make.toLowerCase().includes(query) || version.toLowerCase().includes(query) || model.toLowerCase().includes(query)
  };

  const filteredData = list.filter(item => {
    return contains(item, searchTerm.toLowerCase())
  });

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

  return(
    <MainScreenContainer isLoading={isLoading} 
      bodyView={list && list.length > 0 ? 
      <KeyboardAvoidingView
        style={{padding: 15, flex: 1}}>
        <CustomHeader
          header='Historial'
          subHeader={`Última venta: ${Moment(list[0].soldDate).format('DD MMM YYYY')}`}
        />
        <CustomTextInput
          style={{marginTop: -15, marginBottom: 15}}
          mode='outlined'
          onChangeText={handleChange}
          value={searchTerm}
          placeholder="Busca por: Modelo, Año o Versión"
        />
        <View style={{marginBottom: 15}}>
          <CustomText
            fontType='bold'
            fontSize='medium'>
            {filteredData.length} Vehículos vendidos
          </CustomText>
        </View>
        <View style={{marginBottom: 200}}>
          <FlatList
            data={filteredData}
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
      </KeyboardAvoidingView> 
      : 
      <NoBody/>
    } 
    />
  )
}

export default SoldHistoryScreen;