import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { CustomFab, CustomHeaderChild, CustomText, CustomTextInput, ErrorTextForm, CircleButton } from '../components';
import currencyFormat from '../utils';
import { Provider, Portal, Modal, TextInput } from 'react-native-paper';
import { CustomButton } from '../components/custom-button';
import { useForm, Controller } from 'react-hook-form';
import { carActions } from '../data';

const OutGoingScreen = ({route}) => {
  const [list, setList] = useState(route.params.outgoings);
  const {carId} = route.params;
  const [visible, setVisible] = useState(false);
  let item = {
    description: '',
    value: '',
    id: ''
  }
  const reset = () => {
    item = {
      description: '',
      value: '',
      id: ''
    } 
  }

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    reset();
  } 

  const { handleSubmit, errors, control } = useForm({});

  const onSubmit = async data => {
    console.log(data);
    data.id = Math.round(Math.random() * 1000000) + '';
    data.value = parseInt(data.value);
    const previuosData = list;
    previuosData.push(data);
    setList(previuosData);
    await carActions.updateCarById({id: carId, outgoings: previuosData });
    hideModal();
}

  const removeItem = async id => {
    if(!id) {
      return;
    }
    const filteredData = list.filter(item => item.id !== id);
    setList(filteredData);
  }

  const containerStyle = {
    margin: 15,
    padding: 15, 
  };

  const ItemList = (item) => {
    return(
      <View 
        style={{flexDirection: 'row', padding: 15}}>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <CustomText fontSize='medium'>{item.name}</CustomText>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <CustomText fontSize='medium'>{currencyFormat(item.value)}</CustomText>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around'}}>
            <CircleButton onPress={() => removeItem(item.id)} icon='close'/>
            <CircleButton onPress={showModal} icon='pencil-outline' primary/>
          </View>
      </View>
    );
  }

  const NoOutgoingsYet = () => {
    return(
      <View style={{alignItems: 'center', padding: 15}}>
        <View style={{marginTop: 220}}>
          <CustomText
            style={{padding: 15}}
            fontSize='medium'
            fontType='bold'>
            Presiona aqui para agregar un gasto
          </CustomText>
        </View>
        <CustomFab
          icon='plus'
          onPress={showModal}
        />
      </View>
    )
  }

  return(
    <Provider>
      <View>
        <CustomHeaderChild 
          title='Gastos'
        />
        {
          list && list.length > 0 ? 
          <View>
            <View 
              style={{flexDirection: 'row', padding: 15}}>
                <View style={{flex: 3}}>
                  <CustomText fontSize='medium' fontType='bold'>Descripción</CustomText>
                </View>
                <View style={{flex: 2}}>
                  <CustomText fontSize='medium' fontType='bold'>Monto</CustomText>
                </View>
                <View style={{flex: 1}}>
                  <CustomText></CustomText>
                </View>
            </View>
            <FlatList 
              data={list}
              renderItem={({item}) =>ItemList(item)}
            />
          </View>
          :
          <NoOutgoingsYet />
        }
      </View>
      {/* Add Outgoing Modal  */}
      <Portal>
        <Modal 
          visible={visible} 
          onDismiss={hideModal} 
          contentContainerStyle={containerStyle}
        >
          <View style={{justifyContent: 'center', backgroundColor: '#1b1f23', padding: 15}}>
            <CustomText
              style={{paddingBottom: 15, paddingTop: 15}} 
              fontSize='medium'
              fontType='bold'>
              Describe el gasto
            </CustomText>
            <Controller
              as={CustomTextInput}
              name='name'
              onChange={args => args[0].nativeEvent.text}
              label="Descripción"
              maxLength={20}
              control={control}
              rules={{ required: true, maxLength: 20, minLength: 1}}
              defaultValue={item.description}
              mode='outlined'
              autoCorrect={false}
            />
            { errors.name && errors.name.type === 'required' ? 
              <ErrorTextForm text='Agrega una descripción' /> : null
            }
            <Controller
              as={CustomTextInput}
              name='value'
              style={{marginTop: 15}}
              onChange={args => args[0].nativeEvent.text}
              label='Costo'
              maxLength={10}
              control={control}
              rules={{ required: true, maxLength: 10, pattern: /^[0-9]*$/i }}
              defaultValue={item.value}
              autoCorrect={false}
              mode='outlined'
            />
            { errors.value && errors.value.type === 'required' ? 
              <ErrorTextForm text='Agrega un costo' /> : null
            }
            { errors.value && errors.value.type === 'pattern' ? 
              <ErrorTextForm text='Agrega solo números' /> : null
            }
            <CustomButton 
              onPress={handleSubmit(onSubmit)}
              style={{padding: 15, marginTop: 15, marginBottom: 15}}>
              Agregar
            </CustomButton>
          </View>
        </Modal>
      </Portal>
    </Provider>
  )
}

export default OutGoingScreen;