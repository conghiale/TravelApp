import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppStackNavigator from './app-stack-navigator'
import AuthStackNavigator from './auth-stack-navigator'
import useUserGlobalStore from '@/store/useUserGlobalStore'

const Navigation = () => {
    const { user } = useUserGlobalStore();

    return (
        <NavigationContainer>
            {/* {user ? <Tabs /> : <AuthStackNavigator /> } */}
            {user ? <AppStackNavigator /> : <AuthStackNavigator /> }
        </NavigationContainer>
    )
}

export default Navigation