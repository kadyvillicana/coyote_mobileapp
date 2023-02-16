import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { CustomHeaderChild } from '../components';

const GetCarFrom = ({route, navigation}) => {

	// const {colors} = useTheme();
  const carId = route.params.carId;
  const [car, setCar] = useState({});

  // const [state, setState] = React.useState({ open: false });

  useEffect(() => {
    let mounted = true;
    async function getCar() {
      const car = await carActions.getCarById(carId);
      if(mounted) {
        setCar(car);
      }
    }
    getCar();
    return () => mounted = false;
  }, []);

  return(
    <View>
      <CustomHeaderChild
			title='¿Quién te lo vendió?'
			customPadding={35}
      />
    </View>
  )
};

export default GetCarFrom;