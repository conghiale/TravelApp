import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft'
import { AppScreenNavigationType } from '@/navigation/types'
import theme from '@/utils/theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button, Image, Keyboard, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './detailPlace.style'
import { AirbnbRating, Rating } from 'react-native-ratings'
import CustomInput from '@/components/input/CustomInput'
import Icons from '@/components/shared/icon'
import Comment from '@/components/comment/Comment'
import Comments from '@/assets/data/Comments'
import Button01 from '@/components/button/button01/Button01'
import CustomAlert from '@/components/customAler/CustomAlert'
import FlatlistHorizontal from '@/components/flatList/flasListPlacesHorizontal/FlatlistPlaceHorizontal'
import { Places } from '@/assets/data'
import FlatlistImagesHorizontal from '@/components/flatList/flasListImagesHorizontal/FlatlistImagesHorizontal'

const PLACE_IMAGE = '../../assets/images/vinh-ha-long.jpg';

const data = {
  gmailUser: 'Conghiale@Gmail.com',
  dayStart: '08/10/2023',
  timeStart: '20:30:06',
  image: '../../assets/images/vinh-ha-long.jpg',
  destination: 'Vinh Ha Long',
  content: "Vịnh Hạ Long là một di sản độc đáo bởi địa danh này chứa đựng những dấu tích  quan trọng trong quá trình hình thành và phát triển lịch sử trái đất, là cái nôi cư trú của người Việt cổ, đồng thời là tác phẩm nghệ thuật tạo hình vĩ đại của thiên nhiên với sự hiện diện của hàng nghìn đảo đá muôn hình vạn trạng, với nhiều hang động kỳ thú quần tụ thành một thế giới vừa sinh động vừa huyền bí.Bên cạnh đó, vịnh Hạ Long còn là nơi tập trung đa dạng sinh học cao với những hệ sinh thái điển hình cùng với hàng nghìn loài động thực vật vô cùng phong phú, đa dạng.Nơi đây còn gắn liền với những giá trị văn hóa – lịch sử hào hùng của dân tộc...",
  latitude: '50.3213211',
  longtitude: '120.339228',
  status: 0,
  star: 4.5,
}

const DetailPlaceScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"DetailPlace">>()
  
  const route = useRoute<any>()
  const idPlace = route.params ? route.params.id : ''
  console.log('Detail-Place-screen(35): ')
  console.log('Detail-Place-screen(36): ' + idPlace)

  const [love, setLove] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<CommentProps[]>(Comments)
  const [showDialog, setShowDialog] = useState(false)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const goBack = () => {
    navigation.goBack()
  }

  const navigateToMainScreen = () => {
    navigation.reset({
      index: 0,
      routes: [
        { 
          name: "Root",
          params: {id: idPlace}
        }
      ]
    })
  }

  const handlePressButtonLove = () => {
    setLove(!love)
  }

  const handleAddComment = (comment: CommentProps) => {
    setComments(prevComment => [...prevComment, comment])
  }

  const onHandlerActionOK = (star?: number) => {
    const newNomment = {
      id: comments[comments.length-1].id + 1,
      image: 'user.png',
      nameUser: 'Big Boss',
      star: star ? star : 4.5,    
      content: comment
    }

    setComments(prevComment => [...prevComment, newNomment])
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ScrollView style={{ backgroundColor: theme.colors.blue1, paddingBottom: isKeyboardVisible ? 50 : 0 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <ButtonArrowLeft onPress={goBack} />
          <View style={styles.containerTitle}>
            <Text style={[theme.textVariants.textLg, styles.label]}>Detail Place</Text>
          </View>
        </View>
        <View style={styles.placeDetail}>
          <View style={styles.imageContainer} >
            {/* change to data = {places.images} */}
            <FlatlistImagesHorizontal data={Places}/>
          </View>
          <Text style={[theme.textVariants.textXl, styles.content]}>Hạ Long Bay</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Rating
                type='star'
                ratingCount={5}
                startingValue={data.star}
                readonly
                tintColor={theme.colors.blue1}
                imageSize={25}
                fractions={1}
              // jumpValue={0.5}
              // showRating={true}
              />
            </View>
            <View style={styles.rating}>
              <AirbnbRating
                count={1}
                size={30}
                defaultRating={love ? 1 : 0}
                selectedColor='#FF3F34'
                showRating={false}
                isDisabled={false}
                starImage={require('../../assets/images/heart.png')}
                onFinishRating={(rating) => handlePressButtonLove()}
              />
            </View>
          </View>
          <Text style={[theme.textVariants.textLg, styles.content]}>
            {data.content}
          </Text>
        </View>
        <View style={styles.commentContainer}>
          <Text style={[theme.textVariants.textLg, styles.title]}>Comment</Text>
          <View style={styles.commentBox}>
            <View style={{ flex: 1 }}>
              <CustomInput
                name='notValue'
                value={comment}
                placeholder='Enter your comment'
                handleInputChange={setComment}
              />
            </View>
            <View style={styles.sendBtn}>
              <TouchableOpacity
                onPress={() => setShowDialog(true)}
              // onPress={() => setModalVisible(true)}
              >
                <Icons name='send' color='white' />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerUserComment}>
            {comments.map(comment => (
              <View key={comment.id} style={styles.userCommentItem}>
                <Comment
                  id={comment.id}
                  image={comment.image}
                  nameUser={comment.nameUser}
                  star={comment.star}
                  content={comment.content}
                />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.containerButtonFooter}>
          <Button01
            height={60}
            label='Go to map'
            onPress={navigateToMainScreen} />
        </View>
      </View>

      <CustomAlert
        stateColor={theme.colors.yellow}
        displayMode='EVALUATE'
        displayMsg='Let us know how much you like this place?'
        isStar={true}
        visible={showDialog}
        onDimissAlert={setShowDialog}
        onHandlerActionOK={onHandlerActionOK}
      // onHandlerActionCANCEL={onHandlerActionCANCEL}
      />
    </ScrollView>
  )
}

export default DetailPlaceScreen