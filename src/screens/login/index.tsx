import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import CustomButton from '../../components/Button/Button';
import { primaryColor } from '../../constants/colors';
import { loginImage } from '../../constants/images';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthNavigationType } from '../../types/navigation';
import CustomInput from '../../components/CustomTextInput/CustomTextInput';
import { FieldValues, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../types/zod/loginzod';
import auth from '@react-native-firebase/auth'
import { FirebaseError } from 'firebase/app';
import { resetAndNavigate } from '../../navigation/navigationUtils';

const AuthLoginScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthNavigationType>>();
  const { control, handleSubmit, formState: { isLoading }, reset } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (value: FieldValues) => {
    try {
      await auth().signInWithEmailAndPassword(value.email, value.password);
      resetAndNavigate('HomeScreen')
    } catch (error: any) {
      const err = error as FirebaseError;
      Alert.alert('Login failed', err.message);
    } finally {
      reset();
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}>
      <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, gap: 20 }}
            keyboardShouldPersistTaps="handled">
            <Image source={loginImage} style={{ width: "100%", height: 250 }} />

            <View>
              <Text style={{ color: primaryColor, fontWeight: 'bold', fontSize: 18 }}>Welcome back!</Text>
              <Text style={{ color: '#999999', fontWeight: 'bold', fontSize: 18 }}>Enter your credentials to continue.</Text>
            </View>

            <View style={{ gap: 10 }}>
              <CustomInput control={control} name="email" placeholder="Email Address" />
              <CustomInput control={control} name="password" placeholder="Password" />
            </View>

            <View>
              <CustomButton isSubmitting={isLoading} text="Log in" onPress={handleSubmit(onSubmit)} />
            </View>

            <Text style={{ textAlign: 'center' }}>
              By logging, you are agreeing with our
              <Text style={{ color: primaryColor, textDecorationLine: 'underline' }}> Terms of Use</Text> and <Text style={{ color: primaryColor, textDecorationLine: 'underline' }}>Privacy Policy</Text>
            </Text>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AuthLoginScreen;

const styles = StyleSheet.create({});
