import { View } from "react-native"
import styles from "./star4_5.style"
import Icons from "@/components/shared/icon"

const Star4_5 = () => {
    return (
        <View style={styles.container}>
            <Icons name="star" />
            <Icons name="star" />
            <Icons name="star" />
            <Icons name="star" />
            <Icons name="star01" />
        </View>
    )
}

export default Star4_5