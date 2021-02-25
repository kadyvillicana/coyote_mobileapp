import React from 'react';
import {FAB} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';

const CustomFab = (props) => {
  const {colors} = useTheme();
  return(
    <FAB
      {...props}
      style={{backgroundColor: colors.primary}}
    />
  );
}

export default CustomFab;