import { font } from "@/utils/font"
import theme from "@/utils/theme"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    place_container: {
        height: 250,
        padding: 4,
        marginTop: 16,
        borderRadius: 5,
        backgroundColor: theme.colors.white,
    },
    place_image: {
        height: '40%',
        width: 'auto',
    },
    place_text_title: {
        fontFamily: font.semiBold,
    }
})

export default styles