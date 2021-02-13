import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

const CustomView = ({children, style}) => {
  const { colors } = useTheme();

  return(
      <View 
          style={
              [style,
              { 
                backgroundColor: colors.background, 
                flex:1,
                padding: 15,
                paddingTop: 30,
              }]
          }>
          {children}
      </View>
  );
}

export default CustomView;