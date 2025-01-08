import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form';

type props = {
    name: string,
    control: Control<FieldValues, any>,
    placeholder: string
}

const CustomInput = ({ name, control, placeholder }: props) => {
    return (
        <View>
        
            <Controller
                control={control}
                name={name}
                rules={{ required: `${name} is required` }}
                render={({ field: { value, onBlur, onChange }, fieldState: { error } }) => (
                    <View>
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            placeholderTextColor={"#C7C7C7"}
                            style={styles.textInput}
                        />
                        <Text style={styles.text}>{error?.message}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        color: 'black',
        padding: 10,
        borderColor: '#C7C7C7',
        borderRadius: 12,
        borderWidth: 1
    },
    text: {
        color: "red",
        fontSize: 11
    }
})

export default CustomInput;