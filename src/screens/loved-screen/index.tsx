import theme, { Box, Text } from '@/utils/theme'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import { ScrollView, View } from 'react-native'
import Icons from '@/components/shared/icon'
import { Places } from '@/assets/data'
import styles from './loved.style'
import ListPlaceItem from '@/components/listPlaceItem/ListPlaceItem'
import LabelScreen from '@/components/labelScreen/LabelScreen'
import Button01 from '@/components/button/button01/Button01'

const LovedScreen = () => {
  console.log('Loved-Place-screen(12): ')
  const [places, setPlaces] = useState<PlaceProps[]>(Places)

  // pagination 
  const [data, setData] = useState<PlaceProps[]>()
  const [page, setPage] = useState(0)
  const [isActionShowMore, setIsActionShowMore] = useState(false)

  useEffect(() => {
    const maxPlaces = 5 + 5 * page
    const newData: PlaceProps[] = Places.slice(0, maxPlaces)
    setData(newData)
  }, [page])

  useEffect(() => {
    if (data?.length === Places.length)
      setIsActionShowMore(true)
    else
      setIsActionShowMore(false)
  }, [data])

  const onDimiss = useCallback((place: PlaceProps) => {
    setPlaces((places) => places.filter((item) => item.id !== place.id))

    // Xoa trong data base
  }, [])

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <ScrollView style={{ marginBottom: 135 }} showsVerticalScrollIndicator={false}>
          <View style={styles.title_container}>
            <LabelScreen nameIcon='loved' title='Loved' />
            <LabelScreen nameIcon='newest' title='Newest' />
          </View>
          {data?.map((place, index) => <ListPlaceItem key={index} placeItem={place} onDismiss={onDimiss} />)}

          <View
            pointerEvents={isActionShowMore ? 'none' : 'auto'}
            style={{ marginTop: 32, marginHorizontal: 50 }}>
            <Button01
              height={60}
              label='Show more'
              color={isActionShowMore ? theme.colors.grey : theme.colors.orange}
              onPress={() => setPage(prePage => prePage + 1)}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  )
}

export default LovedScreen
