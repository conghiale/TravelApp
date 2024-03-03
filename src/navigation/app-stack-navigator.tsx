import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackParamList } from './types'
import BottomTabNavigator from './bottom-tab-navigator'
import AuthStackNavigator from './auth-stack-navigator'
import Tabs from './tabs'

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStackNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name='Root' component={Tabs} options={{headerShown: false}}/>
      {/* <Stack.Screen name='Root' component={BottomTabNavigator} options={{headerShown: false}}/> */}
      {/* <Stack.Screen name='Auth' component={AuthStackNavigator} options={{headerShown: false}}/> */}
    </Stack.Navigator>
  )
}

export default AppStackNavigator