import React from 'react';
import { Text } from 'react-native';

const CustomText = ({children, fontType, style}) => {

    getFontType = (font) => {
        switch(font){
            case 'regular':
                return 'Quicksand-Regular';
            case 'bold':
                return 'Quicksand-Bold';
            case 'light':
                return 'Quicksand-Light';
            case 'medium':
                return 'Quicksand-Medium';
            case 'semibold':
                return 'Quicksand-SemiBold';
            default: 
                return'Quicksand-Regular';
        }
    }

    const font = getFontType(fontType);

    return(
        <Text 
            style={
                [style]
            }>
            {children}
        </Text>
    )
}

export default CustomText;