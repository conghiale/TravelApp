import { Box, Text } from '@/utils/theme'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import { Image, ImageBackground, TextInput, TouchableOpacity, View } from "react-native"
import { AuthScreenNavigationType } from '@/navigation/types'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import theme from '@/utils/theme'
import { font } from '@/utils/font'
import Icons from '@/components/shared/icon'
import styles from './style'

const SignUpScreen = () => {
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
                    <View style={{justifyContent: "center"}}>
                        <TextInput placeholder="Email address" keyboardType="email-address" style={styles.textInput} />
                        <View style={styles.iconInput}>
                            <Icons name="email" />
                        </View>
                    </View>
                    
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <TextInput placeholder="Password" secureTextEntry={showPassword ? true : false} style={{...styles.textInput, flex: 1}} />
                        <View style={styles.iconInput}>
                            <Icons name="password" />
                        </View>
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

export default SignUpScreen