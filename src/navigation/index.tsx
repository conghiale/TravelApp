import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppStackNavigator from './app-stack-navigator'
import AuthStackNavigator from './auth-stack-navigator'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import Tabs from './tabs'

const Navigation = () => {
    const { user, updateUser } = useUserGlobalStore()

    console.log('user:', JSON.stringify(user, null, 2))

    const usri = {
        email: "persie@gmail.com",
        name: "persie",
    }
    const usr = null
  
    useEffect(() => {
      updateUser(usri)
      return () => {}
    }, [])

    return (
        <NavigationContainer>
            {/* {user ? <Tabs /> : <AuthStackNavigator /> } */}
            {user ? <AppStackNavigator /> : <AuthStackNavigator /> }
        </NavigationContainer>
    )
}

export default Navigation