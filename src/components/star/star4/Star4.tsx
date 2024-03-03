import { View } from "react-native"
import styles from "./star4.style"
import Icons from "@/components/shared/icon"

const Star4 = () => {
    return (
        <View style={styles.container}>
            <Icons name="star" />
            <Icons name="star" />
            <Icons name="star" />
            <Icons name="star" />
            <Icons name="star02" />
        </View>
    )
}

export default Star4