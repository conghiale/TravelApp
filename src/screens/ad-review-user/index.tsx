import { AppScreenNavigationType } from '@/navigation/types'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styles from './reviewUser.style'
import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft'
import theme from '@/utils/theme'
import CustomInputInfoUser from '@/components/input/customInputInfoUser/CustomInputInfoUser'
import LabelScreen from '@/components/labelScreen/LabelScreen'
import LabelScreenReverse from '@/components/labelScreen/LabelScreenReverse'
import Icons from '@/components/shared/icon'
import { LoginHistory, Places } from '@/assets/data'
import LoginHistoryItem from '@/components/loginHistoryItem/LoginHistoryItem'
import Place from '@/components/place/Place'

const ReviewUserScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"ReviewUser">>()

  const [infoValue, setInfoValue] = useState<InfoProps>({
    firstName: 'Cong Nghia',
    lastName: 'Le',
    hobby: 'Phiêu lưu, Mạo Hiểm, Thiên nhiên, Văn hoá'
  })

  const [loginHistory, setLoginHistory] = useState(true)
  const [placeHistory, setPlaceHistory] = useState(true)

  const goBack = () => {
    navigation.goBack()
  }

  const handleChangeValue = (name: keyof InfoProps, value: string) => {
    setInfoValue({
      ...infoValue,
      [name]: value
    })
  }

  const handleLoginHistory = () => {
    setLoginHistory(!loginHistory)
  }

  const handlePlaceHistory = () => {
    setPlaceHistory(!placeHistory)
  }

  return (
    <ScrollView style={{backgroundColor: theme.colors.blue1}} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <ButtonArrowLeft onPress={goBack} />
          <View style={styles.containerTitle}>
            <Text style={[theme.textVariants.textLg, styles.title]}>Review User</Text>
          </View>
        </View>
        <View style={styles.containerContent}>
          <Text
            style={[theme.textVariants.textLg, styles.titleInfo]}>
            Information
          </Text>
          <CustomInputInfoUser
            label='First Name'
            nameIcon='edit'
            value={infoValue.firstName}
            name='firstName'
            handleChangeValue={handleChangeValue}
          />
          <CustomInputInfoUser
            label='Last Name'
            nameIcon='edit'
            value={infoValue.lastName}
            name='lastName'
            handleChangeValue={handleChangeValue} />

          <CustomInputInfoUser
            label='Hobby'
            nameIcon='edit'
            value={infoValue.hobby}
            name='hobby'
            handleChangeValue={handleChangeValue} />
        </View>
        <View style={styles.containerContent}>
          <TouchableOpacity activeOpacity={0.9} onPress={handleLoginHistory}>
            <LabelScreenReverse
              nameIcon={loginHistory === true ? 'sub' : 'add'}
              title='Login History' />
          </TouchableOpacity>
          <View style={[styles.content, { height: loginHistory ? undefined : 0 }]}>
            {LoginHistory.map(loginHistory => (
              <LoginHistoryItem
                key={loginHistory.id}
                id={loginHistory.id}
                startTime={loginHistory.startTime}
                endTime={loginHistory.endTime}
                time={loginHistory.time} />
            ))}
          </View>
        </View>
        <View style={[styles.containerContent, { marginBottom: placeHistory ? 16 : 0 }]}>
          <TouchableOpacity activeOpacity={0.9} onPress={handlePlaceHistory}>
            <LabelScreenReverse
              nameIcon={placeHistory === true ? 'sub' : 'add'}
              title='View Place History' />
          </TouchableOpacity>
          <View style={[styles.content, { height: placeHistory ? undefined : 0 }]}>
            {Places.map(place => (
              <Place
                id={place.id}
                key={place.id}
                destination={place.destination}
                content={place.content}
                star={place.star} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default ReviewUserScreen