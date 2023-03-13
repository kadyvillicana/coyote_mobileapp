import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { carProviderActions } from '../data';
import { CustomHeader, CustomText, MainScreenContainer } from '../components';
import { useFocusEffect } from '@react-navigation/native';

const ProviderScreen = () => {

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

  const NoData = () => {
    return (
      <View
        style={{ flex: 1, padding: 15 }}>
        <CustomHeader
          header='Proveedores'
          subHeader=''
        />
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
                <TouchableOpacity>
                  <CustomText>
                    {item.name}
                  </CustomText>
                  {
                    item.cars && item.cars.length > 0 &&
                    item.cars.map((car) => <CustomText fontSize={'small'}>{car.make}</CustomText>)
                  }
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