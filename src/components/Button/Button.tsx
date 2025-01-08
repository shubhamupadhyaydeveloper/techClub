import { View, Text, useWindowDimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { primaryColor } from '../../constants/colors';

type Props = {
    text: string;
    bgColor?: string;
    radius?: number;
    onPress?: () => void;
    btnWidth?: number;
    textSize?: number;
    textColor?: string;
    isSubmitting?: boolean;
    isBorder?: boolean
};

const CustomButton = ({
    text,
    radius,
    onPress,
    btnWidth,
    textSize,
    bgColor,
    textColor,
    isSubmitting,
    isBorder
}: Props) => {
    const { width, height } = useWindowDimensions();
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            disabled={isSubmitting}
            style={{
                width: btnWidth ?? width * 0.9,
                height: height * 0.065,
                borderRadius: radius ?? 12,
                backgroundColor: bgColor ?? primaryColor,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth : isBorder ? 2 : 0,
                borderColor : primaryColor

            }}>
            <Text
                style={{ color: textColor ?? 'white', fontFamily: 'OpenSans-Bold' }}>
                {isSubmitting ? <ActivityIndicator size="large" color="#fff" /> : text}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
