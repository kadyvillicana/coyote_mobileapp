import React, { useState } from 'react';
import { TouchableOpacity, View, FlatList } from 'react-native';
import { Modal, Portal, Provider, Searchbar } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

import CustomText from './custom-text';

const CustomDropDown = ({data, defaultText, onItemSelected}) => {
  const { colors } = useTheme();
  const [filteredList, setFilteredList] = useState(data);

  const [visible, setVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState(null)

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: colors.backgroundVariant,
    margin: 15,
    padding: 15, 
  };

  const searchFilterFunction = (query) => {
    const _query = query.toLowerCase();
    const filtered = data.filter((el) => {
      return el.makeName.toLowerCase().includes(_query);
    });
    setFilteredList(filtered);
  }

  // useEffect(() => {
  //   let mounted = true;
  //   async function getMakes() {
  //     const result = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/passenger%20car?format=json');
  //     let json = await result.json();
  //     if(mounted) {
  //       if (json.Results && json.Results.length > 0) {
  //         setMakes(json.Results);
  //       }
  //     }
  //   }
  //   getMakes();
  //   return () => mounted = false;
  // }, []);

  const ItemList = ({item}) => {
    return(
      <TouchableOpacity
        onPress={() => onSelectedItem(item)}>
        <View style={{padding: 15}}>
          <CustomText>
            {item.makeName}
          </CustomText>
        </View>
      </TouchableOpacity>
    )
  }

  const onSelectedItem = (item) => {
    hideModal();
    setItemSelected(item);
    setFilteredList(data);
    onItemSelected(item);
  }

  return(
    <Provider>
      <View style={{flex:1}}>
        <TouchableOpacity
          onPress={showModal}>
          <View style={
            {
              borderRadius: 15,
              borderColor: 'yellow',
              borderWidth: 1,
              justifyContent:'center',
              padding: 15,
              }}>
            <CustomText
              fontSize='medium'>
              {itemSelected ? itemSelected.makeName : defaultText}</CustomText>
          </View>
        </TouchableOpacity>
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Searchbar
            placeholder="Search"
            onChangeText={text => searchFilterFunction(text)}
            autoCorrect={false}
          />
          <FlatList
            data={filteredList}
            renderItem={ItemList}
            keyExtractor={item => item.id}
          />
        </Modal>
      </Portal>
    </Provider>
  );
}

export default CustomDropDown;