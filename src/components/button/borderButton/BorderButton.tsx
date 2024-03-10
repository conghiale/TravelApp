import Icons from '@/components/shared/icon'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './BorderButton.style'
import theme from '@/utils/theme'
import LabelScreen from '@/components/labelScreen/LabelScreen'
import LabelScreenReverse from '@/components/labelScreen/LabelScreenReverse'

const BorderButton = ({ height, label, nameIcon, onPress }: BorderButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[{ height: height ? height : 50 }, styles.container]}
      onPress={onPress}>
      <LabelScreenReverse nameIcon={nameIcon} title={label} />
    </TouchableOpacity>
  )
}

export default BorderButton
