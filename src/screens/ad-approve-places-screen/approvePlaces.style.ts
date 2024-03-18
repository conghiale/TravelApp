import { font } from "@/utils/font";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        height: '100%',
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
})

export default styles