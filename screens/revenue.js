import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { CarCardVertical, CustomFab, CustomHeader, CustomText, MainScreenContainer } from '../components';
import Moment from 'moment';
import { carActions } from '../data';
import { TouchableOpacity } from 'react-native-gesture-handler';
import currencyFormat from '../utils';
import {Portal, Provider, Modal} from 'react-native-paper';

const RevenueScreen = ({navigation}) => {

  const today = new Date();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstDayMonth, setFirstDayMonth] = useState(Moment().startOf('month')) 
  const [lastDayMonth, setLastDayMonth] = useState(Moment().endOf('month'));
  const [revenue, setRevenue] = useState(0);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    margin: 15,
    marginTop: -100,
    padding: 15, 
  };

  const setNewPeriod = async period => {
    setIsLoading(true);
    const newDate = Moment(today).startOf('month').subtract(period, 'M');
    const cars = await carActions.getCarsByPeriod(newDate, lastDayMonth);
    setCars(cars);
    setRevenue(getRevenue(cars));
    setIsLoading(false);
    setFirstDayMonth(newDate);
    hideModal();
  }
  
  useEffect(() => {
    let mounted = true;
    async function getCars() {
      const cars = await carActions.getCarsByPeriod(firstDayMonth, lastDayMonth);
      if(mounted) {
        setCars(cars);
        setRevenue(getRevenue(cars));
        setIsLoading(false);
      }
    }
    getCars();
    return () => mounted = false;
  }, []);

  const getRevenue = (cars) => {
    if(!cars || cars.length <= 0){
      return 0;
    }
    return cars.reduce((sum, {carRevenue}) => sum + carRevenue, 0);
  }

  const NoBody = () => {
    return(
      <Provider>
        <Portal>
          <View style={{flex: 1, padding:  15}}>
            <CustomHeader
              header='Ingresos'
              subHeader={'Utilidad: ' + currencyFormat(revenue, 'Aun no hay ingresos')}
            />
            <View
                style={{alignItems: 'center', justifyContent: 'center', marginTop: 180}}>
                <CustomText
                  style={{marginBottom: 25}}
                  fontType='bold'
                  fontSize='medium'
                >No has tenido ventas en este periodo</CustomText>
              </View>
              <CustomFab
                    style={{position: 'absolute', bottom: 0, right:0, margin: 30}}
                    icon='calendar'
                    onPress={showModal}
                  />
          </View>
          <SelectPeriodModal />
        </Portal>
      </Provider>
    )
  }

  const SelectPeriodModal = () => {
    return(
      <Modal 
          visible={visible} 
          onDismiss={hideModal} 
          contentContainerStyle={containerStyle}
        >
          <View style={{justifyContent: 'center', backgroundColor: '#1b1f23', padding: 15}}>
            <CustomText
              style={{marginTop: 15}}
              fontType='bold'
              fontSize='medium'>
              Selecciona uno de los siguientes periodos
            </CustomText>
            <View style={{marginTop: 15}}>
              <TouchableOpacity
                onPress={() => setNewPeriod(1)}>
                <CustomText style={[styles.periodBox, {borderColor: '#fed42a'}]}>
                  1 mes anterior
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setNewPeriod(3)}>
                <CustomText style={[styles.periodBox, {borderColor: '#fed42a'}]}>
                  3 meses anteriores
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setNewPeriod(6)}>
                <CustomText style={[styles.periodBox, {borderColor: '#fed42a'}]}>
                  6 meses anteriores
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setNewPeriod(12)}>
                <CustomText style={[styles.periodBox, {borderColor: '#fed42a'}]}>
                  1 año
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setNewPeriod(0)}>
                <CustomText style={[styles.periodBox, {borderColor: '#fed42a'}]}>
                  Este mes
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    );
  }

  const MainBody = () => {
    return(
      <Provider>
        <Portal>
          <View
            style={{flex: 1, padding: 15}}>
            <CustomHeader
              header='Ingresos'
              subHeader={'Utilidad: ' + currencyFormat(revenue, 'No hay ingresos')}
            />
            <View>
              <CustomText
                fontType='bold'
                fontSize='medium'>
                  Periodo: {`${firstDayMonth.format('DD MMM YY')} / ${lastDayMonth.format('DD MMM YY')} `}
              </CustomText>
            </View>
            <FlatList 
              style={{marginTop: 15}}
              data={cars}
              renderItem={
                ({item}) => 
                <TouchableOpacity
                  onPress={() => navigation.navigate('CarDetails', {carId: item.id})}>
                  <CarCardVertical
                    title={`${item.make} ${item.version} ${item.model}`}
                    subTitleLeft='Utilidad'
                    subTitleTextLeft={<CustomText 
                      style={[item.carRevenue <= 0 ? {color: '#cf6679'}: {color: '#03dac6'}]}>
                       {currencyFormat(item.carRevenue, 'Sin valor')}</CustomText>}
                    subTitleRight='Fecha de venta'
                    subTitleTextRight={Moment(item.soldDate).format('DD MMM YY')}
                  />
                </TouchableOpacity>
              }
            />
            <CustomFab
              style={{position: 'absolute', bottom: 0, right:0, margin: 30}}
              icon='calendar'
              onPress={showModal}
            />
          </View>
          {/* Add Outgoing Modal  */}
          <SelectPeriodModal />
        </Portal>
      </Provider>
    )

  }

  return (
    <MainScreenContainer
      isLoading={isLoading}
      bodyView={ cars && cars.length > 0 ? <MainBody/> : <NoBody/>}
    />
  );
};

const styles = StyleSheet.create({
  periodBox: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15
  }
})

export default RevenueScreen;