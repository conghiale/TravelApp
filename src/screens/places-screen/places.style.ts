import { StyleSheet } from "react-native"
import { font } from "@/utils/font"
import theme from "@/utils/theme"

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#2F3542',
        paddingHorizontal: '5%',
    },
    top_place_title_container: {
        height: 24,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    top_place_title_text: {
        fontFamily: font.semiBold,
        fontSize: 16,
        color: theme.colors.white,
        marginStart: 4,
    },
})

export default styles