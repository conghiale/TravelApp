import { StyleSheet } from "react-native";
import { font } from "@/utils/font";
import theme from "@/utils/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    containerAlert: {
        backgroundColor: 'white',
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,
        paddingTop: 16,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 10,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: font.semiBold,
        color: theme.colors.black
    },
    body: {
        marginVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    content: {
        fontFamily: font.regular,
    },
    footer: {
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: theme.colors.grey1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    btnText: {
        fontFamily: font.regular,
        color: '#57606f'
    }
})

export default styles