import { Box, Text } from '@/utils/theme'
import React from 'react'
import { useNavigation } from "@react-navigation/native"
import { Button } from "react-native"
import { AuthScreenNavigationType } from '@/navigation/types'

const SignUpScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>()
    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn")
    }

    return (
        <Box>
            <Text>Sign up screen</Text>
            <Button title='Navigate to sign in' onPress={navigateToSignInScreen} />
        </Box>
    )
}

export default SignUpScreen