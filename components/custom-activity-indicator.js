import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import CustomView from './custom-view';


export default function CustomActivityIndicator(){
    const theme = useTheme();
    return (
        <CustomView style={{justifyContent: 'center',}}>
            <ActivityIndicator animating={true}  color={theme.colors.primary}/>
        </CustomView>
    )
}