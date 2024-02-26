import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from './types'
import WelcomeScreen from '@/screens/welcome-screen'
import { HomeStackParamList } from './types'

const Stack = createNativeStackNavigator<HomeStackParamList>()

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={WelcomeScreen} />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator