import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';

const CustomView = ({children, style}) => {
  const { colors } = useTheme();
  console.log(colors);

  return(
      <View 
          style={
              [style,
              { backgroundColor: colors.background, flex:1 }]
          }>
          {children}
      </View>
  );
}

export default CustomView;