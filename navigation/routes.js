import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

// SCREENS
import AddCarScreen from '../screens/add-car';
import CarDetailsScreen from '../screens/car-details';
import ChangeDateScreen from '../screens/change-date';
import EditCarScreen from '../screens/edit-car';
import HomeScreen from '../screens/home';
import RevenueScreen from '../screens/revenue';
import SellCarScreen from '../screens/sell-car';
import SoldHistoryScreen from '../screens/sold-history';
import OutGoingScreen from '../screens/outgoings';
import PaymentScreen from '../screens/payments';
import ClientScreen from '../screens/clients';
import EditClientNameScreen from '../screens/edit-client-name';
import CarsByClientScreen from '../screens/cars-by-client';

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#fed42a',
      primaryVariant: '#fee585',
      secondary: '#03dac6',
      background: '#1b1f23',
      backgroundVariant: '#2b3137',
      error: '#cf6679',
      text: '#fdfdfe',
      textSecondary: '#7c7e82',
      border: '#444951',
      card: '#1b1f23',
      white: 'white',
      green: '#03dac6',
      black: '#212629',
    },
  };

const customHeaderBar = {
    headerTransparent: true,
    headerTitle: '',
    headerStyle: {
        backgroundColor: MyTheme.colors.primary,
    },
    headerTintColor: MyTheme.colors.black,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}


// StackNavigator
const HomeStack = createStackNavigator();
function HomeStackScreen(){
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name='Home' component={HomeScreen} options={{headerShown: false}} />
            <HomeStack.Screen name='Outgoings' component={OutGoingScreen} options={customHeaderBar} />
            <HomeStack.Screen name='AddCar' component={AddCarScreen} options={customHeaderBar} />
            <HomeStack.Screen name='CarDetails' component={CarDetailsScreen} options={customHeaderBar} />
            <HomeStack.Screen name='EditClient' component={EditClientNameScreen} options={customHeaderBar} />
            <HomeStack.Screen name='ChangeDate' component={ChangeDateScreen} options={customHeaderBar} />
            <HomeStack.Screen name='EditCar' component={EditCarScreen} options={customHeaderBar} />
            <HomeStack.Screen name='SellCar' component={SellCarScreen} options={customHeaderBar} />
            <HomeStack.Screen name='Payments' component={PaymentScreen} options={customHeaderBar} />
        </HomeStack.Navigator>
    )
}

const RevenueStack = createStackNavigator();
function RevenueStackScreen(){
    return (
        <RevenueStack.Navigator>
            <RevenueStack.Screen name='Revenue' component={RevenueScreen} options={{headerShown: false}} />
            <RevenueStack.Screen name='CarDetails' component={CarDetailsScreen} options={customHeaderBar} />
            <RevenueStack.Screen name='Outgoings' component={OutGoingScreen} options={customHeaderBar} />
            <RevenueStack.Screen name='Payments' component={PaymentScreen} options={customHeaderBar} />
            <RevenueStack.Screen name='EditCar' component={EditCarScreen} options={customHeaderBar} />
            <RevenueStack.Screen name='EditClient' component={EditClientNameScreen} options={customHeaderBar} />
            <RevenueStack.Screen name='ChangeDate' component={ChangeDateScreen} options={customHeaderBar} />
        </RevenueStack.Navigator>
    )
}

const ClientStack = createStackNavigator();
function ClientStackScreen(){
    return(
        <ClientStack.Navigator>
            <ClientStack.Screen name='Clientes' component={ClientScreen} options={{headerShown: false}} />
            <ClientStack.Screen name='CarClients' component={CarsByClientScreen} options={customHeaderBar} />
            <ClientStack.Screen name='CarDetails' component={CarDetailsScreen} options={customHeaderBar} />
            <ClientStack.Screen name='Outgoings' component={OutGoingScreen} options={customHeaderBar} />
            <ClientStack.Screen name='Payments' component={PaymentScreen} options={customHeaderBar} />
            <ClientStack.Screen name='EditCar' component={EditCarScreen} options={customHeaderBar} />
            <ClientStack.Screen name='EditClient' component={EditClientNameScreen} options={customHeaderBar} />
            <ClientStack.Screen name='ChangeDate' component={ChangeDateScreen} options={customHeaderBar} />
        </ClientStack.Navigator>
    )
}

const SoldHistoryStack = createStackNavigator();
function SoldHistoryStackScreen(){
    return (
        <SoldHistoryStack.Navigator>
            <SoldHistoryStack.Screen name='Home' component={SoldHistoryScreen} options={{headerShown: false}} />
            <SoldHistoryStack.Screen name='Outgoings' component={OutGoingScreen} options={customHeaderBar} />
            <SoldHistoryStack.Screen name='CarDetails' component={CarDetailsScreen} options={customHeaderBar}/>
            <SoldHistoryStack.Screen name='ChangeDate' component={ChangeDateScreen} options={customHeaderBar} />
            <SoldHistoryStack.Screen name='EditCar' component={EditCarScreen} options={customHeaderBar} />
            <SoldHistoryStack.Screen name='Payments' component={PaymentScreen} options={customHeaderBar} />
            <SoldHistoryStack.Screen name='EditClient' component={EditClientNameScreen} options={customHeaderBar} />
        </SoldHistoryStack.Navigator>
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

                        if (route.name === 'Inicio') {
                            iconName = 'home-outline';
                        }
                        if (route.name === 'Ingresos') {
                            iconName = 'trending-up-outline';
                        }
                        if (route.name === 'Historial') {
                            iconName = 'hourglass-outline';
                        }
                        if (route.name === 'Clientes') {
                            iconName = 'person-outline';
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: MyTheme.colors.primary,
                    inactiveTintColor: 'white',
                }}>
                <Tab.Screen name='Inicio' component={HomeStackScreen} />
                <Tab.Screen name='Ingresos' component={RevenueStackScreen} />
                <Tab.Screen name='Clientes' component={ClientStackScreen} />
                <Tab.Screen name='Historial' component={SoldHistoryStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}