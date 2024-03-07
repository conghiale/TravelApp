import theme from "@/utils/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: theme.colors.orange,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default styles