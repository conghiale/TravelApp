import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from './types'
import WelcomeScreen from '@/screens/welcome-screen'
import SignInScreen from '@/screens/sign-in-screen'
import SignUpScreen from '@/screens/sign-up-screen'
import ForgotPasswordScreen from '@/screens/forgot-password-screen'
import ValidateUserScreen from '@/screens/validate-user-screen'

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='SignIn' component={SignInScreen} options={{headerShown: false}} />
      <Stack.Screen name='Validation' component={ValidateUserScreen} options={{headerShown: false}} />
      <Stack.Screen name='Welcome' component={WelcomeScreen} options={{headerShown: false}} />
      <Stack.Screen name='SignUp' component={SignUpScreen} options={{headerShown: false}} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default AuthStackNavigator