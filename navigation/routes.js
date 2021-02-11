import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

// SCREENS
import CarsAvailableScreen from '../screens/cars-available';
import RevenueScreen from '../screens/revenue';

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#fed42a',
      primaryVariant: '#fee585',
      secondary: '#03dac6',
      background: '#202529',
      backgroundVariant: '#2b3137',
      error: '#cf6679',
      text: '#d7d7d8',
      textSecondary: '#55595e',
      border: '#444951',
      card: '#202529',
      white: 'white',
      green: '#03dac6',
      black: '#212629',
    },
  };


// StackNavigator
const AvailableStack = createStackNavigator();
function AvailableStackScreen(){
    return (
        <AvailableStack.Navigator>
            <AvailableStack.Screen name='Home' component={CarsAvailableScreen} options={{headerShown: false}} />
        </AvailableStack.Navigator>
    )
}
const RevenueStack = createStackNavigator();
function RevenueStackScreen(){
    return (
        <RevenueStack.Navigator>
            <RevenueStack.Screen name='Home' component={RevenueScreen} options={{headerShown: false}} />
        </RevenueStack.Navigator>
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
                            iconName = 'car-sport-outline';
                        }
                        if (route.name === 'Ingresos') {
                            iconName = 'trending-up-outline';
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: MyTheme.colors.primary,
                    inactiveTintColor: 'white',
                }}>
                <Tab.Screen name='Disponibles' component={AvailableStackScreen} />
                <Tab.Screen name='Ingresos' component={RevenueStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}