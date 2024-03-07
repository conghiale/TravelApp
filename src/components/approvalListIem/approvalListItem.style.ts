import { font } from "@/utils/font";
import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    destination: {
        color: theme.colors.white,
        fontFamily: font.semiBold
    }
})

export default styles