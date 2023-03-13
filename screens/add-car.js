import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { CustomHeaderChild, CustomTextInput, CustomButton, ErrorTextForm } from '../components';
import { useForm, Controller } from 'react-hook-form';
import { carActions } from '../data';

const AddCarScreen = ({navigation}) => {

  const { handleSubmit, errors, control } = useForm({});

  const onSubmit = async data => {
    // await carActions.saveCar(data);
    navigation.navigate('CarProvider', {
      car: JSON.stringify(data)
    });
  }

  return(
    <View>
      <CustomHeaderChild 
        title='Agrega un auto'
      />
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}>
            <View style={{padding: 15}}>
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
                autoFocus={true}
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
                rules={{required: true, maxLength: 4, pattern: /^[0-9]*$/i}}
                autoCorrect={false}
              />
              {errors.model && errors.model.type == 'required' ?
              <ErrorTextForm text='Ingresa el modelo del vehículo'/> : null}
              {errors.model && errors.model.type == 'pattern' ?
              <ErrorTextForm text='Ingresa solo números'/> : null}
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
              />
              {errors.miles && errors.miles.type == 'required' ?
              <ErrorTextForm text='Ingresa el kilometraje del vehículo'/>: null}
              {errors.miles && errors.miles.type == 'pattern' ?
              <ErrorTextForm text='Ingresa solo números'/>: null}
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
              />
              {errors.purchasePrice && errors.purchasePrice.type == 'required' ?
              <ErrorTextForm text='Ingresa el precio del vehículo'/>: null}
              {errors.purchasePrice && errors.purchasePrice.type == 'pattern' ?
              <ErrorTextForm text='Ingresa solo números'/>: null}
              <CustomButton
                onPress={handleSubmit(onSubmit)}
                style={{padding: 15, marginTop: 15}}>
                Guardar
              </CustomButton>
            </View>

          </TouchableWithoutFeedback>

        </KeyboardAvoidingView>

      </ScrollView>
    </View>
  )
}

export default AddCarScreen;