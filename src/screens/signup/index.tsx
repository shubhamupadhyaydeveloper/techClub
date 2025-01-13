import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/Button/Button';
import { primaryColor, secondaryTextColor } from '../../constants/colors';
import SmallImageButton from '../../components/SmallImageButton/SmallImageButton';
import SvgGetStarted from '../../../assets/svg-image/GetStarted';
import { getStartedImage, loginImage, signupImage } from '../../constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthNavigationType } from '../../types/navigation';
import CustomInput from '../../components/CustomTextInput/CustomTextInput';
import { FieldValues, useForm } from 'react-hook-form';
import AntIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import auth from '@react-native-firebase/auth'
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../types/zod/loginzod';
import { FirebaseError } from 'firebase/app';


const AuthSignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthNavigationType>>()
  const { control, formState: { errors }, handleSubmit, reset } = useForm({
    resolver: zodResolver(signupSchema)
  })
  const [policyAgree, setPoliyAgree] = useState<boolean>(false)

  const OnSubmit = async (value: FieldValues) => {
    if (!policyAgree) return;
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(value.email, value.password);
      await userCredential.user.updateProfile({
        displayName: value.name,
      });
      navigation.navigate('AuthLogin')
    } catch (error: any) {
      const err = error as FirebaseError;
      Alert.alert('Registration failed', err.message);
    } finally {
      reset();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
      <SafeAreaView style={{ flex: 1, }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, gap: 20 }}
            keyboardShouldPersistTaps="handled">

            <Image source={signupImage} style={{ width: "100%", height: 250 }} />

            <View>
              <Text style={{ color: primaryColor, fontWeight: 'bold', fontSize: 18 }}>Create account!</Text>
              <Text style={{ color: '#999999', fontWeight: 'bold', fontSize: 18 }}>Sig up to get started.</Text>
            </View>
            <View style={{ gap: 10 }}>
              <CustomInput control={control} name='name' placeholder='Name' />
              <CustomInput control={control} name='email' placeholder='Email Address' />
              <CustomInput control={control} name='password' placeholder='Password' />
              <CustomInput control={control} name='confirmPassword' placeholder='Confirm Password' />
            </View>


            <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
              <TouchableOpacity onPress={() => setPoliyAgree(prev => !prev)}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 8,
                    borderWidth: policyAgree ? 0 : 1,
                    borderColor: '#dadada',
                    backgroundColor: policyAgree ? primaryColor : 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {policyAgree ? (
                    <EntypoIcon name="check" size={16} color="white" />
                  ) : null}
                </View>
              </TouchableOpacity>

              <Text style={{ textAlign: 'center', flexWrap: 'wrap', }}>
                By registering, you are agreeing with
                <Text style={{ color: primaryColor, textDecorationLine: 'underline' }}> Terms of Use</Text> and <Text style={{ color: primaryColor, textDecorationLine: 'underline' }}>Privacy Policy</Text>
              </Text>
            </View>
            <View>
              <CustomButton isDisable={!policyAgree} text='Register' onPress={handleSubmit(OnSubmit)} bgColor={policyAgree ? primaryColor : '#dadada'} textColor={policyAgree ? 'white' : 'black'} />
            </View>

            <View style={{ height: 50 }} />


          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default AuthSignUpScreen;