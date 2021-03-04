import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { CustomFab, CustomHeaderChild, CustomText, CustomTextInput, CustomButton, CircleButton } from '../components';
import { useForm, Controller } from 'react-hook-form';
import { carActions } from '../data';
import { Provider, Portal, Modal } from 'react-native-paper';
import currencyFormat from '../utils';
import Moment from 'moment';

const PaymentScreen = ({route}) => {
  const [payments, setPayments] = useState(route.params.payments)
  const {carId} = route.params;
  const [visible, setVisible] = useState(false);
  const [defaultItem, setDefaultItem] = useState(
    {
      value: '',
      id: '',
      createdDate: new Date()
    }
  )

  const reset = () => {
    setDefaultItem({
      value: '',
      id: '',
      createdDate: new Date()
    })
  }

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    reset();
  }

  const { handleSubmit, errors, control } = useForm({});

  const removeItem = async id => {
    if(!id){
      return;
    }
    const filteredData = payments.filter(item => item.id !== id);
    await carActions.updateCarById({id:carId, payments: filteredData});
    setPayments(filteredData);
  }

  const containerStyle = {
    margin: 15,
    padding: 15, 
  };

  const onSubmit = async data => {
    data.value = parseInt(data.value);
    data.id =  Math.round(Math.random() * 1000000) + '';
    data.createdDate = new Date();

    const previuosData = payments;
    previuosData.push(data);
    setPayments(previuosData);

    await carActions.updateCarById({
      id: carId,
      payments: payments,
    });

    hideModal();
}

  const ItemList = (item) => {
    return(
      <View 
        style={{flexDirection: 'row', padding: 15}}>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <CustomText fontSize='medium'>{currencyFormat(item.value)}</CustomText>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <CustomText fontSize='medium'>
              {Moment(item.createdDate).format('DD MMM YYYY')}
            </CustomText>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around'}}>
            <CircleButton onPress={() => removeItem(item.id)} icon='close'/>
          </View>
      </View>
    );
  }

  const NoPaymentsYet = () => {
    return(
      <View style={{alignItems: 'center', padding: 15}}>
          <View style={{marginTop: 220}}>
            <CustomText
              style={{padding: 15}}
              fontSize='medium'
              fontType='bold'>
              Presiona aqui para agregar un pago
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
      <Portal>
        <CustomHeaderChild
          title='Pagos'
        />
        {
          payments && payments.length > 0 ?
          <View
            style={{flex: 1}}>
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
              data={payments}
              renderItem={({item}) =>ItemList(item)}
            />
            <CustomFab
              style={{position: 'absolute', bottom: 0, right:0, margin: 30}}
              icon='plus'
              onPress={showModal}
            />
          </View>
          :
          <NoPaymentsYet />
        }
        {/* Add Outgoing Modal  */}
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
              Indica el monto del pago
            </CustomText>
            <Controller
              as={CustomTextInput}
              name='value'
              style={{marginTop: 15}}
              onChange={args => args[0].nativeEvent.text}
              label='Cantidad'
              maxLength={10}
              control={control}
              rules={{ required: true, maxLength: 10, pattern: /^[0-9]*$/i }}
              defaultValue={defaultItem.value}
              autoCorrect={false}
              mode='outlined'
              keyboardType='numeric'
            />
            { errors && errors.value && errors.value.type === 'required' ? 
              <ErrorTextForm text='Agrega un costo' /> : null
            }
            { errors && errors.value && errors.value.type === 'pattern' ? 
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

export default PaymentScreen;