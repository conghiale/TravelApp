import { Text, View } from 'react-native'
import Icons from '../shared/icon'
import theme from '@/utils/theme'
import styles from './labdelScreen.style'

const LabelScreen = ({nameIcon, title, color} : LabelScreenProps) => {
  return (
    <View style={styles.title}>
        <Icons name={nameIcon} color={color ? color : theme.colors.orange} />
        <Text style={[
          theme.textVariants.textLg, 
          styles.title_text, 
          {marginStart: 8, color: color ? color : theme.colors.orange}]}>
            {title}
        </Text>
    </View>
  )
}

export default LabelScreen
