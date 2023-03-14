import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { carProviderActions } from '../data';
import { CarCardVertical, CustomHeader, CustomText, MainScreenContainer } from '../components';
import { useFocusEffect } from '@react-navigation/native';

const ProviderScreen = ({navigation}) => {

  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function getProviders() {
      const providers = await carProviderActions.allProviders();
      if (mounted) {
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

      async function getProviders() {
        const providers = await carProviderActions.allProviders();
        if (mounted) {
          setProviders(providers);
        }
      }
      getProviders();
      return () => mounted = false;
    }, [])
  )

  const ProviderItem = ({ item }) => {
    const cars = Array.from(item.cars);
    return (
      <View style={
        {
          backgroundColor: '#2b3137',
          borderRadius: 10,
          padding: 15,
          marginBottom: 15,
        }
      }>
        <View>
          <View>
            <CustomText
              fontType='bold'>
              {item.name}
            </CustomText>
          </View>
          {/* <FlatList
            keyExtractor={item => item.id}
            data={cars}
            renderItem={
              ({ item }) => <CustomText>{item.make} {item.version} {item.model}</CustomText>
            }
          /> */}
        </View>
      </View>
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
          subHeader=''
        />
        <View>
          <FlatList
            keyExtractor={item => item.id}
            data={providers}
            renderItem={
              ({ item }) =>
              <TouchableOpacity
              onPress={() => navigation.navigate('CarsByProvider', {providerId: item.id})}>
                  <ProviderItem item={item} />
                  {/* <CustomText>
                    {item.name}
                  </CustomText>
                  {
                    item.cars && item.cars.length > 0 &&
                    item.cars.map((car) => <CustomText fontSize={'small'}>{car.make}</CustomText>)
                  } */}
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