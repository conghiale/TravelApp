import { font } from "@/utils/font";
import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    button: {
        height: 38,
        backgroundColor: theme.colors.orange,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginStart: 'auto'
    },
    button_label: {
        color: theme.colors.white,
        fontFamily: font.semiBold,
    }
})

export default styles