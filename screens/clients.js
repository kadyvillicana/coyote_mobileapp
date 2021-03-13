import React, {useState, useEffect} from 'react';
import { FlatList, View } from 'react-native';
import { CustomHeader, MainScreenContainer } from '../components';
import { carActions } from '../data';

const ClientScreen = () => {

  const [clients, setClients] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function getClients() {
      const clients = await carActions.getSoldCreditClients();
      if(mounted){
        setClients(clients);
        setLoading(false);
      }
    }
    getClients();
    return () => mounted = false;
  }, []);

  const MainBody = () => {
    return(
      <View style={{padding: 15}}>
        <CustomHeader 
          header='Clientes'
        />
        {/* <FlatList
          data={clients}
          renderItem={

          }
        /> */}
      </View>
    );
  }

  return(
    <MainScreenContainer
      isLoading={loading}
      bodyView={<MainBody/>}
    />
  )
}

export default ClientScreen;