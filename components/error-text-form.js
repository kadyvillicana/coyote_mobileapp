import React from 'react';
import { useTheme } from '@react-navigation/native';
import CustomText from './custom-text';

const ErrorTextForm = ({text}) => {
  const { colors } = useTheme();
  return (
    <CustomText
      fontSize='medium'
      fontType='bold'
      style={{paddingTop: 15, paddingBottom: 15, color: colors.error}}>
        {text ? text : ''}
    </CustomText>
  )
}

export default ErrorTextForm;