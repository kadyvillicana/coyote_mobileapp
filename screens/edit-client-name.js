import React, {useState} from 'react';
import { View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomHeaderChild, CustomText, CustomTextInput, CircleButton, ErrorTextForm, CustomButton } from '../components';
import { carActions } from '../data';
import { useForm } from 'react-hook-form';

const EditClientNameScreen = ({navigation, route}) => {

  const [clientSuggestions, setClientSuggestions] = useState([]);
  const [clientError, setClientError] = useState(false);
  const car = route.params.car;
  const [client, setClient] = useState(car.clientName);
  
  const { handleSubmit } = useForm({});

  const handleInput = async data => {
    const newClient = {}
    newClient[data] = 'new';
    const res = await carActions.clientSuggestions(data)

    setClientSuggestions({...newClient, ...res});
  }

  const removeClientAndClearSearch = () => {
    setClient('');
    setClientError(false);
    setClientSuggestions([]);
  }

  const onSubmit = async data => {
    let clientName = '';
    if(!client || client.length === 0) {
      setClientError(true);
      // hideModal();
      return
    }
    clientName = client;
    await carActions.updateCarById({
      id: car.id,
      clientName: clientName,
    });

    navigation.goBack();
  }


  const Item = ({item}) => {
    return(
      <TouchableOpacity
          onPress={() => {setClient(item); setClientError(false);}}>
          <View style={{backgroundColor: '#2b3137', padding: 15, borderRadius: 5, marginTop: 15}}>
            <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
              <View style={{justifyContent:'center'}}>
                  <CustomText>
                    {item}
                  </CustomText>
              </View>
              <View>
                <CircleButton icon='checkmark-outline' primary/>
              </View>
            </View>
          </View>
      </TouchableOpacity>
    )
  }

  return(
    <View style={{flex: 1}}>
      <CustomHeaderChild
        title='Editar cliente'
      />
      <View
      style={{flex:1, padding: 15}}>
        <View style={{marginTop: 15}}>
          {
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
                        <CircleButton icon='close' onPress={removeClientAndClearSearch}/>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              :
              <View>
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
                {clientError ?
                <ErrorTextForm text='Debes seleccionar un cliente' /> : null}
              </View>
          }
          <View>
            <CustomButton style={{padding: 15, marginTop: 15}}
              onPress={handleSubmit(onSubmit)}>
              Guardar
            </CustomButton>
          </View>
        </View>
      </View>
    </View>
  )
}

export default EditClientNameScreen;