import { font } from "@/utils/font";
import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    button_label: {
        color: theme.colors.white,
        fontFamily: font.semiBold,
        fontSize: 16,
    }
})

export default styles