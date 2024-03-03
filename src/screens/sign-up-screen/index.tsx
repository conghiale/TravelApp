import { Box, Text } from '@/utils/theme'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import { Image, TextInput, TouchableOpacity, View } from "react-native"
import { AuthScreenNavigationType } from '@/navigation/types'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import theme from '@/utils/theme'
import { font } from '@/utils/font'
import Icons from '@/components/shared/icon'
import styles from './style'

const SignInScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>()
    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn")
    }

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <SafeAreaWrapper>
            <Box style={{ backgroundColor: theme.colors.brown, flex: 1, justifyContent: "center" }}>
                <Image source={require("@/assets/images/logo.png")} style={styles.logo} />

                <View style={{ marginHorizontal: 30, gap: 20 }}>
                    <TextInput placeholder="Email address" keyboardType="email-address" style={styles.textInput} />
                    <TextInput placeholder="First name" style={styles.textInput} />
                    <TextInput placeholder="Last name" style={styles.textInput} />
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TextInput placeholder="Password" secureTextEntry={showPassword ? false : true} style={{ ...styles.textInput, flex: 1 }} />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 16 }}>
                            <Icons name={showPassword ? "eye" : "uneye"} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TextInput placeholder="Confirm password" secureTextEntry={showConfirmPassword ? false : true} style={{ ...styles.textInput, flex: 1 }} />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showPassword)} style={{ position: "absolute", right: 16 }}>
                            <Icons name={showConfirmPassword ? "eye" : "uneye"} color="#000" />
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity style={{ ...styles.button, width: "100%" }} onPress={navigateToSignInScreen}>
                        <Text style={styles.buttonText}>Sign up <Icons name="in" color="#fff" /></Text>
                    </TouchableOpacity>

                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                        <Text style={{ fontSize: 18, color: "#fff", fontFamily: font.semiBold }}>Already have an account? </Text>
                        <TouchableOpacity onPress={navigateToSignInScreen}><Text style={{ fontSize: 18, color: theme.colors.orange1, fontFamily: font.bold }}>Sign in</Text></TouchableOpacity>
                    </View>
                </View>
            </Box>
        </SafeAreaWrapper>
    )
}

export default SignInScreen