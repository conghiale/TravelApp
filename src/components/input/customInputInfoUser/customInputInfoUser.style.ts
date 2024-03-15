import { font } from "@/utils/font";
import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        backgroundColor: '#A09D98',
        flexDirection: 'row',
        borderRadius: 10,
    },
    containerTitle: {
        flex: 1,
        backgroundColor: theme.colors.orange,
        borderRadius: 10,
        paddingHorizontal: 4,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerInput: {
        flex: 3,
        backgroundColor: '#A09D98',
        borderRadius: 10,
        paddingHorizontal: 4,
        paddingVertical: 8,
        justifyContent: 'center',
    },
    textInput: {
        width: '100%',
        fontFamily: font.regular,
        fontSize: 18,
        paddingStart: 12,
    }
})

export default styles