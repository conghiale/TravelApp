import { AuthScreenNavigationType } from '@/navigation/types'
import { useNavigation } from '@react-navigation/native'
import theme from '@/utils/theme'

import React from 'react'
import { ImageBackground, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Svg, { Circle } from 'react-native-svg'
import { font } from '@/utils/font'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'

const WelcomeScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>()
  const navigateToSignInScreen = () => {
    navigation.navigate("SignIn")
  }

  return (
    <SafeAreaWrapper>
      <ImageBackground
        source={require('@/assets/images/bg-welcome-image.png')}
        style={{ flex: 1 }}
        resizeMode='cover'
      >
        <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 1)']} style={{ flex: 1.5 }}>

          <View style={styles.fieldText}>
            <Svg width="47" height="15" viewBox="0 0 47 15" fill="none">
              <Circle cx="6" cy="8" r="6" fill="#D9D9D9" />
              <Circle cx="23.5" cy="7.5" r="7.5" fill="#3D68BD" />
              <Circle cx="41" cy="8" r="6" fill="#D9D9D9" />
            </Svg>
            <Text style={styles.textTitle}>Vietnam, paradise of wonders</Text>
            <Text style={styles.textSubtitle}>Let's go with Travel App to the most beautiful places.</Text>
            <TouchableOpacity style={styles.button} onPress={navigateToSignInScreen}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaWrapper>
  )
}

const styles = StyleSheet.create({
  fieldText: { position: "absolute", bottom: 0, paddingVertical: 30, width: "100%", alignItems: "center", rowGap: 10 },
  textTitle: { fontFamily: font.semiBold, textAlign: "center", color: "#fff", paddingHorizontal: 100, fontSize: 34 },
  textSubtitle: { fontFamily: font.regular, textAlign: "center", color: "#a9a9a9", paddingHorizontal: 80, fontSize: 14 },
  button: { backgroundColor: theme.colors.orange, width: 320, height: 50, borderRadius: 12, justifyContent: "center" },
  buttonText: { fontFamily: font.semiBold, color: '#fff', fontSize: 18, textAlign: "center" },
})

export default WelcomeScreen