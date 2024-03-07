import { font } from "@/utils/font";
import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: theme.colors.blue1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
    },
    containerHeader: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 4,
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
    containerSearch: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },
    search: {
        width: '80%',
        marginEnd: '5%',
    },
    dropdown: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '15%',
    },
    containerPlace: {
        flex: 4,
        width: '100%',
        marginTop: 8,
    },
    place: {
        width: '100%',
        height: 65,
        marginVertical: 8,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        justifyContent: 'center',
    },
    destination: {
        color: theme.colors.white,
        fontFamily: font.semiBold
    }
})

export default styles