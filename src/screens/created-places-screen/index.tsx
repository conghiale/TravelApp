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
import { SelectList } from 'react-native-dropdown-select-list'
import { font } from '@/utils/font'

const CreatedPlacesScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"CreatedPlaces">>()

  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = React.useState('');
  const dataFilter = [
    { key: '1', value: 'All' },
    { key: '2', value: 'Accepted' },
    { key: '3', value: 'Waiting' },
    { key: '4', value: 'Rejected' },
  ]

  const handleChangeValueSearch = (value: string) => {
    setSearchValue(value)
  }

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.blue1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <ButtonArrowLeft onPress={goBack} />
            <View style={styles.containerTitle}>
              <Text style={[theme.textVariants.textLg, styles.title]}>Places Created</Text>
            </View>
          </View>
          <View style={styles.containerSearch}>
            <View style={styles.search}>
              <Search value={searchValue} handleChangeValueSearch={handleChangeValueSearch} />
            </View>
            {/* <View style={styles.dropdown}>
              <LabelScreenReverse nameIcon='dropdown' title='All' />
            </View> */}
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
            {Places.map((place, index) => (
              <View
                key={index}
                style={styles.place}>
                <Place
                  id={place.id}
                  destination_VI={place.destination_VI}
                  content_VI={place.content_VI}
                  star={place.star}
                  status={place.status}
                  longitude={place.longitude}
                  latitude={place.latitude} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default CreatedPlacesScreen