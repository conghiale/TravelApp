import { TouchableOpacity } from 'react-native'
import styles from './BorderButton.style'
import LabelScreenReverse from '@/components/labelScreen/LabelScreenReverse'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import { themeConstant } from '@/API/src/utils/constant'
import { DarkMode, LightMode } from '@/utils/mode'

const BorderButton = ({ height, label, nameIcon, onPress }: BorderButtonProps) => {
  const {user} = useUserGlobalStore();
  const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[{ height: height ? height : 50, borderColor: mode.orange2 }, styles.container]}
      onPress={onPress}>
      <LabelScreenReverse nameIcon={nameIcon} title={label} color={mode.orange2} />
    </TouchableOpacity>
  )
}

export default BorderButton
