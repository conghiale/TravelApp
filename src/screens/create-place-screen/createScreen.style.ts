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
        minHeight: 60,
        borderRadius: 10,
        backgroundColor: theme.colors.white,
        marginTop: 20,
    },
    inputDestination: {
        flex: 1,
        paddingHorizontal: 12,
        fontFamily: font.regular
    },
    destinationDescription: {
        width: '100%',
        minHeight: 190,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: 'white',
    },
    containerFilter: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        flexWrap: 'wrap',
        columnGap: 10,
        rowGap: 10,
        marginTop: 16
    },
    filter: {
        borderWidth: 2,
        borderColor: theme.colors.grey,
        padding: 8,
        borderRadius: 5,
    },
    iconRemove: {
        position: 'absolute',
        right: -10,
        top: -10,
        zIndex: 1,
    },
    text: {
        fontFamily: font.semiBold,
        color: theme.colors.white
    },
    containerModal: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    containerModalDialog: {
        backgroundColor: theme.colors.blue1,
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,
        paddingVertical: 16,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 10,
    },
    textTitleModal: {
        fontFamily: font.semiBold,
        color: theme.colors.orange1,
        width: '100%',
        textAlign: 'center'
    },
    bodyModal: {
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        // alignItems: 'center',
        rowGap: 16,
        marginTop: 16,
        justifyContent: 'center',
        gap: 12,
    },
    footerModal: {
        flexDirection: 'row',
        width: '70%',
        marginTop: 16,
    },
    containerFooter: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginTop: 32,
        paddingEnd: '2%',
    },
    btnAdd: { 
        width: 100, 
        height: 100, 
        borderRadius: 10, 
        borderWidth: 1, 
        backgroundColor: 'white',  
        justifyContent: 'center', 
        alignItems: 'center',
    }
})

export default styles