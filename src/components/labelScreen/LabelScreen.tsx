import { Text, View } from 'react-native'
import Icons from '../shared/icon'
import theme from '@/utils/theme'
import styles from './labdelScreen.style'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import { themeConstant } from '@/API/src/utils/constant'
import { DarkMode, LightMode } from '@/utils/mode'

const LabelScreen = ({nameIcon, title, color} : LabelScreenProps) => {
  const {user} = useUserGlobalStore();
  const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;
  return (
    <View style={styles.title}>
        <Icons name={nameIcon} color={color ? color : mode.orange1} />
        <Text style={[
          theme.textVariants.textXl, 
          styles.title_text, 
          {marginStart: 8, color: color ? color : mode.orange1}]}>
            {title}
        </Text>
    </View>
  )
}

export default LabelScreen
