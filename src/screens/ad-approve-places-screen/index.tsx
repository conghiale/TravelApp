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
import { SelectList } from 'react-native-dropdown-select-list'
import { font } from '@/utils/font'

const ApprovePlacesScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"ApprovePlaces">>()

  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = React.useState('');
  const dataFilter = [
    { key: '1', value: 'Recent times' },
    { key: '2', value: 'Longest time' },
  ]

  const handleChangeValueSearch = (value: string) => {
    setSearchValue(value)
  }

  const goBack = () => {
    navigation.goBack()
  }

  const handlePress = (id: string) => {
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

          <View style={styles.containerPlace}>
            {Places.map((place, index) => (
              <ApprovalListItem
                key={place.id}
                index={index}
                id={place.id}
                destination={place.destination_VI}
                handlePress={handlePress} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ApprovePlacesScreen