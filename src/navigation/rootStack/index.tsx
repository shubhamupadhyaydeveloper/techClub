import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthNavigationType } from '../../types/navigation'
import WelcomeScreen from '../../screens/welcomeScreen'
import AuthLoginScreen from '../../screens/login'
import AuthSignUpScreen from '../../screens/signup'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

const RootStackNavigator = () => {
    const myTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'white'
        }
    }

    const RookStack = createNativeStackNavigator<AuthNavigationType>()
    return (
        <NavigationContainer theme={myTheme}>
            <RookStack.Navigator screenOptions={{ headerShown: false, animation: 'ios_from_right' }} initialRouteName='WelcomeScreen'>
                <RookStack.Screen
                    name='WelcomeScreen'
                    component={WelcomeScreen}
                />
                <RookStack.Screen
                    name='AuthLogin'
                    component={AuthLoginScreen}
                />
                <RookStack.Screen
                    name='AuthSignUp'
                    component={AuthSignUpScreen}
                />
            </RookStack.Navigator>
        </NavigationContainer>
    )
}

export default RootStackNavigator;