import theme from '@/utils/theme'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './approvalListItem.style'

const ApprovalListItem = ({ id, index, destination, handlePress }: ApprovalListItemProps) => {
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
          {destination}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ApprovalListItem
