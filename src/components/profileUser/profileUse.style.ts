import { font } from "@/utils/font";
import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // height: '100%',
        backgroundColor: theme.colors.orange1,
        borderRadius: 10,
        padding: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    containerHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        marginEnd: 15,
    },
    gmail: {
        flex: 1,
        color: theme.colors.white,
        fontFamily: font.bold
    },
    body: {
        width: '100%',
        marginTop: 16,
    },
    containerFN: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'baseline',
        marginTop: 4,
    },
    titleFN: {
        color: theme.colors.white,
        fontFamily: font.semiBold,
        marginEnd: 10,
    },
    firstName: {
        color: theme.colors.white,
        fontFamily: font.regular
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 16
    },
    buttonLock: {
        width: '35%'
    },
    buttonReview: {
        width: '35%'
    }
})

export default styles