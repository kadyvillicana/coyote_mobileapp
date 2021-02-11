import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
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
      <Text>
        HEllo
      </Text>
    </CustomView>
  )
}

export default CarsAvailableScreen;