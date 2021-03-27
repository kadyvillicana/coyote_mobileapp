import React, {useState} from 'react';
import { View } from 'react-native';
import { CustomButton, CustomHeaderChild, CustomText } from '../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { carActions } from '../data';

const ChangeDateScreen = ({route, navigation}) => {
  const car = route.params.car;
  const dateToChange = route.params.dateToChange;
  const [date, setDate] = useState(new Date(car[dateToChange]));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const onSubmit = async i => {
    await carActions.updateCarById({
      id: car.id,
      [dateToChange]: date,
    });
    navigation.goBack();
  }

  return(
    <View style={{flex: 1}}>
      <CustomHeaderChild
        title='Cambiar fecha'/>
        <View style={{justifyContent:'center', flex: 1, padding: 15}}>
          <CustomText>
            Presione la fecha para asignar una nueva
          </CustomText>
          <View style={{marginTop: 30}}>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode='date'
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          </View>
          <CustomButton 
            onPress={onSubmit}
            style={{padding: 15, marginTop: 30}}>
            Guardar
          </CustomButton>
        </View>
    </View>
  )
}

export default ChangeDateScreen;