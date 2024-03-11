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
        width: '100%',
        // width: '80%',
        // marginEnd: '5%',
    },
    dropdown: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '15%',
    },
    containerUser: {
        flex: 4,
        width: '100%',
        alignItems: 'center',
        marginTop: 8,
    },
    user: {
        width: '100%',
        // height: 235,
        marginVertical: 8,
    },
})

export default styles