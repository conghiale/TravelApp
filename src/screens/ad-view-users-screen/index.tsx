import { AppScreenNavigationType } from '@/navigation/types'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, Button, ScrollView, Text, View } from 'react-native'
import styles from './viewUsers.style'
import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft'
import LabelScreen from '@/components/labelScreen/LabelScreen'
import { Search } from '@/components'
import LabelScreenReverse from '@/components/labelScreen/LabelScreenReverse'
import { Users } from '@/assets/data'
import ProfileUser from '@/components/profileUser/ProfileUser'
import theme from '@/utils/theme'

const ViewUsersScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"ViewUsers">>()

  const [searchValue, setSearchValue] = useState('')

  const goBack = () => {
    navigation.goBack()
  }

  const handleChangeValueSearch = (value: string) => {
    setSearchValue(value)
  }

  const handleButtonLock = () => {
    Alert.alert('LOCK', 'Button Lock pressed', [
      { text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel', },
    ]);
  }

  const handleButtonReview = () => {
    navigation.navigate("ReviewUser")
  }

  return (
    <ScrollView style={{backgroundColor : theme.colors.blue1}} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <ButtonArrowLeft onPress={goBack} />
          <View style={styles.containerTitle}>
            <Text style={[theme.textVariants.textLg, styles.title]}>Users</Text>
          </View>
        </View>
        <View style={styles.containerSearch}>
          <View style={styles.search}>
            <Search value={searchValue} handleChangeValueSearch={handleChangeValueSearch} />
          </View>
          <View style={styles.dropdown}>
            <LabelScreenReverse nameIcon='dropdown' title='All' />
          </View>
        </View>
        <View style={styles.containerUser}>
          {Users.map(user => (
            <View
              key={user.id}
              style={styles.user}>
              <ProfileUser
                image={user.image}
                gmail={user.gmail}
                firstName={user.firstName}
                LastName={user.lastName}
                hobby={user.hobby}
                lock={user.lock}
                handleButtonLock={handleButtonLock}
                handleButtonReview={handleButtonReview} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default ViewUsersScreen