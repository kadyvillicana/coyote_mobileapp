import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { CustomHeaderChild, CustomText } from '../components';
import CircleButton from '../components/circle-button';
import currencyFormat from '../utils';


const OutGoingScreen = ({route}) => {
  const [list, setList] = useState(route.params.outgoings);

  const removeItem = async id => {
    if(!id) {
      return;
    }
    const filteredData = list.filter(item => item.id !== id);
    setList(filteredData);
  }

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
            <CircleButton icon='pencil-outline' primary/>
          </View>
      </View>
    );
  }

  return(
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
  )
}

export default OutGoingScreen;