import { font } from "@/utils/font";
import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        // height: '100%',
        backgroundColor: theme.colors.blue1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
    },
    containerHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 4
    },
    containerTitle: {
        flex: 1,
        alignItems: 'center',
        marginStart: -50,
        justifyContent: 'center',
    },
    label: {
        color: theme.colors.orange,
        fontFamily: font.bold,
    },
    placeDetail: {
        width: '100%',
        gap: 10,
        marginTop: 16,
    },
    imageContainer: {
        width: '100%',
        // height: 300,
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },

    //rating
    ratingContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
    },

    rating: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    // Decription
    content: {
        fontFamily: font.semiBold,
        color: theme.colors.white,
        textAlign: 'justify',
    },

    boldText: {
        fontWeight: 'bold',
    },

    // Comment
    commentContainer: {
        width: '100%',
        gap: 10,
        marginTop: 20
    },

    commentBox: {
        // height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
    },

    title: {
        fontFamily: font.semiBold,
        color: '#C67C4E',
    },

    sendBtn: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: theme.colors.blue,
        paddingHorizontal: 16
    },

    containerUserComment: {
        marginTop: 16,
        gap: 30,
    },
    userCommentItem: {
        backgroundColor: theme.colors.blue1,
        paddingVertical: 16,
        paddingHorizontal: 4,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    containerButtonFooter: {
        marginTop: 32,
        marginBottom: 12,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    //Modal
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})

export default styles