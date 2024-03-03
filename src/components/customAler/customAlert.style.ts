import { font } from "@/utils/font";
import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

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
    },
    body: {
        marginVertical: 16,
        justifyContent: 'center',
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
    btnCancel: {
        flex: 1,
        height: 60,
        backgroundColor: theme.colors.orange,
        marginEnd: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    btnOk: {
        flex: 1,
        height: 60,
        backgroundColor: theme.colors.grey,
        marginStart: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    btnText: {
        fontFamily: font.semiBold,
    }
})

export default styles