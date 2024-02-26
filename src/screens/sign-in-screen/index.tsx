import { Box, Text } from '@/utils/theme'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import { Image, ImageBackground, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import { AuthScreenNavigationType } from '@/navigation/types'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import theme from '@/utils/theme'
import { font } from '@/utils/font'
import Icons from '@/components/shared/icon'

const SignInScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>()
    const navigateToSignUpScreen = () => {
        navigation.navigate("SignUp")
    }
    const navigateToForgotPasswordScreen = () => {
        navigation.navigate("ForgotPassword")
    }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <SafeAreaWrapper>
            <Box style={{ backgroundColor: theme.colors.brown, flex: 1, justifyContent: "center" }}>
                <Image source={require("@/assets/images/logo.png")} style={styles.logo} />

                <View style={{ marginHorizontal: 30, gap: 20 }}>
                    <TextInput placeholder="Email address" keyboardType="email-address" style={styles.textInput} />
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <TextInput placeholder="Password" secureTextEntry={showPassword ? true : false} style={{...styles.textInput, flex: 1}} />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{position: "absolute", right: 16}}>
                            <Icons name={showPassword ? "eye" : "uneye"} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 48, gap: 20 }}>
                    <TouchableOpacity style={styles.button} onPress={navigateToSignUpScreen}>
                        <Text style={styles.buttonText}>Sign in <Icons name="in" color="#fff" /></Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={navigateToForgotPasswordScreen}>
                        <Text style={styles.textForgot}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <View style={styles.line}></View>
                        <Text style={{ marginHorizontal: 20, fontFamily: font.bold, fontSize: 14, color: "#000" }}>OR</Text>
                        <View style={styles.line}></View>
                    </View>

                    <View style={styles.button}>
                    <ImageBackground
                        source={require('@/assets/images/google.png')}
                        resizeMode='contain'
                    >
                        <TouchableOpacity style={{backgroundColor: "transparent"}} onPress={()=>{}}>
                            <Text style={styles.buttonText}>Sign in with Google</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                    </View>
                    <TouchableOpacity style={styles.button1} onPress={navigateToSignUpScreen}>
                        <Text style={styles.buttonText1}>Sign up</Text>
                    </TouchableOpacity>
                </View>

            </Box>
        </SafeAreaWrapper>
    )
}

const styles = StyleSheet.create({
    logo: { alignSelf: "center", marginBottom: 36 },
    textInput: { paddingVertical: 16, paddingHorizontal: 16, borderRadius: 12, backgroundColor: "#d9d9d9", fontSize: 16, fontFamily: font.semiBold },
    textForgot: { color: "#000", fontFamily: font.medium, fontSize: 16, textAlign: "center" },
    button: { backgroundColor: theme.colors.orange, width: "70%", height: 50, borderRadius: 12, justifyContent: "center", alignSelf: "center" },
    button1: { borderColor: theme.colors.orange1, borderWidth: 2, backgroundColor: "transparent", width: "70%", height: 50, borderRadius: 12, justifyContent: "center", alignSelf: "center" },
    buttonText: { fontFamily: font.semiBold, color: '#fff', fontSize: 18, textAlign: "center" },
    buttonText1: { fontFamily: font.semiBold, color: theme.colors.orange1, fontSize: 18, textAlign: "center" },
    line: { backgroundColor: "#000", height: 1, width: "36%" },
})

export default SignInScreen