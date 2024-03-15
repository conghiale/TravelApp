import theme from '@/utils/theme'
import { Text, View } from 'react-native'

const MyCustomCalloutView = ({ label }: { label: string }) => {
    return (
        <View style={{borderRadius: 5}}>
            <Text style={[theme.textVariants.textSm, { color: theme.colors.orange1, textAlign: 'center' }]}>{label}</Text>
        </View>
    )
}

export default MyCustomCalloutView
