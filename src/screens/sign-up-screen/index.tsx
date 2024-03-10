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
import GlobalDialog from '@/components/dialogs'
import { markUserValidation } from '@/services/user-service'

const SignUpScreen = () => {
    const defaultDialogProps: Dialog = { type: '', message: '' }
    const [dialog, setDialog] = useState<Dialog>(defaultDialogProps)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [user, setUser] = useState<IUser>({ email: '', firstName: '', lastName: '', password: '', cfPassword: '' })
    
    const defaultErrorProps: ErrorProps = {show: false, message: ''}
    const [userError, setUserError] = useState<IUserError>({
        email: defaultErrorProps,
        firstName: defaultErrorProps,
        lastName: defaultErrorProps,
        password: defaultErrorProps,
        cfPassword: defaultErrorProps
    })

    //navigator
    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>()
    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn")
    }
    const navigateToValidateUserScreen = () => {
        navigation.navigate("Validation", { user })
    }

    //handle funcs
    const isEmailValid = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const hasErrorData = (errors: IUserError): boolean => {
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                const error = errors[key as keyof IUserError];
                if (error && error.show) {
                    return true;
                }
            }
        }
        return false;
    };

    const handleSignUp = async () => {
        if (!hasErrorData(userError)) {
            markUserValidation(user)
                .then((r) => {
                    navigateToValidateUserScreen();
                })
                .catch((e) => {
                    setDialog({
                        type: 'error',
                        message: 'Error happned, try again later'
                    })
                });
        } else {
            setDialog({
                type: 'error',
                message: 'Please provide valid input field(s)'
            })
        }
    }

    const handleInputText = (key: keyof IUser, text: string) => {
        setUser((prevUser) => ({
            ...prevUser,
            [key]: text
        }))

        switch (key) {
            case 'email':
                if (!text || text === '') {
                    setUserError((prevUserErr) => ({
                        ...prevUserErr,
                        email: defaultErrorProps
                    }))
                }
                else {
                    if (!isEmailValid(text)) {
                        setUserError((prevUserErr) => ({
                            ...prevUserErr,
                            email: {
                                show: true,
                                message: 'Invalid format of email'
                            }
                        }))
                    } else {
                        setUserError((prevUserErr) => ({
                            ...prevUserErr,
                            email: defaultErrorProps
                        }))
                    }
                }
                break;
            case 'firstName':
                if (text.length > 40) {
                    setUserError((prevUserErr) => ({
                        ...prevUserErr,
                        firstName: {
                            show: true,
                            message: 'Maximum length of first name is 40'
                        }
                    }))
                } else {
                    setUserError((prevUserErr) => ({
                        ...prevUserErr,
                        firstName: defaultErrorProps
                    }))
                }
                break;
            case 'lastName':
                if (text.length > 40) {
                    setUserError((prevUserErr) => ({
                        ...prevUserErr,
                        lastName: {
                            show: true,
                            message: 'Maximum length of last name is 40'
                        }
                    }))
                } else {
                    setUserError((prevUserErr) => ({
                        ...prevUserErr,
                        lastName: defaultErrorProps
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
            case 'cfPassword':
                if (user.password !== text) {
                    setUserError((prevUserErr) => ({
                        ...prevUserErr,
                        cfPassword: {
                            show: true,
                            message: 'Confirm password not match'
                        }
                    }))
                } else {
                    setUserError((prevUserErr) => ({
                        ...prevUserErr,
                        cfPassword: defaultErrorProps
                    }))
                }
                break;
        }
    }

    return (
        <SafeAreaWrapper>
            <Box style={{ backgroundColor: theme.colors.brown, flex: 1, justifyContent: "center" }}>
                <Image source={require("@/assets/images/logo.png")} style={styles.logo} />

                <View style={{ marginHorizontal: 30, gap: 20 }}>
                    <View>
                        <TextInput onChangeText={(text) => handleInputText('email', text)} placeholder="Email address" keyboardType="email-address" style={styles.textInput} />
                        {userError.email.show ? <Text style={{ ...styles.invalid, }}>{userError.email.message}</Text> : ''}
                    </View>

                    <View>
                        <TextInput onChangeText={(text) => handleInputText('firstName', text)} placeholder="First name" style={styles.textInput} />
                        {userError.firstName.show ? <Text style={{ ...styles.invalid, }}>{userError.firstName.message}</Text> : ''}
                    </View>

                    <View>
                        <TextInput onChangeText={(text) => handleInputText('lastName', text)} placeholder="Last name" style={styles.textInput} />
                        {userError.lastName.show ? <Text style={{ ...styles.invalid, }}>{userError.lastName.message}</Text> : ''}
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TextInput onChangeText={(text) => handleInputText('password', text)} placeholder="Password" secureTextEntry={showPassword ? false : true} style={{ ...styles.textInput, flex: 1 }} />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 16 }}>
                                <Icons name={showPassword ? "eye" : "uneye"} color="#000" />
                            </TouchableOpacity>
                        </View>
                        {userError.password.show ? <Text style={{ ...styles.invalid, }}>{userError.password.message}</Text> : ''}
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TextInput onChangeText={(text) => handleInputText('cfPassword', text)} placeholder="Confirm password" secureTextEntry={showConfirmPassword ? false : true} style={{ ...styles.textInput, flex: 1 }} />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: "absolute", right: 16 }}>
                                <Icons name={showConfirmPassword ? "eye" : "uneye"} color="#000" />
                            </TouchableOpacity>
                        </View>
                        {userError.cfPassword.show ? <Text style={{ ...styles.invalid, }}>{userError.cfPassword.message}</Text> : ''}
                    </View>

                    <TouchableOpacity style={{ ...styles.button, width: "100%" }} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign up <Icons name="in" color="#fff" /></Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Text style={{ fontSize: 18, color: "#fff", fontFamily: font.semiBold }}>Already have an account? </Text>
                        <TouchableOpacity onPress={navigateToSignInScreen}><Text style={{ fontSize: 18, color: theme.colors.orange1, fontFamily: font.bold }}>Sign in</Text></TouchableOpacity>
                    </View>
                </View>
            </Box>
            <GlobalDialog dialog={dialog} handleOk={() => setDialog(defaultDialogProps)} handleClose={() => setDialog(defaultDialogProps)} />
        </SafeAreaWrapper>
    )
}

export default SignUpScreen