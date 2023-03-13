import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { CircleButton, CustomButton, CustomHeaderChild, CustomText, CustomTextInput, ErrorTextForm } from '../components'
import { useForm } from 'react-hook-form';
import { carActions, carProviderActions } from '../data';

const CarProviderScreen = ({ route, navigation }) => {

  const _car = route.params.car;

  const [providerSuggestions, setProviderSuggestions] = useState([]);
  const [provider, setProvider] = useState(null);
  const [providerError, setProviderError] = useState(false);
  const { handleSubmit, errors, control } = useForm({});

  useEffect(() => {
    async function p() {
      await carProviderActions.providerCars();
    }
    p()
  }, [])

  const handleInput = async data => {
    if (!data) {
      setProviderSuggestions([]);
      return
    }
    const newProvider = {
      id: '-1',
      name: data,
    }
    const res = await carProviderActions.providerSuggestions(data);
    res.push(newProvider);

    setProviderSuggestions(res);
  }

  const onSubmit = async () => {
    const newCar = JSON.parse(_car);
    let _provider = null;
    if (providerSuggestions && !provider) {
      setProviderError(true);
      return
    }
    if (provider && provider.name && provider.name != '' ) {
      _provider = provider;
      if(provider && provider.id == '-1') {
        const newProvider = {
          id: Math.round(Math.random() * 1000000) + '',
          name: provider.name
        }
        _provider = await carProviderActions.saveProvider(newProvider);
      }
    }
    await carActions.saveCar({
      ...newCar,
      carProvider: _provider,
    });

    navigation.popToTop();
  }

  const removeProviderAndClearSearch = () => {
    setProvider(null);
    setProviderError(false);
    setProviderSuggestions([]);
  }

  const Item = ({ provider }) => {
    return (
      <TouchableOpacity
        onPress={() => { setProvider(provider); setProviderError(false); }}>
        <View style={{ backgroundColor: '#2b3137', padding: 15, borderRadius: 5, marginTop: 15 }}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText>
                {provider.name}
              </CustomText>
            </View>
            <View>
              <CircleButton icon='checkmark-outline' primary />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomHeaderChild
        title='¿Quién te lo vendió?'
      />
      <View style={{padding: 15, }}>
        <CustomText>
          Aqui puedes agregar quien te vendió el auto.
        </CustomText>
      </View>
      <View style={{ justifyContent: 'center', padding: 15, }}>
        <View style={{ marginTop: 15 }}>
          {
            provider && provider.name && provider.name.length > 0 ?
              <View style={{ marginTop: 15 }}>
                <CustomText fontType='bold' fontSize='medium'>
                  Vendedor seleccionado
                </CustomText>
                <TouchableOpacity
                  onPress={removeProviderAndClearSearch}>
                  <View style={{ backgroundColor: '#2b3137', padding: 15, borderRadius: 5, marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                      <View style={{ justifyContent: 'center' }}>
                        <CustomText fontType='bold' fontSize='medium'>
                          {provider.name}
                        </CustomText>
                      </View>
                      <View>
                        <CircleButton icon='close' onPress={removeProviderAndClearSearch} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              :
              <View>
                <CustomText fontSize='medium' fontType='bold'>
                  Ingresa el nombre del vendedor
                </CustomText>
                <CustomTextInput
                  style={{ marginTop: 15, marginBottom: 15 }}
                  label='Nombre del vendedor'
                  mode='outlined'
                  onChangeText={providerName => handleInput(providerName)}
                />
                <FlatList
                  keyExtractor={item => item.id}
                  data={providerSuggestions}
                  renderItem={({ item }) => <Item provider={item} />}
                />
                {providerError ?
                  <ErrorTextForm text='Debes seleccionar un vendedor' /> : null}
              </View>

          }
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', padding: 15, }}>
        <CustomText fontSize={'small'} fontType={'light'}>
          Sí no lo deseas agregar, presiona CONTINUAR.
        </CustomText>
        <CustomButton
          onPress={() => handleSubmit(onSubmit())}
          style={{ padding: 15, marginTop: 15 }}>
          continuar
        </CustomButton>
      </View>
    </View>
  )
}

export default CarProviderScreen;