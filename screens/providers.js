import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { carProviderActions } from '../data';
import { CarCardVertical, CustomHeader, CustomText, MainScreenContainer } from '../components';
import { useFocusEffect } from '@react-navigation/native';
import currencyFormat from '../utils';

const ProviderScreen = ({navigation}) => {

  const [providers, setProviders] = useState([]);
  const [totalDebt, setTotalDebt] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function getProviders() {
      const providers = await carProviderActions.allProviders();
      let _totalDebt = 0;
      if (mounted) {
        providers.map((provider) => {
          const cars = Array.from(provider.cars);
          _totalDebt += cars.reduce((sum, {creditPurchaseDebt, isCarFinancedByProvider}) => isCarFinancedByProvider && sum + creditPurchaseDebt, 0);
        })
        setTotalDebt(_totalDebt);
        setProviders(providers);
        setIsLoading(false);
      }
    }
    getProviders();
    return () => mounted = false;
  }, []);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      let _totalDebt = 0;
      async function getProviders() {
        const providers = await carProviderActions.allProviders();
        if (mounted) {
          providers.map((provider) => {
            const cars = Array.from(provider.cars);
            _totalDebt += cars.reduce((sum, {creditPurchaseDebt, isCarFinancedByProvider}) => isCarFinancedByProvider && sum + creditPurchaseDebt, 0);
          })
          setTotalDebt(_totalDebt);
          setProviders(providers);
        }
      }
      getProviders();
      return () => mounted = false;
    }, [])
  )

  const ProviderItem = ({ item }) => {
    const cars = Array.from(item.cars);
    const debt = cars.reduce((sum, {creditPurchaseDebt, isCarFinancedByProvider}) => isCarFinancedByProvider && sum + creditPurchaseDebt, 0);
    return (
      <CarCardVertical 
        title={item.name}
        subTitleLeft='Autos comprados'
        subTitleTextLeft={cars.length}
        subTitleRight='Adeudo Total'
        subTitleTextRight={<CustomText 
          style={[debt > 0 ? {color: '#cf6679'}: {color: '#03dac6'}]}>
           {currencyFormat(debt, 'Sin adeudo')}</CustomText>}
      />
    )
  }

  const NoData = () => {
    return (
      <View
        style={{ flex: 1, padding: 15 }}>
        <CustomHeader
          header='Proveedores'
          subHeader=''
        />
        <View
          style={{ alignItems: 'center', justifyContent: 'center', marginTop: 180 }}>
          <CustomText
            style={{ marginBottom: 25 }}
            fontType='bold'
            fontSize='medium'
          >Aún no has tenido proveedores</CustomText>
        </View>
      </View>
    )
  }

  const Body = () => {
    return (
      <View
        style={{ flex: 1, padding: 15 }}>
        <CustomHeader
          header='Proveedores'
          subHeader={`Adeudo: ${currencyFormat(totalDebt, 'Sin adeudo')}` }
        />
        <View style={{marginBottom: 15}}>
          <CustomText
            fontType='bold'
            fontSize='medium'>
            {providers.length} Proveedores
          </CustomText>
        </View>
        <View>
          <FlatList
            keyExtractor={item => item.id}
            data={providers}
            renderItem={
              ({ item }) =>
              <TouchableOpacity
              onPress={() => navigation.navigate('CarsByProvider', {providerId: item.id})}>
                  <ProviderItem item={item} />
                </TouchableOpacity>
            }
          />
        </View>
      </View>
    )
  }

  return (
    <MainScreenContainer
      isLoading={isLoading}
      bodyView={providers && providers.length > 0 ? <Body /> : <NoData />} />

  )
}

export default ProviderScreen;