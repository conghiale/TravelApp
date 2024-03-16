import { font } from "@/utils/font";
import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        // height: '100%',
        width: '100%',
    },
    textContent: {
        fontFamily: font.semiBold,
        color: theme.colors.white,
    },
    containerHeaderUser: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    containerHeaderStar: {
        marginTop: 12,
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

export default styles