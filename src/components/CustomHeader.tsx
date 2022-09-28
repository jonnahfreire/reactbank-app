import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

interface CustomHeaderProps {
  iconColor?: string
}

export default function CustomHeader(props: CustomHeaderProps) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={navigation.goBack} style={styles.button}>
      <Ionicons
        name="chevron-back-outline"
        size={28}
        color={props?.iconColor}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
  },
})
