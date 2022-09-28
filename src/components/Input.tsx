import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { colors } from '../assets/colors/Colors'

interface InputProps {
  value: string | undefined
  type: string
  placeholder?: string
  icon?: any
  iconRight?: any
  onBlur?: any
  iconPress?: any
  onChangeText?: any
  styleProps?: string | any
}

export default function Input(props: InputProps) {
  return (
    <View style={[styles.inputContainer, { ...props?.styleProps }]}>
      {props?.icon && <Ionicons name={props?.icon} size={20} color="#DDD" />}

      <TextInput
        style={[styles.inputStyle]}
        placeholder={props?.placeholder}
        onChangeText={props?.onChangeText}
        onBlur={props?.onBlur}
        secureTextEntry={props.type == 'password' ? true : false}
        autoCorrect={false}
        value={props.value}
        keyboardType={props.type === 'number' ? 'numeric' : 'default'}
        placeholderTextColor="#BBB"
      />
      <TouchableOpacity
        onPress={props?.iconPress || undefined}
        style={styles.button}
      >
        {props?.iconRight && (
          <Ionicons
            name={props?.iconRight}
            color={
              props?.iconRight == 'checkmark-outline'
                ? colors.slateBlue
                : '#DDD'
            }
            size={20}
          />
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 50,
    padding: 0,
    flexDirection: 'row',
    borderBottomWidth: 0,
    paddingHorizontal: 5,
    backgroundColor: '#444',
    elevation: 1.9,
    borderRadius: 10,
  },
  inputStyle: {
    flex: 1,
    height: '100%',
    color: 'rgba(210, 210, 210,0.9)',
    fontSize: 15,
    marginLeft: 5,
    paddingTop: 2,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
  },
})
