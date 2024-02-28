import { Text, TouchableOpacity } from "react-native"
import styles from "./button.style"
import theme from "@/utils/theme"

type ButtonProps = {
    label: string
    onPress: () => void
    onLongPress?: () => void
    disabled?: boolean
}

const Button = ({ label, onPress }: ButtonProps) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={[theme.textVariants.textSm, styles.button_label]}>{label}</Text>
        </TouchableOpacity>
    )
}

export default Button