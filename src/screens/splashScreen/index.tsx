import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { splashImage } from '../../constants/images';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthNavigationType } from '../../types/navigation';

const SplashScreen = () => {

    const navigation = useNavigation<NavigationProp<AuthNavigationType, 'SplashScreen'>>()

    useEffect(() => {
        const setTimeOut = setTimeout(() => {
            navigation.navigate('WelcomeScreen')
        }, 3000)

        return () => clearTimeout(setTimeOut)
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View>
                <Image source={splashImage} style={{width : 300,height : 300}} />
            </View>
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({})