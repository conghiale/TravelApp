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
    containerHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    containerHeaderUser: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    containerHeaderStar: {
        alignItems: 'center',
    }
})

export default styles