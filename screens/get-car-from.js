import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { CustomHeaderChild, CustomText, CustomTextInput, ErrorTextForm, CustomButton } from '../components';
import { carActions } from '../data';

const GetCarFrom = ({route, navigation}) => {

	// const {colors} = useTheme();
  // const [car, setCar] = useState({});
  const _car = route.params.car;

  const [sellerSuggestions, setSellerSuggestions] = useState([]);
  const [seller, setSeller] = useState('');
  const [sellerError, setSellerError] = useState(false);
  const { handleSubmit, errors, control } = useForm({});

  // if(_car) {
  //   console.log(JSON.parse(_car))
  // }


  const handleInput = async data => {
    const newClient = {}
    newClient[data] = 'new';
    const res = await carActions.sellerSuggestions(data)
    console.log(data);

    // setSellerSuggestions({...newClient, ...res});
  }

  const onSubmit = async ()  => {
    const newCar = JSON.parse(_car);
    let _seller = null;
    if(seller){
      _seller = {
        id: Math.round(Math.random() * 1000000) + '',
        name: seller
      }
    }
    await carActions.saveCar({
      ...newCar,
      getFrom: _seller,
    });

    navigation.popToTop();
  }

  // const [state, setState] = React.useState({ open: false });

  // useEffect(() => {
  //   let mounted = true;
  //   async function getCar() {
  //     const car = await carActions.getCarById(carId);
  //     if(mounted) {
  //       setCar(car);
  //     }
  //   }
  //   getCar();
  //   return () => mounted = false;
  // }, []);

  const Item = ({item}) => {
    return(
      <TouchableOpacity
          onPress={() => {setSeller(item); setSellerError(false);}}>
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
			title='¿Quién te lo vendió?'
      />
      <View style={{justifyContent:'center', flex: 1, padding: 15}}>
        <View>
          <CustomText>
            Aqui puedes agregar quien te vendió el auto.
          </CustomText>
          <CustomText style={{marginTop: 15}} fontSize={'small'} fontType={'light'}>
            Sí no lo deseas agregar, presiona CONTINUAR.
          </CustomText>
        </View>
        <View style={{marginTop: 15}}>
          <CustomText fontSize='medium' fontType='bold'>
            Ingresa el nombre del cliente
          </CustomText>
          <CustomTextInput 
            style={{marginTop: 15, marginBottom: 15}}
            label='Nombre del vendedor'
            mode='outlined'
            onChangeText={sellerName => handleInput(sellerName)}
          />
          <FlatList
            keyExtractor={item => item}
            data={Object.keys(sellerSuggestions)}
            renderItem={({item}) => <Item item={item}/>}
          />
          {sellerError ?
          <ErrorTextForm text='Debes seleccionar un cliente' /> : null}
          <CustomButton
                onPress={() => handleSubmit(onSubmit())}
                style={{padding: 15, marginTop: 15}}>
                continuar
          </CustomButton>
        </View>
      </View>
    </View>
  )
};

export default GetCarFrom;