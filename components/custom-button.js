import React from 'react';
import { Button } from "react-native-paper";
import { useTheme } from '@react-navigation/native';

const CustomButton = (props) => {
  const {colors} = useTheme();
  const {style, children, mode, warningColor} = props;
  return (
    <Button
      {...props}
      mode={mode ? mode : 'contained'}
      style=
        {[
            style,
            {backgroundColor: warningColor ? colors.error : colors.primary}
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
    >
      {children}
    </Button>
  )
}

export default CustomButton;