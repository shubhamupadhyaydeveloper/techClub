import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { resetAndNavigate } from '../../navigation/navigationUtils'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AuthNavigationType } from '../../types/navigation'

const HomeScreen = () => {
  const [userInfo, setUserInfo] = useState<FirebaseAuthTypes.User | null>()
  const navigation = useNavigation<NavigationProp<AuthNavigationType>>()

  useEffect(() => {
    const getInfo = async () => {
      const user = await AsyncStorage.getItem('userInfo')
      if (user) {
        const parseUser = JSON.parse(user)
        setUserInfo(parseUser)
      }
    }

    getInfo()
  }, [])

  const handleLogout = async () => {
    // await auth().signOut();
    await AsyncStorage.removeItem('userInfo');
    setUserInfo(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'WelcomeScreen' }],
    });
  }



  console.log('userInfo', userInfo)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to Tech club</Text>
      <Text>username : {userInfo?.displayName}</Text>
      <Text>email : {userInfo?.email}</Text>
      <Text>email Verified : {userInfo?.emailVerified === true ? "Yes Verified" : "Not Verified"}</Text>
      <Text>Phone No : {userInfo?.phoneNumber || 'Not given'}</Text>

      <TouchableOpacity onPress={handleLogout} style={{ marginTop: 20, padding: 10, borderRadius: 8, backgroundColor: 'red' }}>
        <Text style={{ color: 'white' }}>logout</Text>
      </TouchableOpacity>

    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({})