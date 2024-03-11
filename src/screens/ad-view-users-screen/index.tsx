import { AppScreenNavigationType } from '@/navigation/types'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Button, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styles from './viewUsers.style'
import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft'
import LabelScreen from '@/components/labelScreen/LabelScreen'
import { Search } from '@/components'
import LabelScreenReverse from '@/components/labelScreen/LabelScreenReverse'
import { Users } from '@/assets/data'
import ProfileUser from '@/components/profileUser/ProfileUser'
import theme from '@/utils/theme'
import { SelectList } from 'react-native-dropdown-select-list'
import { font } from '@/utils/font'
import Icons from '@/components/shared/icon'

const ViewUsersScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"ViewUsers">>()

  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = React.useState('');
  const dataFilter = [
    { key: '1', value: 'All' },
    { key: '2', value: 'Lock' },
    { key: '3', value: 'Unlock' },
  ]
  const [users, setUsers] = useState<CardUserProps[]>()

  const goBack = () => {
    navigation.goBack()
  }

  useEffect(() => {
    // get data user from server
    if (searchValue === '' && selected === '')
      setUsers(Users)
    
  }, [])

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
    <ScrollView style={{ backgroundColor: theme.colors.blue1 }} showsVerticalScrollIndicator={false}>
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
        </View>
        <View style={{ width: '100%', marginTop: 16 }}>
          <SelectList
            setSelected={(val: React.SetStateAction<string>) => setSelected(val)}
            data={dataFilter}
            save="value"
            placeholder='-- Select state --'
            searchPlaceholder='-- Select state --'
            defaultOption={dataFilter[0]}
            fontFamily={font.semiBold}
            boxStyles={{ borderWidth: 2, borderColor: theme.colors.white }}
            inputStyles={{ color: theme.colors.orange, fontSize: 16 }}
            dropdownStyles={{ borderWidth: 2, borderColor: theme.colors.white }}
            dropdownTextStyles={{ color: theme.colors.white, fontSize: 16 }}
          />
        </View>
        <View style={styles.containerUser}>
          {Users.map(user => (
            <View
              key={user.id}
              style={styles.user}>
              <ProfileUser
                image={user.image}
                email={user.gmail}
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