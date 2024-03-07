import { Text, TouchableOpacity, View } from 'react-native'
import styles from './Button02.style'
import Icons from '@/components/shared/icon'
import theme from '@/utils/theme'

const Button02 = ({ height, label, lock, onPress }: Button02Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.button, {
                height: height ? height : 38,
                backgroundColor:  
                    lock === true ? 
                        '#0FBCF9' : 
                    lock === false ?
                        '#FED330' : 
                    '#20BF6B'
            }]}
            onPress={onPress}>
            <Text style={[theme.textVariants.textBase, styles.button_label]}>{label}</Text>
            {lock === true ? <Icons name='unLock' /> : lock === false ? <Icons name='lock' /> : null}
        </TouchableOpacity>
    )
}

export default Button02
