import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from '../components/custom-text';
import CustomView from '../components/custom-view';
import { carActions } from '../data';

const CarsAvailableScreen = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function getCars() {
      const cars = await carActions.getAvailableCars();
      if(mounted) {
        setList(cars);
        setIsLoading(false);
      }
    }
    getCars();
    return () => mounted = false;
  }, []);
 
  return(
    <CustomView>
      <View style={[styles.headerContainer]}>
        <View>
            <CustomText fontSize='big' fontType='bold'>Autos Disponibles</CustomText>
            <View style={{marginTop: 15}}>
              <CustomText
                secondaryColor 
                fontSize='medium'>Inversión total de: $445,0404</CustomText>
            </View>
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