import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthNavigationType } from '../../types/navigation'
import WelcomeScreen from '../../screens/welcomeScreen'
import AuthLoginScreen from '../../screens/login'
import AuthSignUpScreen from '../../screens/signup'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import TestingPage from '../../screens/testing'
import SplashScreen from '../../screens/splashScreen'
import { navigationRef } from '../navigationUtils'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import HomeScreen from '../../screens/home'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RootStackNavigator = () => {
    const [initialize, setInitialize] = useState(true)
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>()

    const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
      console.log('onAuthStateChanged',user)
      setUser(user)
      
      await AsyncStorage.setItem('userInfo',JSON.stringify(user))
    }

    useEffect(() => {
        const subscribe = auth().onAuthStateChanged(onAuthStateChanged)
        return subscribe;
    }, [])

    const myTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'white'
        }
    }

    const RookStack = createNativeStackNavigator<AuthNavigationType>()
    return (
        <NavigationContainer ref={navigationRef} theme={myTheme}>
            <RookStack.Navigator screenOptions={{ headerShown: false, animation: 'ios_from_right' }} initialRouteName='SplashScreen'>
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
                <RookStack.Screen
                    name='SplashScreen'
                    component={SplashScreen}
                />
                <RookStack.Screen
                    name='HomeScreen'
                    component={HomeScreen}
                />
            </RookStack.Navigator>
        </NavigationContainer>
    )
}

export default RootStackNavigator;