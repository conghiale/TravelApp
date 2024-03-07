import { Text, TouchableOpacity } from "react-native"
import styles from "./button01.style"
import theme from "@/utils/theme"
import { font } from "@/utils/font"

type ButtonProps = {
    height?: number
    label: string
    color?: string
    onPress: () => void
    onLongPress?: () => void
    disabled?: boolean
}

const Button01 = ({ height, label, color, onPress }: ButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.button, {
                backgroundColor: color ? color : theme.colors.orange,
                height: height ? height : 38
            }]}
            onPress={onPress}>
            <Text style={[theme.textVariants.textBase, styles.button_label]}>{label}</Text>
        </TouchableOpacity>
    )
}

export default Button01