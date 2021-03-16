import React, {useState, useEffect} from 'react';
import { FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomHeader, MainScreenContainer, CustomText, CarCardVertical } from '../components';
import ClientCard from '../components/client-card';
import { carActions } from '../data';
import currencyFormat from '../utils';
import { useFocusEffect } from '@react-navigation/native';

const ClientScreen = ({navigation}) => {

  const [clients, setClients] = useState({});
  const [totalDebt, setTotalDebt] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function getClients() {
      const clients = await carActions.getSoldCreditClients();
      let _totalDebt = 0;
      for (const client in clients) {
        _totalDebt += clients[client].reduce((sum, {carCreditDebt}) => sum + carCreditDebt, 0);
      }
      if(mounted){
        setClients(clients);
        setTotalDebt(_totalDebt);
        setLoading(false);
      }
    }
    getClients();
    return () => mounted = false;
  }, []);
  
  useFocusEffect(
    React.useCallback(() => {
      let mounted= true;
      async function getClients(){
        const _clients = await carActions.getSoldCreditClients();
        let _totalDebt = 0;
        for (const client in clients) {
          _totalDebt += clients[client].reduce((sum, {carCreditDebt}) => sum + carCreditDebt, 0);
        }
        if(mounted){
          setClients(_clients);
          setTotalDebt(_totalDebt);
        }
      }
      getClients();
      return () => mounted = true;
    }, [])
  );

  const ClientItem = (props) => {
    const {name, item} = props;
    const debt = item.reduce((sum, {carCreditDebt}) => sum + carCreditDebt, 0)
    return(
      <CarCardVertical 
      title={name}
      subTitleLeft='Adeudo'
      subTitleRight='Vehículos vendidos'
      subTitleTextRight={item.length}
      subTitleTextLeft={<CustomText 
        style={[debt > 0 ? {color: '#cf6679'}: {color: '#03dac6'}]}>
         {currencyFormat(debt, 'Sin adeudo')}</CustomText>}
      />
    )
  }

  const NoData = () => {
    return(
      <View style={{padding: 15}}>
        <CustomHeader 
          header='Clientes'
        />
        <View
          style={{alignItems: 'center', justifyContent: 'center', marginTop: 180}}>
          <CustomText
            style={{marginBottom: 25}}
            fontType='bold'
            fontSize='medium'
          >Aún no has tenido ventas a crédito</CustomText>
        </View>
      </View>
    )
  }

  const MainBody = () => {
    return(
      <View style={{padding: 15}}>
        <CustomHeader 
          header='Clientes'
          subHeader={`Adeudo Actual: ${currencyFormat(totalDebt, 'Sin Adeudo')}` }
        />
        <FlatList
          data={Object.keys(clients)}
          keyExtractor={item => item}
          renderItem={
            ({item}) => <TouchableOpacity
              onPress={() => navigation.navigate('CarClients', {clientName: item})}>
              <ClientItem
                name={item}
                item={clients[item]}
              />
               
            </TouchableOpacity>
          }
        />
      </View>
    );
  }

  return(
    <MainScreenContainer
      isLoading={loading}
      bodyView={Object.keys(clients).length > 0 ? <MainBody/> : <NoData/>}
    />
  )
}

export default ClientScreen;