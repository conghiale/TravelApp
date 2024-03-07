import { font } from '@/utils/font'
import theme from '@/utils/theme'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const CustomInput = ({name, value, placeholder, handleInputChangeName, handleInputChange} : CustomInputProps) => {
  return (
    <View style={styles.container}>
        <TextInput
            style={[theme.textVariants.textBase, styles.input]}
            placeholder={placeholder}
            value={value}
            onChangeText={(value) => {handleInputChange ? 
                                      handleInputChange(value) : 
                                      handleInputChangeName ?
                                      handleInputChangeName(name, value) :
                                      null}}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 60,
    width: '100%',
    paddingHorizontal: 10,
    fontFamily: font.semiBold,
    borderRadius: 12,
    backgroundColor: '#D9D9D9'
  },
})

export default CustomInput
