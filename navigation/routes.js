import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';

// SCREENS
import CarsAvailableScreen from '../screens/cars-available';
import RevenueScreen from '../screens/revenue';

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#bc86fc',
      primaryVariant: '#3700b3',
      secondary: '#03dac6',
      background: '#121212',
      error: '#cf6679',
      text: '#ffffff',
      textSecondary: '#8b8c8b',
      border: '#292929',
      card: '#292929',
      white: 'white',
      green: '#03dac6'
    },
  };


// StackNavigator
const AvailableStack = createStackNavigator();
function AvailableStackScreen(){
    return (
        <AvailableStack.Navigator>
            <AvailableStack.Screen name='Home' component={CarsAvailableScreen} options={{headerTitle: 'Disponibles'}} />
        </AvailableStack.Navigator>
    )
}
const Tab = createBottomTabNavigator();


export default () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <Tab.Navigator
                screenOptions={( { route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Disponibles') {
                            iconName = 'automobile';
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: MyTheme.colors.primary,
                    inactiveTintColor: 'red',
                }}>
                <Tab.Screen name='Disponibles' component={AvailableStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}