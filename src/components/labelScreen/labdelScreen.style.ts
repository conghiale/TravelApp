import { font } from "@/utils/font";
import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title_text: {
        fontFamily: font.bold,
    },
})

export default styles