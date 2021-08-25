import React, {useState} from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import { CustomButton, CustomHeaderChild, CustomText } from '../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { carActions } from '../data';
import Moment from 'moment';
import { useTheme } from '@react-navigation/native';

const ChangeDateScreen = ({route, navigation}) => {
  const {colors} = useTheme();
  const [show, setShow] = useState(false);
  const car = route.params.car;
  const dateToChange = route.params.dateToChange;
  const [date, setDate] = useState(new Date(car[dateToChange]));


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
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
            {
              show &&
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='date'
                is24Hour={true}
                display="default"
                onChange={onChange}
                maximumDate={new Date()} 
              />
            }
            {
              Platform.OS !== 'ios' ?
              <TouchableOpacity
              onPress={() => setShow(true)}>
                <View>
                  <CustomText
                    style={{backgroundColor: colors.backgroundVariant, borderRadius: 5, borderColor: colors.border, borderWidth: 1, padding: 15}}
                  >{Moment(date).format('DD MMM YYYY')}</CustomText>
                </View>
              </TouchableOpacity>
              : null
            }
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