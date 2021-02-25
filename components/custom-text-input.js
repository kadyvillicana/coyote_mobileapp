import React from 'react';
import { TextInput } from "react-native-paper";
import { useTheme } from '@react-navigation/native';

const CustomTextInput = (props) =>{
  const {colors} = useTheme();
  const {style} = props;
  return (
    <TextInput
        {...props}
        style=
          {[
              style,
              {
                  backgroundColor: colors.backgroundVariant,
              }
          ]}
        theme=
          {{ 
              colors: { 
                  error: colors.error,
                  text: colors.white, 
                  primary: colors.primary,
                  placeholder: colors.textSecondary,
              },
              fonts: {
                      regular: {
                          fontFamily: 'Quicksand-Regular'
                      }
              }
          }}
    />
  )
}

export default CustomTextInput;