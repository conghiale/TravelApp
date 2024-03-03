import theme from "@/utils/theme"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        marginVertical: 8
    },
    iconContainer: {
        height: theme.placeItemInfo.PLACE_ITEM_HEIGHT,
        width: 79,
        position: 'absolute',
        right: '2%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageTrash: {
        height: 32,
        width: 32,
    },
})

export default styles