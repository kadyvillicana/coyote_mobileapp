import { useFocusEffect, useTheme } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomHeaderChild, CarCardVertical, CustomText } from '../components';
import { carProviderActions } from '../data';
import currencyFormat from '../utils';

const CarsByProviderScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { providerId } = route.params;
  const [cars, setCars] = useState([]);
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function getCars() {
      setIsLoading(true);
      const { provider, cars } = await carProviderActions.carsByProviderId(providerId);
      if (mounted) {
        setCars(cars);
        setProvider(provider)
        setIsLoading(false)
      }
    }
    getCars();
    return () => mounted = false;
  }, []);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      async function getCars() {
        const { provider, cars } = await carProviderActions.carsByProviderId(providerId);
        if (mounted) {
          setCars(cars);
          setProvider(provider);
        }
      }
      getCars();
      return () => mounted = false;
    }, [])
  )

  if (isLoading) {
    return (
      <View></View>
    )
  }

  const CarItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: colors.backgroundVariant, marginTop: 15 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.detailContainer, { borderLeftWidth: 0, borderRightWidth: 0, borderColor: colors.border }]}>
            <CustomText fontSize='small' secondaryColor>Vehículo</CustomText>
            <CustomText numberOfLines={1} >{item.make} {item.version} {item.model}</CustomText>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.detailContainer, { borderLeftWidth: 0, borderTopWidth: 0, borderColor: colors.border }]}>
            <CustomText fontSize='small' secondaryColor>¿Crédito?</CustomText>
            <CustomText>{item.isCarFinancedByProvider ? 'Si' : 'No'}</CustomText>
          </View>
          <View style={[styles.detailContainer, { borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderColor: colors.border }]}>
            <CustomText fontSize='small' secondaryColor>Comprado en</CustomText>
            <CustomText>{currencyFormat(item.purchasePrice)}</CustomText>
          </View>
          {
            item.isCarFinancedByProvider &&
            <TouchableOpacity
              onPress={() => navigation.navigate('Payments', { payments: Array.from(item.creditPurchasePayments), carId: item.id, propertyToUpdate: 'creditPurchasePayments' })}
              style={[styles.detailContainer, { borderRightWidth: 0, borderTopWidth: 0, borderColor: colors.border }]}>
              <CustomText fontSize='small' secondaryColor>Adeudo</CustomText>
              {item.creditPaymentsSum === 0 ?

                <CustomText>Sin abonos</CustomText>
                :
                item.creditPaymentsSum === item.purchasePrice ?
                  <CustomText fontType='bold'
                  style={{color: colors.green}}>
                    Pagado
                    </CustomText>
                  :
                  <CustomText fontType='bold'
                  style={{color: colors.error}}
                  >{currencyFormat(item.creditPurchaseDebt, '0')}</CustomText>

              }
            </TouchableOpacity>
          }
        </View>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <CustomHeaderChild
        title={provider && provider.name}
      />
      {/* Container Provider Details */}
      <View style={{ backgroundColor: colors.backgroundVariant }}>
        <View style={[styles.detailContainer, { borderWidth: 0, flex: 0 }]}>
          <CustomText fontSize='small' secondaryColor>Referencia del proveedor</CustomText>
          <CustomText>Amigo José</CustomText>
        </View>
        <View style={[styles.detailContainer, {
          borderLeftWidth: 0,
          borderTopWidth: 1,
          borderRightWidth: 0, borderBottomWidth: 0, borderColor: colors.border, flex: 0
        }]}>
          <CustomText fontSize='small' secondaryColor>Número de teléfono</CustomText>
          <CustomText>434-34-33333</CustomText>
        </View>
      </View>
      <View style={{ marginTop: 15, flex: 1 }}>
        <CustomText fontSize='medium' fontType='bold' style={{ paddingLeft: 15 }}>
          {cars.length} vehículos comprados
        </CustomText>
        <FlatList
          keyExtractor={item => item.id}
          data={cars}
          renderItem={({ item }) => <CarItem item={item} />}
        />
      </View>
    </View>
  )
}

export default CarsByProviderScreen;

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
  },
  mainContainer: {
    flex: 1,
  }
})