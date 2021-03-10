import React, {useEffect, useState} from 'react';
import { FlatList, View } from 'react-native';
import { CarCardVertical, CustomFab, CustomHeader, CustomText, MainScreenContainer } from '../components';
import Moment from 'moment';
import { carActions } from '../data';
import { TouchableOpacity } from 'react-native-gesture-handler';
import currencyFormat from '../utils';

const RevenueScreen = () => {

  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const firstDayMonth = Moment().startOf('month');
  const lastDayMonth = Moment().endOf('month');
  
  useEffect(() => {
    let mounted = true;
    async function getCars() {
      const cars = await carActions.getCarsByPeriod(firstDayMonth, lastDayMonth);
      if(mounted) {
        setCars(cars);
        setIsLoading(false);
      }
    }
    getCars();
    return () => mounted = false;
  }, []);

  const MainBody = () => {
    return(
      <View
        style={{flex: 1, padding: 15}}>
        <CustomHeader
          header='Ingresos'
          subHeader={'Utilidad: ' + '$122,000'}
        />
        <View>
          <CustomText
            fontType='bold'
            fontSize='medium'>
              Periodo: {`${firstDayMonth.format('DD MMM')}/${lastDayMonth.format('DD MMM')} `}
          </CustomText>
        </View>
        <FlatList 
          style={{marginTop: 15}}
          data={cars}
          renderItem={
            ({item}) => 
            <TouchableOpacity>
              <CarCardVertical
                title={`${item.make} ${item.version} ${item.model}`}
                subTitleLeft='Utilidad'
                subTitleTextLeft={currencyFormat(item.soldPrice - item.purchasePricePlusOutgoings)}
                subTitleRight='Fecha de venta'
                subTitleTextRight={Moment(item.soldDate).format('DD MMM YY')}
              />
            </TouchableOpacity>
          }
        />
        <CustomFab
          style={{position: 'absolute', bottom: 0, right:0, margin: 30}}
          icon='calendar'
        />
      </View>

    )

  }

  return (
    <MainScreenContainer
      isLoading={isLoading}
      bodyView={ cars && cars.length > 0 ? <MainBody/> : <View></View>}
    />
  );
};

export default RevenueScreen;