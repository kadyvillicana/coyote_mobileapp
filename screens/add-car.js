import React, { useState } from 'react';
import CustomDropDown from '../components/custom-dropdown';
import CustomHeader from '../components/custom-header';
import CustomText from '../components/custom-text';
import CustomView from '../components/custom-view';

const AddCarScreen = () => {

  return(
    <CustomView>
      <CustomHeader 
        header='Agrega un auto'
        subHeader=''
      />
    </CustomView>
  )
}

export default AddCarScreen;