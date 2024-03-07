import { font } from "@/utils/font";
import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.blue1,
    },
    containerArrowLeft: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: '5%',
        marginTop: 4,
        alignItems: 'flex-start',
    },
    body: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
        gap: 20,
    },
    textTitle: {
        color: theme.colors.orange,
        fontFamily: font.bold,
        marginBottom: 32,
    },
    customInput: {
        // ma
    }
})

export default styles