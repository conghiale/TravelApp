import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styles from './ButtonArrowLeft.style'
import Icons from '@/components/shared/icon'

interface ButtonArrowLeftProps {
  onPress?: () => void 
}

const ButtonArrowLeft = ({onPress} : ButtonArrowLeftProps) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.container}>
      <Icons name='arrowLeft' />
    </TouchableOpacity>
  )
}

export default ButtonArrowLeft 