import { font } from "@/utils/font";
import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        gap: 4
    },
    text: {
        color: theme.colors.white,
        fontFamily: font.light,
    }
})

export default styles