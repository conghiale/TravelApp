import { View } from "react-native"
import styles from "./star3_5.style"
import Icons from "@/components/shared/icon"

const Star3_5 = () => {
    return (
        <View style={styles.container}>
            <Icons name="star" />
            <Icons name="star" />
            <Icons name="star" />
            <Icons name="star01" />
            <Icons name="star02" />
        </View>
    )
}

export default Star3_5