import React, {useState} from 'react';
import { View } from 'react-native';
import { CustomButton, CustomHeader, CustomHeaderChild, CustomText, ConfirmationModal } from '../components';
import {Provider, Portal} from 'react-native-paper';
import { carActions } from '../data';

const EditCarScreen = ({navigation, route}) => {

  const carId = route.params.carId;
  const [visible, setVisible] = useState(false);

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

  return(
    <Provider>
      <Portal>
        <CustomHeaderChild 
          title='Edita este vehículo'
        />
        <View style={{margin: 15}}>
          <CustomButton 
            style={{padding: 15, marginTop: 50}}
            onPress={() => showModal()}>
            Eliminar
          </CustomButton>
        </View>
        <ConfirmationModal 
          visible={visible} 
          onDismiss={hideModal}
          title='¿Está seguro de eliminar este vehículo?'
          onSuccess={() => deleteCar()}
          />
      </Portal>
    </Provider>
  )
}

export default EditCarScreen;