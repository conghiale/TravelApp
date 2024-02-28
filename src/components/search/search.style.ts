import { StyleSheet } from "react-native"
import { font } from "@/utils/font"

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        backgroundColor: '#D9D9D9',
        borderRadius: 12,
    },
    text_input: {
        height: '100%',
        backgroundColor: '#D9D9D9',
        borderRadius: 12,
        fontFamily: font.semiBold,
    },
    btn_search: {
        width: 50,
        height: '100%',
        backgroundColor: '#C67C4E',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 'auto',
    }
})

export default styles;