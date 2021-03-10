import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';


export default function CustomActivityIndicator(){
    const theme = useTheme();
    return (
        <View style={{flex: 1, justifyContent: 'center',}}>
            <ActivityIndicator animating={true}  color={theme.colors.primary}/>
        </View>
    )
}