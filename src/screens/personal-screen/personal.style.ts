import { font } from '@/utils/font';
import theme from '@/utils/theme';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#2F3542',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
        paddingTop: 32,

    },
    containerAvatar: {
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
    },
    imageAvatar: {
        width: 160,
        height: 160,
        borderWidth: 2,
        borderRadius: 80,
        borderColor: theme.colors.grey,
        elevation: 1,
    },
    containerCamera: {
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 0,
        left: 25,
        borderRadius: 30,
        backgroundColor: theme.colors.grey,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    },
    containerHobby: {
        marginTop: 16, 
        marginBottom: 32, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    body: {
        flex: 1,
        paddingHorizontal: '5%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 20,
    },

    information: {
        flexDirection: 'column',
        gap: 20,
    },

    heading: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 4,
    },

    title: {
        fontFamily: font.semiBold,
        color: '#C67C4E',
    },

    input: {
        height: 60,
        paddingHorizontal: 10,
        fontFamily: font.semiBold,
        borderRadius: 12,
        backgroundColor: '#D9D9D9'
    },

    changePassword: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 12,
        marginTop: 12,
    },

    text: {
        fontFamily: font.semiBold,
        color: '#FFFFFF',
    },

    settings: {
        // flex: 3,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 20,
    },

    group: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    advanced: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    }
});


export default styles;

