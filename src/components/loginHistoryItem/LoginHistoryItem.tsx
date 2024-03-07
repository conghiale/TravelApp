import { Text, View } from 'react-native'
import styles from './loginHistoryItem.style'
import theme from '@/utils/theme'

const LoginHistoryItem = ({ id, startTime, endTime, time }: LoginHistoryItemProps) => {
    return (
        <View style={styles.container}>
            <Text style={[theme.textVariants.textLg, styles.text]}>[{id}]</Text>
            <Text style={[theme.textVariants.textLg, styles.text]}>{startTime}</Text>
            <Text style={[theme.textVariants.textLg, styles.text]}>-</Text>
            <Text style={[theme.textVariants.textLg, styles.text]}>{endTime}:</Text>
            <Text style={[theme.textVariants.textLg, styles.text]}>{time}</Text>
        </View>
    )
}

export default LoginHistoryItem
