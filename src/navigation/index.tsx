import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppStackNavigator from './app-stack-navigator'

const Navigation = () => {
    const user = true

    return (
        <NavigationContainer>
            {/* <AuthStackNavigator /> */}
            <AppStackNavigator />
        </NavigationContainer>
    )
}

export default Navigation