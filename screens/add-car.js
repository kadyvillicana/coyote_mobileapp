import React from 'react';
import CustomText from '../components/custom-text';
import CustomView from '../components/custom-view';

const makes = require('../data/static/makes.json');

const AddCarScreen = () => {
  return(
    <CustomView>
      <CustomText>
        Agrega un auto
      </CustomText>
    </CustomView>
  )
}

export default AddCarScreen;