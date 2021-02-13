import React from 'react';
import CustomActivityIndicator from './custom-activity-indicator';
import CustomView from './custom-view';

const MainScreenContainer = ({isLoading, bodyView}) => {

  if(isLoading){
    return(
      <CustomActivityIndicator />
    )
  }

  return bodyView;

}

export default MainScreenContainer;