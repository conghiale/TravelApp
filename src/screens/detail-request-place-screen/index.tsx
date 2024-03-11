import { AppScreenNavigationType, AppStackParamList } from '@/navigation/types'
import theme from '@/utils/theme'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Alert, Button, Image, ScrollView, Text, View } from 'react-native'
import styles from './detailRequest.style'
import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft'
import { font } from '@/utils/font'
import Button01 from '@/components/button/button01/Button01'
import Button02 from '@/components/button/button02/Button02'
import { Places } from '@/assets/data'
import FlatlistImagesHorizontal from '@/components/flatList/flasListImagesHorizontal/FlatlistImagesHorizontal'

const data = {
  gmailUser: 'Conghiale@Gmail.com',
  dayStart: '08/10/2023',
  timeStart: '20:30:06',
  image: '../../assets/images/vinh-ha-long.jpg',
  destination: 'Vinh Ha Long',
  content: "Vịnh Hạ Long là một di sản độc đáo bởi địa danh này chứa đựng những dấu tích  quan trọng trong quá trình hình thành và phát triển lịch sử trái đất, là cái nôi cư trú của người Việt cổ, đồng thời là tác phẩm nghệ thuật tạo hình vĩ đại của thiên nhiên với sự hiện diện của hàng nghìn đảo đá muôn hình vạn trạng, với nhiều hang động kỳ thú quần tụ thành một thế giới vừa sinh động vừa huyền bí.Bên cạnh đó, vịnh Hạ Long còn là nơi tập trung đa dạng sinh học cao với những hệ sinh thái điển hình cùng với hàng nghìn loài động thực vật vô cùng phong phú, đa dạng.Nơi đây còn gắn liền với những giá trị văn hóa – lịch sử hào hùng của dân tộc...",
  latitude: '50.3213211',
  longtitude: '120.339228',
  status: 0
}

const DetailRequestPlaceScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"DetailRequestPlace">>()
  const route = useRoute<any>()

  const goBack = () => {
    console.log("DetaileRequestScreen(28): id: " + route.params.id)
    navigation.goBack()
  }

  const handlePressApprove = () => {
    Alert.alert('DETAIL REQUEST', 'Button Approve pressed', [
      { text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel', },
    ]);
  }

  const handlePressReject = () => {
    Alert.alert('DETAIL REQUEST', 'Button Reject pressed', [
      { text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel', },
    ]);
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
              <Text style={[theme.textVariants.textBase, styles.textInfo]}>{data.gmailUser}</Text>
            </View>
            <View style={styles.containerinfoItem}>
              <Text style={[theme.textVariants.textLg, styles.textInfo]}>Time create: </Text>
              <Text style={[theme.textVariants.textBase, styles.textInfo]}>{data.dayStart} - {data.timeStart}</Text>
            </View>
          </View>
          <View style={styles.containerImage}>
              <FlatlistImagesHorizontal data={Places}/>
          </View>
          <View style={styles.containerDestination}>
            <Text style={[theme.textVariants.textLg, styles.textInfo]}>{data.destination}</Text>
            <Text style={[
              theme.textVariants.textBase,
              {
                fontFamily: font.semiBold,
                color: theme.colors.yellow
              }]}>
              {data.status == 0 ? 'Waiting' : data.status == 1 ? 'Rejected' : 'Accepted'}
            </Text>
          </View>
          <Text style={[theme.textVariants.textBase, styles.content]}>{data.content}</Text>
          <View style={styles.containerInfo}>
            <View style={styles.containerinfoItem}>
              <Text style={[theme.textVariants.textLg, styles.textInfo]}>Latitude: </Text>
              <Text style={[theme.textVariants.textBase, styles.textInfo]}>{data.latitude}</Text>
            </View>
            <View style={styles.containerinfoItem}>
              <Text style={[theme.textVariants.textLg, styles.textInfo]}>Longtitude: </Text>
              <Text style={[theme.textVariants.textBase, styles.textInfo]}>{data.longtitude}</Text>
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