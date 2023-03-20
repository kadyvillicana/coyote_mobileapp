import React, { useState } from 'react';
import { View } from 'react-native';
import { CustomHeaderChild, CustomText, CustomTextInput, CircleButton, ErrorTextForm, CustomButton } from '../components';
import { carActions, carProviderActions } from '../data';
import { useForm } from 'react-hook-form';

const EditProviderPropertyScreen = ({ navigation, route }) => {

  const [propertyError, setPropertyError] = useState(false);
  const {providerId, propertyToUpdate, oldValue, tagValue} = route.params;
  const [property, onChangeProperty] = useState('')

  const { handleSubmit } = useForm({});
 
  const onSubmit = async () => {
    await carProviderActions.updateProviderById({
      id: providerId,
      [propertyToUpdate]: property,
    });

    navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomHeaderChild
        title='Editar proveedor'
      />
      <View
        style={{ flex: 1, padding: 15 }}>
        <View style={{ marginTop: 15 }}>

          <View>
            <CustomText fontSize='medium' fontType='bold'>
              Edita aqui {tagValue}
            </CustomText>
            <CustomTextInput
              style={{ marginTop: 15, marginBottom: 15 }}
              label={tagValue}
              mode='outlined'
              onChangeText={onChangeProperty}
              autoCorrect={false}
              defaultValue={oldValue}
            />
          </View>

          <View>
            <CustomButton style={{ padding: 15, marginTop: 15 }}
              onPress={handleSubmit(onSubmit)}>
              Guardar
            </CustomButton>
          </View>
        </View>
      </View>
    </View>
  )
}

export default EditProviderPropertyScreen;