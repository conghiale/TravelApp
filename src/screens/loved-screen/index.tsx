import theme, { Box, Text } from '@/utils/theme'
import React, { useCallback, useRef, useState } from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import { ScrollView, View } from 'react-native'
import Icons from '@/components/shared/icon'
import { Places } from '@/assets/data'
import styles from './loved.style'
import ListPlaceItem from '@/components/listPlaceItem/ListPlaceItem'
import LabelScreen from '@/components/labelScreen/LabelScreen'

const LovedScreen = () => {
  const [places, setPlaces] = useState(Places)

  const onDimiss = useCallback((place: PlaceProps) => {
    setPlaces((places) => places.filter((item) => item.id !== place.id))

    // Xoa trong data base
  }, [])

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <ScrollView style={{marginBottom: 135}} showsVerticalScrollIndicator={false}>
          <View style={styles.title_container}>
            <LabelScreen nameIcon='loved' title='Loved' />
            <LabelScreen nameIcon='newest' title='Newest' />
          </View>
          {places.map((place) => <ListPlaceItem key={place.id} placeItem={place} onDismiss={onDimiss} />)}
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  )
}

export default LovedScreen
