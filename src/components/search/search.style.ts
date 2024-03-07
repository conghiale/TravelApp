import { StyleSheet } from "react-native"
import { font } from "@/utils/font"

const styles = StyleSheet.create({
    container: {
        height: 55,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderRadius: 12,
    },
    text_input: {
        height: '100%',
        flex: 1,
        backgroundColor: '#D9D9D9',
        borderRadius: 12,
        paddingHorizontal: 8,
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