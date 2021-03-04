import React from 'react';
import { View } from 'react-native';
import { CustomButton, CustomHeader, CustomHeaderChild, CustomText } from '../components';
import {Provider, Portal} from 'react-native-paper';
import { carActions } from '../data';

const EditCarScreen = ({navigation, route}) => {

  const carId = route.params.carId;

  const deleteCar = () => {
    async function deleteCar() {
      await carActions.deleteCarById(carId);
    }
    deleteCar();
    navigation.popToTop();
  }

  return(
    <Provider>
      <Portal>
        <CustomHeaderChild 
          title='Edita este vehículo'
        />
        <View style={{margin: 15}}>
          <CustomButton 
            style={{padding: 15, marginTop: 50}}
            onPress={() => deleteCar()}>
            Eliminar
          </CustomButton>
        </View>
      </Portal>
    </Provider>
  )
}

export default EditCarScreen;