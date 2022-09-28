import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

export interface Options {
  id: string
  title: string
}

interface FormInputProps {
  icon?: any
  placeholder?: string
  isOpen: boolean
  style?: any
  onPress(): void
}

export function FormInputList(props: FormInputProps) {
  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          props?.style,
          {
            borderBottomLeftRadius: props.isOpen ? 0 : 10,
            borderBottomRightRadius: props.isOpen ? 0 : 10,
          },
        ]}
        onPress={props.onPress}
      >
        <View style={styles.inputContainer}>
          <View style={styles.inputList}>
            {props.icon !== undefined && (
              <Ionicons name={props.icon} size={20} color="#BBB" />
            )}
            <Text style={styles.inputListText}>{props?.placeholder}</Text>
          </View>
          <Ionicons name="chevron-down-outline" size={20} color="#DDD" />
        </View>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    minHeight: 50,
    padding: 0,
    flexDirection: 'column',
    borderBottomWidth: 0,
    paddingHorizontal: 5,
    backgroundColor: '#444',
    elevation: 1.9,
    borderRadius: 10,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingStart: 2,
    paddingEnd: 5,
  },
  inputList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputListText: {
    color: '#BBB',
    fontFamily: 'Inter_400Regular',
    textAlign: 'left',
    marginStart: 5,
  },
})
