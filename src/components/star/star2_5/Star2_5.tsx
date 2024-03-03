import { View } from "react-native"
import styles from "./star2_5.style"
import Icons from "@/components/shared/icon"

const Star2_5 = () => {
    return (
        <View style={styles.container}>
            <Icons name="star" />
            <Icons name="star" />
            <Icons name="star01" />
            <Icons name="star02" />
            <Icons name="star02" />
        </View>
    )
}

export default Star2_5