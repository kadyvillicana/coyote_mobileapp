import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

const CustomText = ({children, fontType, fontSize, style, secondaryColor, primaryColor, numberOfLines}) => {

    const { colors } = useTheme();

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

    getFontSize = (size) => {
        switch(size){
            case 'regular':
                return 18;
            case 'big':
                return 26;
            case 'medium':
                return 14;
            case 'small':
                return 12;
            default:
                return 18;
        }
    }

    const font = getFontType(fontType);
    const size = getFontSize(fontSize);
    

    return(
        <Text
            numberOfLines={numberOfLines} 
            style={[
                {
                    color: secondaryColor ? colors.textSecondary : primaryColor ? colors.primary : colors.text,
                    fontSize: size,
                    fontFamily: font
                },
                style,
            ]
            }>
            {children}
        </Text>
    )
}

export default CustomText;