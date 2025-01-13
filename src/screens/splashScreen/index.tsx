import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { splashImage } from '../../constants/images';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthNavigationType } from '../../types/navigation';
import { resetAndNavigate } from '../../navigation/navigationUtils';

const SplashScreen = () => {
    const navigation = useNavigation<NavigationProp<AuthNavigationType, 'SplashScreen'>>();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const userInfo = await AsyncStorage.getItem('userInfo');

                if (userInfo) {
                    resetAndNavigate('HomeScreen');
                } else {
                    resetAndNavigate('WelcomeScreen');
                }
            } catch (error) {
                console.error('Error retrieving user info:', error);
                navigation.navigate('WelcomeScreen');
            }
        };

        const timeout = setTimeout(() => {
            checkUser();
        }, 3000);

        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <Image source={splashImage} style={{ width: 300, height: 300 }} />
            </View>
        </View>
    );
};


export default SplashScreen;