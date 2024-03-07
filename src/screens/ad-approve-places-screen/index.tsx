import { AppScreenNavigationType } from '@/navigation/types'
import theme from '@/utils/theme'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styles from './approvePlaces.style'
import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft'
import { Search } from '@/components'
import LabelScreenReverse from '@/components/labelScreen/LabelScreenReverse'
import { Places } from '@/assets/data'
import ApprovalListItem from '@/components/approvalListIem/ApprovalListItem'

const ApprovePlacesScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"ApprovePlaces">>()

  const [searchValue, setSearchValue] = useState('')

  const handleChangeValueSearch = (value: string) => {
    setSearchValue(value)
  }

  const goBack = () => {
    navigation.goBack()
  }

  const handlePress = (id: number) => {
    navigation.navigate("DetailRequestPlace", { id })
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.blue1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <ButtonArrowLeft onPress={goBack} />
            <View style={styles.containerTitle}>
              <Text style={[theme.textVariants.textLg, styles.title]}>Approval List</Text>
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
          <View style={styles.containerPlace}>
            {Places.map((place, index) => (
              <ApprovalListItem
                key={place.id}
                index={index}
                id={place.id}
                destination={place.destination}
                handlePress={handlePress} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ApprovePlacesScreen