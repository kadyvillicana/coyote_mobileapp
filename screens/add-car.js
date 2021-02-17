import React, { useState } from 'react';
import CustomDropDown from '../components/custom-dropdown';
import CustomText from '../components/custom-text';
import CustomView from '../components/custom-view';

const makes = require('../data/static/makes.json');

const AddCarScreen = () => {

  const [make, setMake] = useState(null);

  if(make){
    return(
      <CustomView>
        <CustomText>
          {make.makeName}
        </CustomText>
      </CustomView>
    )
  }

  return(
    <CustomView>
      <CustomText>
        Agrega un auto
      </CustomText>
      <CustomDropDown 
        data={makes}
        onItemSelected={setMake}
      />
    </CustomView>
  )
}

export default AddCarScreen;