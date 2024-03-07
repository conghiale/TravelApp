import { AppScreenNavigationType } from '@/navigation/types'
import theme from '@/utils/theme'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styles from './createdPlaces.style'
import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft'
import { Search } from '@/components'
import LabelScreenReverse from '@/components/labelScreen/LabelScreenReverse'
import { Places } from '@/assets/data'
import Place from '@/components/place/Place'

const CreatedPlacesScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"CreatePlace">>()

  const [searchValue, setSearchValue] = useState('')
  
  const handleChangeValueSearch = (value: string) => {
    setSearchValue(value)
  }
  
  const goBack = () => {
    navigation.goBack()
  }

  return (
    <View style={{flex: 1, backgroundColor : theme.colors.blue1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            {Places.map(place => (
              <View
                key={place.id}
                style={styles.place}>
                <Place
                  id={place.id}
                  destination={place.destination}
                  content={place.content}
                  star={place.star}
                  status={place.status} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default CreatedPlacesScreen