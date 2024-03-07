import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
    }
})

export default styles