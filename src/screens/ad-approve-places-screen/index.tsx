import { AppScreenNavigationType } from '@/navigation/types'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, Text, View } from 'react-native'

const ApprovePlacesScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"ApprovePlaces">>()
  const goBack = () => {
    navigation.goBack()
  }
  
  return (
    <View>
      <Button title='Go back' onPress={goBack}></Button>
      <Text>ApprovePlacesScreen</Text>
    </View>
  )
}

export default ApprovePlacesScreen