import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerAvatar: {
        width: '100%',
        height: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageAvatar: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderRadius: 40,
        borderColor: theme.colors.grey,
    },
    containerCamera: {
        width: 30,
        height: 30,
        position: 'absolute',
        bottom: 0,
        left: 25,
        borderRadius: 30,
        backgroundColor: theme.colors.grey,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    },
})

export default styles