import { font } from '@/utils/font';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({

    group: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    text: {
        fontFamily: font.bold,
        color: '#FFFFFF',
    },
});


export default styles;

