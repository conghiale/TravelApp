import { AppScreenNavigationType } from '@/navigation/types'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'

const CreatedPlacesScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"CreatePlace">>()
  const goBack = () => {
    navigation.goBack()
  }

  return (
    <View>
      <Button title='Go back' onPress={goBack}></Button>
      <Text>CreatedPlacesScreen</Text>
    </View>
  )
}

export default CreatedPlacesScreen