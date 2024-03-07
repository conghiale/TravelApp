import { font } from "@/utils/font"
import theme from "@/utils/theme"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: 4,
        backgroundColor: '#2F3542',
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '100%',
    },
    headerItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        color: theme.colors.orange,
        fontSize: 16,
        fontFamily: font.semiBold,
        marginStart: 8,
    },
    viewInputDestination: {
        width: '100%',
        height: 60,
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 20,
    },
    inputDestination: {
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: font.regular
    },
    destinationDescription: {
        width: '100%',
        minHeight: 190,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    containerFooter: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 32,
        paddingEnd: 27,
    },
    btnAdd: { 
        width: 90, 
        height: 90, 
        borderRadius: 10, 
        borderWidth: 1, 
        backgroundColor: 'white',  
        justifyContent: 'center', 
        alignItems: 'center',
    }
})

export default styles