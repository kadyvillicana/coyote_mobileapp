import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { CustomHeaderChild, CustomText, CustomTextInput } from '../components';
import CircleButton from '../components/circle-button';
import currencyFormat from '../utils';
import { Provider, Portal, Modal, TextInput} from 'react-native-paper';
import { CustomButton } from '../components/custom-button';


const OutGoingScreen = ({route}) => {
  const [list, setList] = useState(route.params.outgoings);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const removeItem = async id => {
    if(!id) {
      return;
    }
    const filteredData = list.filter(item => item.id !== id);
    setList(filteredData);
  }

  const containerStyle = {
    margin: 15,
    padding: 15, 
  };

  const ItemList = (item) => {
    return(
      <View 
        style={{flexDirection: 'row', padding: 15}}>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <CustomText fontSize='medium'>{item.name}</CustomText>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <CustomText fontSize='medium'>{currencyFormat(item.value)}</CustomText>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around'}}>
            <CircleButton onPress={() => removeItem(item.id)} icon='close'/>
            <CircleButton onPress={showModal} icon='pencil-outline' primary/>
          </View>
      </View>
    );
  }

  return(
    <Provider>
      <View>
        <CustomHeaderChild 
          title='Gastos'
        />
        {/* Header List */}
        <View 
          style={{flexDirection: 'row', padding: 15}}>
            <View style={{flex: 3}}>
              <CustomText fontSize='medium' fontType='bold'>Descripción</CustomText>
            </View>
            <View style={{flex: 2}}>
              <CustomText fontSize='medium' fontType='bold'>Monto</CustomText>
            </View>
            <View style={{flex: 1}}>
              <CustomText></CustomText>
            </View>
        </View>
        <FlatList 
          data={list}
          renderItem={({item}) =>ItemList(item)}
        />
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <View style={{justifyContent: 'center', backgroundColor: '#1b1f23', padding: 15, minHeight: 300}}>
            <CustomTextInput
              mode='outlined'
              label="Descripción"
            />
            <CustomTextInput
              mode='outlined'
              label="Precio"
            />
            <CustomButton style={{padding: 5, marginTop: 15}}>
              Agregar
            </CustomButton>
          </View>
        </Modal>
      </Portal>
    </Provider>
  )
}

export default OutGoingScreen;