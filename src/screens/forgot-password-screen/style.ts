import { font } from '@/utils/font'
import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import theme from '@/utils/theme'

const baseButton:ViewStyle = { height: 50, borderRadius: 12, justifyContent: "center", alignSelf: "center" }
const baseButtonText:TextStyle = { fontFamily: font.semiBold, fontSize: 18, textAlign: "center" }

const styles = StyleSheet.create({
    logo: { alignSelf: "center", marginBottom: 36 },
    textInput: { paddingVertical: 16, paddingHorizontal: 16, borderRadius: 12, backgroundColor: "#d9d9d9", fontSize: 16, fontFamily: font.semiBold },
    textForgot: { color: "#000", fontFamily: font.medium, fontSize: 16, textAlign: "center" },
    button: { ...baseButton, backgroundColor: theme.colors.orange },
    button1: { ...baseButton, borderColor: theme.colors.orange1, borderWidth: 2, backgroundColor: "transparent" },
    buttonText: { ...baseButtonText, color: '#fff' },
    buttonText1: { ...baseButtonText, color: theme.colors.orange1 },
})

export default styles