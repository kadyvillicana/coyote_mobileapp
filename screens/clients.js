import React, {useState, useEffect} from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { CustomHeader, MainScreenContainer, CustomText, CarCardVertical, CustomFab } from '../components';
import { FAB } from 'react-native-paper';
import { carActions } from '../data';
import currencyFormat from '../utils';
import { useTheme, useFocusEffect } from '@react-navigation/native';

const ClientScreen = ({navigation}) => {

  const [clients, setClients] = useState({});
  const [totalDebt, setTotalDebt] = useState(0);
  const [loading, setLoading] = useState(true);
  const {colors} = useTheme();
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  useEffect(() => {
    let mounted = true;
    async function getClients() {
      const clients = await carActions.getSoldCreditClientsWithDebt();
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

  const displayAllClients = () => {
    return false;
  }

  const FABGroupActions = () => {
    return [
      {
        icon: 'currency-usd',
        label: 'Vigentes',
        onPress: () => console.log('Vigentes'),
      },
      { 
        icon: 'account-group',
        label: 'Todos',
        onPress: () => console.log('Todos') 
      },
    ];
  }
  
  useFocusEffect(
    React.useCallback(() => {
      let mounted= true;
      async function getClients(){
        const _clients = await carActions.getSoldCreditClientsWithDebt();
        let _totalDebt = 0;
        for (const client in _clients) {
          _totalDebt += _clients[client].reduce((sum, {carCreditDebt}) => sum + carCreditDebt, 0);
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
      <View style={{flex: 1, padding: 15}}>
        <CustomHeader 
          header='Clientes'
          subHeader={`Adeudo: ${currencyFormat(totalDebt, 'Sin Adeudo')}` }
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
        <FAB.Group
          open={open}
          icon={open ? 'close' : 'dots-vertical'}
          fabStyle={{backgroundColor: colors.primary}}
          theme={{dark: true}}
          actions={FABGroupActions()}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
              //<ion-icon name="ellipsis-vertical-outline"></ion-icon>
            }
          }}
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