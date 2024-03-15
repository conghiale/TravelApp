import theme from '@/utils/theme'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './approvalListItem.style'
import { parseTimestamp } from '@/utils'

const                  ApprovalListItem = ({ id, index, nameVi, nameEn, handlePress, createdAt }: ApprovalListItemProps) => {
  const handleActionPress = () => {
    // place chỉ cần truyền id
    handlePress(id)
  }

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handleActionPress}>
      <View
        style={[
          styles.place,
          { backgroundColor: (index % 2) === 0 ? '#778ca3' : '#A09D98' }]}>
        <Text style={[theme.textVariants.textLg, styles.destination]}>
          {nameVi}
        </Text>
        <Text style={[theme.textVariants.textLg, styles.destination]}>
          {nameEn}
        </Text>
        <Text style={[theme.textVariants.textLg, styles.destination]}>
          {parseTimestamp(createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ApprovalListItem
