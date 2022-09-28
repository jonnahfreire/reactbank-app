import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

export interface Options {
  id: string
  title: string
}

interface SelectProps {
  icon?: any
  placeholder?: string
  options: Array<Options>
  style?: any
  currentValueSelected?: Options
  getCurrentSelected: (option: Options) => any
}

export function Select(props: SelectProps) {
  const [optionsVisible, setOptionsVisible] = useState(false)
  const [selected, setSelected] = useState<Options>()
  const options = props.options

  function handleCurrentSelectOption(option: Options) {
    setSelected(option)
    props?.getCurrentSelected(option)
  }

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          props?.style,
          {
            borderBottomLeftRadius: optionsVisible ? 0 : 10,
            borderBottomRightRadius: optionsVisible ? 0 : 10,
          },
        ]}
        onPress={() => {
          setOptionsVisible(!optionsVisible)
        }}
      >
        <View style={styles.selectHeaderContainer}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
          >
            {props.icon !== undefined && (
              <Ionicons name={props.icon} size={20} color="#BBB" />
            )}
            <Text
              style={{ color: '#BBB', fontFamily: 'Inter_400Regular', textAlign: 'left', marginStart: 5 }}
            >
              {selected?.title !== undefined
                ? selected.title
                : props?.placeholder}
            </Text>
          </View>
          <Ionicons name="chevron-down-outline" size={20} color="#DDD" />
        </View>
      </TouchableOpacity>
      <View style={[styles.optionsContainer]}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionsContainer,
              {
                height: optionsVisible ? 50 : 0,
                width: '100%',
                borderRadius: 10,
              },
            ]}
            onPress={(e) => {
              handleCurrentSelectOption(option)
              setOptionsVisible(!optionsVisible)
            }}
          >
            <Text style={{ color: '#DDD', fontFamily: 'Inter_600SemiBold', textAlign: 'left' }}>
              {option.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  optionsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    flexDirection: 'column',
    paddingHorizontal: 5,
    backgroundColor: '#444',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  selectHeaderContainer: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingStart: 2,
    paddingEnd: 5,
  },
})
