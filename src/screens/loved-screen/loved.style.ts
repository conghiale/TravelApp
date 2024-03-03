import { font } from "@/utils/font"
import theme from "@/utils/theme"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2F3542',
        alignItems: 'center',
        paddingVertical: 4,
    },
    title_container: {
        height: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title_right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title_text: {
        fontFamily: font.semiBold,
        fontSize: 16,
        color: theme.colors.orange,
        marginStart: 4,
    },
})

export default styles