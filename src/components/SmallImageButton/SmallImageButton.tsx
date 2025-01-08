import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { verticalScale } from '../../constants/responsive';

type prop = {
  onPress?: () => void,
  imageUrl: ImageSourcePropType
}

const SmallImageButton = ({ onPress, imageUrl }: prop) => {
  return (
    <TouchableOpacity activeOpacity={.85} onPress={onPress}>
      <View style={styles.container}>
        <Image source={imageUrl} style={{ height: 30, width: 30 }} />
      </View>
    </TouchableOpacity>
  )
}

export default SmallImageButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DDDDDD',
    height: verticalScale(50)
  }
})