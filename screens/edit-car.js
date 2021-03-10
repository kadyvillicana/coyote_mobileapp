import React, {useState, useEffect} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { CustomButton, CustomHeader, CustomHeaderChild, CustomText, ConfirmationModal, CustomTextInput, MainScreenContainer, ErrorTextForm } from '../components';
import {Provider, Portal} from 'react-native-paper';
import { carActions } from '../data';
import { useForm, Controller } from 'react-hook-form';

const EditCarScreen = ({navigation, route}) => {

  const car = route.params.carId;

  // const [car, setCar] = useState({});
  // const [defaultItem, setDefaultItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { handleSubmit, errors, control } = useForm({});

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
  }

  const deleteCar = () => {
    async function deleteCar() {
      await carActions.deleteCarById(carId);
    }
    deleteCar();
    navigation.popToTop();
  }

  const onSubmit = async data => {
    if(data.soldPrice){
      data.soldPrice = parseInt(data.soldPrice);
    }
    if(data.miles){
      data.miles = parseInt(data.miles);
    }
    if(data.purchasePrice){
      data.purchasePrice = parseInt(data.purchasePrice);
    }
    if(data.salePrice){
      data.salePrice = parseInt(data.salePrice);
    }
    console.log({id: car.id, ...data});
    // await carActions.updateCarById({id: carId, ...data});
    navigation.goBack();
  }

  const MainBody = () => {
    return(
      <Provider>
        <Portal>
          <CustomHeaderChild 
            title='Edita este vehículo'
          />
          <ScrollView>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding': 'height'}>
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}>
                <View style={{margin: 15}}>
                  <Controller 
                    as={CustomTextInput}
                    name='make'
                    onChange={args => args[0].nativeEvent.text}
                    label='Marca'
                    control={control}
                    mode='outlined'
                    maxLength={20}
                    rules={{required: true, maxLength: 20}}
                    autoCorrect={false}
                    defaultValue={car.make}
                  />
                  {
                    errors.make && errors.make.type == 'required' ?
                    <ErrorTextForm text='Ingresa la marca del vehículo' /> : null
                  }
                  <Controller
                    style={{marginTop: 15}}
                    as={CustomTextInput}
                    name='version'
                    onChange={args => args[0].nativeEvent.text}
                    label='Versión'
                    control={control}
                    mode='outlined'
                    maxLength={30}
                    rules={{required: true, maxLength: 30}}
                    autoCorrect={false}
                    defaultValue={car.version}
                  />
                  {
                    errors.version && errors.version.type == 'required' ?
                    <ErrorTextForm text='Ingresa la versión del vehículo' /> : null
                  }
                  <Controller 
                    style={{marginTop: 15}}
                    as={CustomTextInput}
                    name='model'
                    onChange={args => args[0].nativeEvent.text}
                    label='Modelo'
                    maxLength={4}
                    control={control}
                    mode='outlined'
                    keyboardType='numeric'
                    defaultValue={car.model}
                    rules={{required: true, maxLength: 4, pattern: /^[0-9]*$/i}}
                    autoCorrect={false}
                  />
                  {
                    errors.model && errors.model.type == 'required' ?
                    <ErrorTextForm text='Ingresa el modelo del vehículo'/> : null
                  }
                  {
                    errors.model && errors.model.type == 'pattern' ?
                    <ErrorTextForm text='Ingresa solo números'/> : null
                  }
                  <Controller 
                    style={{marginTop: 15}}
                    as={CustomTextInput}
                    name='miles'
                    onChange={args => args[0].nativeEvent.text}
                    label='Kilometraje'
                    control={control}
                    mode='outlined'
                    keyboardType='numeric'
                    maxLength={10}
                    rules={{required: true, maxLength: 10, pattern: /^[0-9]*$/i}}
                    autoCorrect={false}
                    defaultValue={car.miles + ''}
                  />
                  {
                    errors.miles && errors.miles.type == 'required' ?
                    <ErrorTextForm text='Ingresa el kilometraje del vehículo'/>: null
                  }
                  {
                    errors.miles && errors.miles.type == 'pattern' ?
                    <ErrorTextForm text='Ingresa solo números'/>: null
                  }
                  <Controller 
                    style={{marginTop: 15}}
                    as={CustomTextInput}
                    name='purchasePrice'
                    onChange={args => args[0].nativeEvent.text}
                    label='Precio de compra'
                    control={control}
                    mode='outlined'
                    keyboardType='numeric'
                    maxLength={10}
                    rules={{required: true, maxLength: 10, pattern: /^[0-9]*$/i}}
                    autoCorrect={false}
                    defaultValue={car.purchasePrice + ''}
                  />
                  {
                    errors.purchasePrice && errors.purchasePrice.type == 'required' ?
                    <ErrorTextForm text='Ingresa el precio del vehículo'/>: null
                  }
                  {
                    errors.purchasePrice && errors.purchasePrice.type == 'pattern' ?
                    <ErrorTextForm text='Ingresa solo números'/>: null
                  }
                  <Controller 
                    style={{marginTop: 15}}
                    as={CustomTextInput}
                    name='salePrice'
                    onChange={args => args[0].nativeEvent.text}
                    label='Precio de compra'
                    control={control}
                    mode='outlined'
                    keyboardType='numeric'
                    maxLength={10}
                    rules={{required: true, maxLength: 10, pattern: /^[0-9]*$/i}}
                    autoCorrect={false}
                    defaultValue={car.salePrice ? car.salePrice + '' : '0'}
                  />
                  {
                    errors.salePrice && errors.salePrice.type == 'required' ?
                    <ErrorTextForm text='Ingresa el precio del vehículo'/>: null
                  }
                  {
                    errors.salePrice && errors.salePrice.type == 'pattern' ?
                    <ErrorTextForm text='Ingresa solo números'/>: null
                  }
                  {
                    car.status !== 'available' && car.soldPrice > 0 ?
                    <Controller
                      style={{marginTop: 15}}
                      as={CustomTextInput}
                      name='soldPrice'
                      onChange={args => args[0].nativeEvent.text}
                      label='Precio de venta'
                      control={control}
                      mode='outlined'
                      keyboardType='numeric'
                      maxLength={10}
                      rules={{required: true, maxLength: 10}}
                      autoCorrect={false}
                      defaultValue={car.soldPrice + ''}
                    />
                    :
                    null
                  }
                  {errors.soldPrice && errors.soldPrice.type == 'required' ?
                  <ErrorTextForm text='Ingresa el precio del vehículo'/>: null}
                  {errors.soldPrice && errors.soldPrice.type == 'pattern' ?
                  <ErrorTextForm text='Ingresa solo números'/>: null}
                  <CustomButton 
                    onPress={handleSubmit(onSubmit)}
                    style={{padding: 15, marginTop: 15, marginBottom: 15}}>
                    Guardar
                  </CustomButton>
                  {/* <CustomButton 
                    style={{padding: 15, marginTop: 15}}
                    onPress={() => showModal()}>
                    Eliminar
                  </CustomButton> */}
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

            <ConfirmationModal 
              visible={visible} 
              onDismiss={hideModal}
              title='¿Está seguro de eliminar este vehículo?'
              onSuccess={() => deleteCar()}
              />
          </ScrollView>
        </Portal>
      </Provider>
    )
  }

  return(
    <MainScreenContainer 
      isLoading={isLoading}
      bodyView={<MainBody/>}
    />
  )

}

export default EditCarScreen;