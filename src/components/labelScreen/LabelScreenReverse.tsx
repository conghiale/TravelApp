import { Text, View } from 'react-native'
import Icons from '../shared/icon'
import theme from '@/utils/theme'
import styles from './labdelScreen.style'

const LabelScreenReverse = ({nameIcon, title, color} : LabelScreenProps) => {
  return (
    <View style={styles.title}>
        <Text style={[
          theme.textVariants.textLg, 
          styles.title_text, 
          {marginEnd: 8, color: color ? color : theme.colors.orange}]}>
            {title}
        </Text>
        <Icons name={nameIcon} color={color ? color : theme.colors.orange} />
    </View>
  )
}

export default LabelScreenReverse
