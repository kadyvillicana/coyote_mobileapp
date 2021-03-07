import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Portal, Provider, Switch } from 'react-native-paper';
import { CircleButton, CustomButton, CustomHeaderChild, CustomText, CustomTextInput, ErrorTextForm, ConfirmationModal } from '../components';
import Moment from 'moment';
import { carActions } from '../data';
import { useForm, Controller } from 'react-hook-form';
import currencyFormat from '../utils';


const SellCarScreen = ({route, navigation}) => {

  const carId = route.params.carId;
  const [soldPriceModal, setSoldPriceModal] = useState(null);
  const [clientSuggestions, setClientSuggestions] = useState([]);
  const [client, setClient] = useState('');
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [date, setDate] = useState(new Date(Moment().add(1, 'month')));
  const onToggleSwitch = () => {setIsSwitchOn(!isSwitchOn); removeClientAndClearSearch();};
  // Confirmation Modal
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const showConfirmationModal = (data) => {
    setConfirmationModalVisible(true);
    setSoldPriceModal(parseInt(data.soldPrice));
  };
  const hideModal = () => setConfirmationModalVisible(false);

  const { handleSubmit, errors, control } = useForm({});

  const handleInput = async data => {
    const res = await carActions.clientSuggestions(data)
    setClientSuggestions(res);
  }

  const removeClientAndClearSearch = () => {
    setClient('');
    setClientSuggestions([]);
  }

  const onSubmit = async data => {
    const _client = isSwitchOn ? client && client.length > 0 ? client : data.clientName : null;

    await carActions.updateCarById({
      id: carId,
      soldPrice: soldPriceModal,
      clientName: isSwitchOn ? _client : '', 
      dueDate: date,
      soldDate: new Date(),
      status: isSwitchOn ? 'soldCredit' : 'sold'
    });

    navigation.goBack();
  }

  const Item = ({item}) => {
    return(
      <TouchableOpacity
          onPress={() => setClient(item)}>
          <View style={{backgroundColor: '#2b3137', padding: 15, borderRadius: 5, marginTop: 15}}>
            <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
              <View style={{justifyContent:'center'}}>
                  <CustomText>
                    {item}
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

  return(
    <Provider>
      <Portal>
        <CustomHeaderChild
          title='Vende tu vehículo'
        />
        <View style={{margin: 15, marginTop: 30 }}>
          {/* Client Search */}
          <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
            <View>
              <CustomText
                fontSize='medium'
                fontType='bold'>
                  ¿La venta es a crédito?
              </CustomText>
            </View>
            <View>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
          </View>
          {/* Display if credit */}
          {
            isSwitchOn ?
              client && client.length > 0 ?
              <View style={{marginTop: 15}}>
                <CustomText fontType='bold' fontSize='medium'>
                  Cliente seleccionado
                </CustomText>
                <TouchableOpacity
                  onPress={removeClientAndClearSearch}>
                  <View style={{backgroundColor: '#2b3137', padding: 15, borderRadius: 5, marginTop: 15}}>
                    <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                      <View style={{justifyContent:'center'}}>
                        <CustomText fontType='bold' fontSize='medium'>
                          {client}
                        </CustomText>
                      </View>
                      <View>
                        <CircleButton icon='close'/>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              :
              <View style={{marginTop: 15}}>
                <CustomText fontSize='medium' fontType='bold'>
                  Ingresa el nombre del cliente
                </CustomText>
                <CustomTextInput 
                  style={{marginTop: 15, marginBottom: 15}}
                  label='Nombre del cliente'
                  mode='outlined'
                  onChangeText={clientName => handleInput(clientName)}
                />
                <FlatList
                  keyExtractor={item => item}
                  data={Object.keys(clientSuggestions)}
                  renderItem={({item}) => <Item item={item}/>}
                />
              </View>
              : null
          }
          <View style={{marginTop: 15}}>
            <CustomText
              fontType='bold'
              fontSize='medium'>
              Indica el precio de venta
            </CustomText>
            <Controller 
              as={CustomTextInput}
              name='soldPrice'
              onChange={args => args[0].nativeEvent.text}
              label='Cantidad'
              maxLength={10}
              control={control}
              rules={{ required: true, maxLength: 10, pattern: /^[0-9]*$/i}}
              autoCorrect={false}
              mode='outlined'
              keyboardType='numeric'
              style={{marginTop: 15}}
            />
            {errors.soldPrice && errors.soldPrice.type === 'required' ?
            <ErrorTextForm text='Ingresa una cantidad' /> : null}
            {errors.soldPrice && errors.soldPrice.type == 'pattern' ?
            <ErrorTextForm text='Ingresa solo números'/>: null}  
          </View>
          <View>
            <CustomButton style={{padding: 15, marginTop: 15}}
              onPress={handleSubmit(showConfirmationModal)}>
              Vender
            </CustomButton>
          </View>
        </View>
        <ConfirmationModal 
          visible={confirmationModalVisible}
          onDismiss={hideModal}
          title={`¿Está seguro de vender este vehículo por la cantidad de ${currencyFormat(soldPriceModal, '')}?`}
          onSuccess={onSubmit}
        />
      </Portal>
    </Provider>
  )
}

export default SellCarScreen;