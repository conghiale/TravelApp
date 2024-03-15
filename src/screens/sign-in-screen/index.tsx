import { Box, Text } from '@/utils/theme'
import React, { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import { Image, ImageBackground, TextInput, TouchableOpacity, View } from "react-native"
import { AuthScreenNavigationType } from '@/navigation/types'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import theme from '@/utils/theme'
import { font } from '@/utils/font'
import Icons from '@/components/shared/icon'
import styles from './style'
import { isEmailValid } from '@/utils'
import { loginUser } from '@/services/user-service'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import GlobalDialog from '@/components/dialogs'
import { TRAVEL_TOKEN_NAME, saveToken } from '@/services/config'
// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

const SignUpScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>()
    const navigateToSignUpScreen = () => {
        navigation.navigate("SignUp")
    }
    const navigateToForgotPasswordScreen = () => {
        navigation.navigate("ForgotPassword")
    }

    const { updateUser } = useUserGlobalStore();
    const defaultDialogProps: Dialog = { type: '', message: '' }
    const [dialog, setDialog] = useState<Dialog>(defaultDialogProps)
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState<IUserLogin>({ email: '', password: '' })
    const defaultErrorProps: IUserLoginErrorProps = { show: false, message: '' }
    const [userError, setUserError] = useState<IUserLoginError>({ email: defaultErrorProps, password: defaultErrorProps })

    /*useEffect(() => {
        GoogleSignin.configure({
            webClientId: '606295247603-pi9htgv2csa8kfb9oscup0hli3loq3nd.apps.googleusercontent.com',
        });
    }, [])

    async function onGoogleButtonPress() {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken, user } = await GoogleSignin.signIn();
            console.log('user:', user)
    
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
        } catch(e) {
            console.log(e)
        }
    }*/

    const handleChangeInput = (key: keyof IUserLogin, text: string) => {
        setUser((prevUser) => ({
            ...prevUser,
            [key]: text,
        }))

        switch (key) {
            case 'email':
                if (!text || text === '') {
                    setUserError((prevUserErr) => ({
                        ...prevUserErr,
                        email: defaultErrorProps
                    }))
                }
                else if (!isEmailValid(text)) {
                    setUserError((prevUser) => ({
                        ...prevUser,
                        email: {
                            show: true,
                            message: 'Invalid form of email'
                        }
                    }))
                } else {
                    setUserError((prevUser) => ({
                        ...prevUser,
                        email: defaultErrorProps
                    }))
                }
                break;
            case 'password':
                if (text.length < 8) {
                    setUserError((prevUserErr) => ({
                        ...prevUserErr,
                        password: {
                            show: true,
                            message: 'Length of password must be 8 or longer'
                        }
                    }))
                } else {
                    setUserError((prevUserErr) => ({
                        ...prevUserErr,
                        password: defaultErrorProps
                    }))
                }
                break;
        }
    }

    const handleSignIn = () => {
        if (!user.email || !user.password) {
            setDialog({
                type: 'error',
                message: 'Please input field(s)'
            });
            return;
        }
        loginUser(user)
            .then((r) => {
                saveToken(TRAVEL_TOKEN_NAME, r.data.data.token);
                console.log(r.data.data)
                updateUser({
                    id: r.data.data.user.id,
                    email: r.data.data.user.email,
                    firstName: r.data.data.user.firstName,
                    lastName: r.data.data.user.lastName,
                    avatar: r.data.data.user.avatar,
                    language: r.data.data.user.language,
                    lock: r.data.data.user.lock,
                    role: r.data.data.user.role,
                    hobby: r.data.data.user.hobby,
                    isFirstTime: r.data.data.user.isFirstTime,
                })
            })
            .catch((e) => {
                console.log(e)
                setDialog({
                    type: 'error',
                    message: e.response?.data.message
                })
            })
    }

    return (
        <SafeAreaWrapper>
            <Box style={{ backgroundColor: theme.colors.brown, flex: 1, justifyContent: "center" }}>
                <Image source={require("@/assets/images/logo.png")} style={styles.logo} />

                <View style={{ marginHorizontal: 30, gap: 20 }}>
                    <View style={{ justifyContent: "center" }}>
                        <View>
                            <TextInput onChangeText={(text) => handleChangeInput('email', text)} placeholder="Email address" keyboardType="email-address" style={styles.textInput} />
                            <View style={styles.iconInput}>
                                <Icons name="email" />
                            </View>
                        </View>
                        {userError.email.show ? <Text style={styles.invalid}>{userError.email.message}</Text> : ''}
                    </View>

                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TextInput onChangeText={(text) => handleChangeInput('password', text)} placeholder="Password" secureTextEntry={showPassword ? false : true} style={{ ...styles.textInput, flex: 1 }} />
                            <View style={styles.iconInput}>
                                <Icons name="password" />
                            </View>
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 16 }}>
                                <Icons name={showPassword ? "eye" : "uneye"} color="#000" />
                            </TouchableOpacity>
                        </View>
                        {userError.password.show ? <Text style={styles.invalid}>{userError.password.message}</Text> : ''}
                    </View>
                </View>

                <View style={{ marginTop: 48, gap: 20 }}>
                    <TouchableOpacity style={styles.button} onPress={handleSignIn}>
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
                            <TouchableOpacity style={{ backgroundColor: "transparent" }} onPress={() => {}}>
                                <Text style={styles.buttonText}>Sign in with Google</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>

                    <TouchableOpacity style={styles.button1} onPress={navigateToSignUpScreen}>
                        <Text style={styles.buttonText1}>Sign up</Text>
                    </TouchableOpacity>
                </View>
                <GlobalDialog dialog={dialog} handleOk={() => setDialog(defaultDialogProps)} handleClose={() => setDialog(defaultDialogProps)} />
            </Box>
        </SafeAreaWrapper>
    )
}

export default SignUpScreen