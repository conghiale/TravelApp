import { View } from "react-native"
import styles from "./star1.style"
import Icons from "@/components/shared/icon"

const Star1 = () => {
    return (
        <View style={styles.container}>
            <Icons name="star" />
            <Icons name="star02" />
            <Icons name="star02" />
            <Icons name="star02" />
            <Icons name="star02" />
        </View>
    )
}

export default Star1