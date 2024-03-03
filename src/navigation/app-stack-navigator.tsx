import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackParamList } from './types'
import BottomTabNavigator from './bottom-tab-navigator'
import AuthStackNavigator from './auth-stack-navigator'
import HobbySelectScreen from '@/screens/hobby-select-screen'

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStackNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name='HobbySelect' component={HobbySelectScreen} options={{headerShown: false}} />
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default AppStackNavigator