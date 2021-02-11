import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from '../components/custom-text';
import CustomView from '../components/custom-view';
import { carActions } from '../data';

const CarsAvailableScreen = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    const cars = carActions.getAllCars();
    setList(cars);
  }, [])
 
  return(
    <CustomView>
      <View style={[styles.headerContainer]}>
        <View>
            <CustomText fontSize='big'>Inversión $434,323</CustomText>
            <CustomText>BBBBB</CustomText>
        </View>
      </View>
    </CustomView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
    paddingTop: 50,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 30,
    flexDirection: 'row',
    borderColor: 'blue',
},
})

export default CarsAvailableScreen;