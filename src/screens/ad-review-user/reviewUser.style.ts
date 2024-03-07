import { font } from "@/utils/font";
import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: theme.colors.blue1,
        justifyContent: 'center',
        paddingHorizontal: '5%',
        borderWidth: 2
    },
    containerHeader: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 4,
    },
    containerContent: {
        marginTop: 16,
        gap: 12,
    },
    content: {
        // marginTop: 16,
        gap: 12,
    },
    containerTitle: {
        flex: 1,
        alignItems: 'center',
        marginStart: -50,
        justifyContent: 'center',
    },
    title: {
        color: theme.colors.orange,
        fontFamily: font.bold,
    },
    titleInfo: {
        color: theme.colors.orange,
        fontFamily: font.bold,
    }
})

export default styles