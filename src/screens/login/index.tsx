import { Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../components/Button/Button';
import { primaryColor, secondaryTextColor } from '../../constants/colors';
import SmallImageButton from '../../components/SmallImageButton/SmallImageButton';
import SvgGetStarted from '../../../assets/svg-image/GetStarted';
import { getStartedImage, loginImage } from '../../constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthNavigationType } from '../../types/navigation';
import CustomInput from '../../components/CustomTextInput/CustomTextInput';
import { FieldValues, useForm } from 'react-hook-form';

const AuthLoginScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthNavigationType>>()
  const { control, formState: { errors }, handleSubmit } = useForm()
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>

      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, gap: 20 }}>
        <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />

        <Image source={loginImage} style={{ width: "100%", height: 250 }} />

        <View>
          <Text style={{ color: primaryColor, fontWeight: 'bold', fontSize: 18 }}>Welcome back !</Text>
          <Text style={{ color: '#999999', fontWeight: 'bold', fontSize: 18 }}>Enter your credentials to continue.</Text>
        </View>
        <View style={{ gap: 10 }}>
          <CustomInput control={control} name='email' placeholder='Email Address' />
          <CustomInput control={control} name='password' placeholder='Password' />
        </View>

        <View>
          <CustomButton text='Log in' />
        </View>

        <Text style={{ textAlign: 'center' }}>
          By logging, you are agreeing with our
          <Text style={{ color: primaryColor, textDecorationLine: 'underline' }}> Terms of Use</Text> and <Text style={{ color: primaryColor, textDecorationLine: 'underline' }}>Privacy Policy</Text>
        </Text>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default AuthLoginScreen;

const styles = StyleSheet.create({})