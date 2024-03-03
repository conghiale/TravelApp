import { View } from "react-native"
import styles from "./star2.style"
import Icons from "@/components/shared/icon"

const Star2 = () => {
    return (
        <View style={styles.container}>
            <Icons name="star" />
            <Icons name="star" />
            <Icons name="star02" />
            <Icons name="star02" />
            <Icons name="star02" />
        </View>
    )
}

export default Star2