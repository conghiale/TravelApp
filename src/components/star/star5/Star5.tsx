import { View } from "react-native"
import styles from "./star5.style"
import Icons from "@/components/shared/icon"

const Star5 = () => {
    return (
        <View style={styles.container}>
            <Icons name="star" />
            <Icons name="star" />
            <Icons name="star" />
            <Icons name="star" />
            <Icons name="star" />
        </View>
    )
}

export default Star5