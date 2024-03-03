import { AppScreenNavigationType } from '@/navigation/types'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, Text, View } from 'react-native'

const ViewUsersScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"ReviewUser">>()
  const goBack = () => {
    navigation.goBack()
  }
  
  return (
    <View>
      <Button title='Go back' onPress={goBack}></Button>
      <Text>ViewUsersScreen</Text>
    </View>
  )
}

export default ViewUsersScreen