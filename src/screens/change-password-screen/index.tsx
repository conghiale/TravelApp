import { AppScreenNavigationType } from '@/navigation/types'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, Text, View } from 'react-native'

const ChangePasswordScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"ChangePassword">>()
  const goBack = () => {
    navigation.goBack()
  }
  
  return (
    <View>
      <Button title='Go back' onPress={goBack}></Button>
      <Text>ChangePasswordScreen</Text>
    </View>
  )
}

export default ChangePasswordScreen