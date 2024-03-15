import { AppScreenNavigationType, AppStackParamList } from '@/navigation/types'
import theme from '@/utils/theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert, ScrollView, Text, View } from 'react-native'
import styles from './detailRequest.style'
import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft'
import { font } from '@/utils/font'
import Button01 from '@/components/button/button01/Button01'
import FlatlistImagesHorizontal from '@/components/flatList/flasListImagesHorizontal/FlatlistImagesHorizontal'
import { useEffect, useState } from 'react'
import { getDestinationById } from '@/services/destination-service'
import { parseTimestamp } from '@/utils'

const DetailRequestPlaceScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"DetailRequestPlace">>()
  const route = useRoute<any>()
  const [place, setPlace] = useState<ApiReturnDestination>({
    _id: route.params.id,
    descriptionEn: '',
    descriptionVi: '',
    images: [],
    latitude: 0,
    longitude: 0,
    nameEn: '',
    nameVi: '',
    status: 0,
    types: [],
    vote: 0,
  })
  console.log("DetaileRequestScreen(28) - id:" + route.params.id)

  useEffect(() => {
    getDestinationById(route.params.id).then(r => {
      setPlace(r.data.data as ApiReturnDestination)
    })
  }, [])

  const goBack = () => {
    navigation.goBack()
  }

  const handlePressApprove = () => {
    Alert.alert('DETAIL REQUEST', 'Button Approve pressed', [
      { text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel', },
    ]);
  }

  const handlePressReject = () => {
    // Alert.alert('DETAIL REQUEST', 'Button Reject pressed', [
    //   { text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel', },
    // ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.blue1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <ButtonArrowLeft onPress={goBack} />
            <View style={styles.containerTitle}>
              <Text style={[theme.textVariants.textLg, styles.title]}>Detail Request</Text>
            </View>
          </View>
          <View style={styles.containerInfo}>
            <View style={styles.containerinfoItem}>
              <Text style={[theme.textVariants.textLg, styles.textInfo]}>Created by: </Text>
              <Text style={[theme.textVariants.textBase, styles.textInfo]}>{place.createdBy}</Text>
            </View>
            <View style={styles.containerinfoItem}>
              <Text style={[theme.textVariants.textLg, styles.textInfo]}>Time create: </Text>
              <Text style={[theme.textVariants.textBase, styles.textInfo]}>{parseTimestamp(place.createdAt?place.createdAt:'')}</Text>
            </View>
          </View>
          <View style={styles.containerImage}>
              <FlatlistImagesHorizontal data={place?.images ? place.images : []}/>
          </View>
          <View style={styles.containerDestination}>
            <Text style={[theme.textVariants.textLg, styles.textInfo]}>{place.nameVi}</Text>
            <Text style={[
              theme.textVariants.textBase,
              {
                fontFamily: font.semiBold,
                color: theme.colors.yellow
              }]}>
              {place.status == 0 ? 'Waiting' : place.status == 1 ? 'Rejected' : 'Accepted'}
            </Text>
          </View>
          <Text style={[theme.textVariants.textBase, styles.content]}>{place.descriptionVi}</Text>
          <View style={styles.containerInfo}>
            <View style={styles.containerinfoItem}>
              <Text style={[theme.textVariants.textLg, styles.textInfo]}>Latitude: </Text>
              <Text style={[theme.textVariants.textBase, styles.textInfo]}>{place.latitude}</Text>
            </View>
            <View style={styles.containerinfoItem}>
              <Text style={[theme.textVariants.textLg, styles.textInfo]}>Longtitude: </Text>
              <Text style={[theme.textVariants.textBase, styles.textInfo]}>{place.longitude}</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={{ flex: 1 }}>
              <Button01 height={60} label='Approve' color='#63D52D' onPress={handlePressApprove} />
            </View>
            <View style={{ flex: 1 }}>
              <Button01 height={60} label='Reject' color='#D52D2D' onPress={handlePressReject} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailRequestPlaceScreen