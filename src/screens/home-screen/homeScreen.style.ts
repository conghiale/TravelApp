import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    callout: {
        width: 120,
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        borderRadius: 5,

        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    containerSearch: {
        zIndex: 1,
        position: "absolute",
        left: 0,
        right: 0,
        top: 5,
        marginHorizontal: 12,
        borderRadius: 5,
    }
})

export default styles