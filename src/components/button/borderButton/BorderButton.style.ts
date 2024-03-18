import { font } from "@/utils/font";
import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 2,
        paddingHorizontal: 16,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_label: {
        color: theme.colors.white,
        fontFamily: font.semiBold,
    }
})

export default styles