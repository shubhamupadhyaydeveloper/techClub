import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../components/Button/Button';
import { primaryColor, secondaryTextColor } from '../../constants/colors';
import SmallImageButton from '../../components/SmallImageButton/SmallImageButton';
import SvgGetStarted from '../../../assets/svg-image/GetStarted';
import { appleImage, facebookImage, getStartedImage, googleIconImage } from '../../constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthNavigationType } from '../../types/navigation';

const WelcomeScreen = () => {
    const navigation = useNavigation<NavigationProp<AuthNavigationType>>()

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, gap: 30 }}>
            <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />

            <Image source={getStartedImage} style={{ width: "100%", height: 250 }} />

            <View>
                <Text style={{ color: primaryColor, fontWeight: 'bold', fontSize: 18 }}>Welcome to Tech Club !</Text>
                <Text style={{ color: '#999999', fontWeight: 'bold', fontSize: 18 }}>Everything starts from here!</Text>
            </View>
            <View style={{ gap: 14 }}>
                <CustomButton text='Log in' onPress={() => navigation.navigate('AuthLogin')} />
                <CustomButton text='Register' bgColor='white' textColor={primaryColor} isBorder={true} onPress={() => navigation.navigate('AuthSignUp')} />
            </View>

            <Text style={{ color: '#999999', fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}>Or Connect Via</Text>

            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <SmallImageButton imageUrl={googleIconImage} />
                <SmallImageButton imageUrl={facebookImage} />
                <SmallImageButton imageUrl={appleImage} />
            </View>
        </SafeAreaView>
    );
};


export default WelcomeScreen;

const styles = StyleSheet.create({})