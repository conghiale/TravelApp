import { Box, Text } from '@/utils/theme'
import { Pressable } from 'react-native'
import theme from '@/utils/theme'

type ButtonProps = {
  label: string
  onPress: () => void
  onLongPress?: () => void
  disabled?: boolean
}

const Button = ({ label, onPress, onLongPress, disabled }: ButtonProps) => {
  return (
    <Pressable>
      <Box bg={disabled ? "grey" : "orange"} borderRadius='rounded-2xl'>
        <Text color='white' variant='textXs' fontWeight='700' textAlign='center'>
          {label}
        </Text>
      </Box>
    </Pressable>
  )
}

export default Button