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
import { createComment, deleteCommentById, getCommentByDestinationId, updateCommentById } from '@/services/comments'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import { getDestinationById, getImagesByDestinationId } from '@/services/destination-service'
import DialogNotification from '@/components/customAler/dialogNotification/DialogNotification'
import { visible } from '@shopify/restyle'

const PLACE_IMAGE = '../../assets/images/vinh-ha-long.jpg';

// const data = {
//   gmailUser: 'Conghiale@Gmail.com',
//   dayStart: '08/10/2023',
//   timeStart: '20:30:06',
//   image: '../../assets/images/vinh-ha-long.jpg',
//   destination: 'Vinh Ha Long',
//   content: "Vịnh Hạ Long là một di sản độc đáo bởi địa danh này chứa đựng những dấu tích  quan trọng trong quá trình hình thành và phát triển lịch sử trái đất, là cái nôi cư trú của người Việt cổ, đồng thời là tác phẩm nghệ thuật tạo hình vĩ đại của thiên nhiên với sự hiện diện của hàng nghìn đảo đá muôn hình vạn trạng, với nhiều hang động kỳ thú quần tụ thành một thế giới vừa sinh động vừa huyền bí.Bên cạnh đó, vịnh Hạ Long còn là nơi tập trung đa dạng sinh học cao với những hệ sinh thái điển hình cùng với hàng nghìn loài động thực vật vô cùng phong phú, đa dạng.Nơi đây còn gắn liền với những giá trị văn hóa – lịch sử hào hùng của dân tộc...",
//   latitude: '50.3213211',
//   longtitude: '120.339228',
//   status: 0,
//   star: 4.5,
// }

const DetailPlaceScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"DetailPlace">>()

  const route = useRoute<any>()
  const idPlace = route.params ? route.params.id : ''

  const { user, updateUser } = useUserGlobalStore();

  const [destination, setDestination] = useState<ApiReturnDestination>()
  const [love, setLove] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<CommentProps[]>([])
  const [destinationImages, setDestinationImages] = useState<string[]>([])
  const [showDialog, setShowDialog] = useState(false)
  const [showDialogRemoveComment, setShowDialogRemoveComment] = useState(false)
  const [dialogComment, setDialogComment] = useState({
    status: '',
    visible: false,
    mode: '',
    msg: ''
  })
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [idCommentChoose, setIdCommentChoose] = useState('')
  const [inputEditComment, setInputEditComment] = useState('')
  const [starEditComment, setStarEditComment] = useState<number>()


  const goBack = () => {
    navigation.goBack()
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

  useEffect(() => {
    getCommentByDestinationId(idPlace)
      .then((res) => {
        const dataComments: ApiReturnUserComment[] = res.data.data

        const comentsInit: CommentProps[] = dataComments.map((comment) =>
        ({
          _id: comment._id,
          avatar: comment.avatar,
          email: comment.email,
          star: comment.star,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt
        }))

        setComments(comentsInit)
    })

    getDestinationById(idPlace)
    .then(res => {
      const dest : ApiReturnDestination = res.data.data
      setDestination(dest)
      setDestinationImages(dest.images)
    })

    // getImagesByDestinationId(idPlace)
    //   .then(res => {
    //     const dataImages: string[] = res.data.data
    //     setDestinationImages(dataImages)
    //   })

  }, [])

  const navigateToMainScreen = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Root",
          params: { id: idPlace }
        }
      ]
    })
  }

  const handlePressButtonLove = () => {
    setLove(!love)
  }

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  const onHandlerActionOK_EVALUATE = (star?: number) => {
    // const rand = getRandomNumber(1, 100)

    idCommentChoose === '' ? createComment(user && user.id ? user.id : '', idPlace, comment, star ? star : 4.5)
      .then(res => {
        const newNomment = {
          _id: res.data.data._id,
          avatar: res.data.data.avatar,
          email: res.data.data.email,
          star: res.data.data.star,
          content: res.data.data.content,
          createdAt: res.data.data.createdAt,
          updatedAt: res.data.data.updatedAt,
        }

        setComments(prevComment => [...prevComment, newNomment])
        setComment('')
      }) :
      updateCommentById(idCommentChoose, inputEditComment, star ? star : 4.5)
        .then(res => {

          const { content, star, updatedAt } = res.data.data

          setComments(prevComments => (
            prevComments.map(comment => comment._id === idCommentChoose ?
              {
                ...comment,
                content: content,
                star: star,
                updatedAt: updatedAt
              } : comment)
          ))

          setDialogComment({
            status: 'success',
            visible: true,
            mode: '',
            msg: res.data.message
          })

          setInputEditComment('')
          setIdCommentChoose('')
        })
        .catch(err => console.log(err))
  }

  const onHandlerActionOK_REOMOVE = () => {
    // const rand = getRandomNumber(1, 100)
    idCommentChoose !== '' ? deleteCommentById(idCommentChoose)
      .then(res => {

        setDialogComment({
          status: 'success',
          visible: true,
          mode: '',
          msg: res.data.message
        })

        setComments(prevComments => prevComments.filter(c => c._id !== idCommentChoose))
        setComment('')
        setIdCommentChoose('')
      }) : undefined
  }

  const onDimissAlert = (visible: boolean) => {
    setDialogComment(prevRemove => ({ ...prevRemove, ['visible']: visible }))
  }

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <DialogNotification
        status='error'
        displayMode='REMOVE COMMENT'
        displayMsg='Are you sure you want to delete this comment?'
        visible={showDialogRemoveComment}
        onDimissAlert={setShowDialogRemoveComment}
        onHandlerActionOK={onHandlerActionOK_REOMOVE}
      />

      <DialogNotification
        status='success'
        displayMode={dialogComment.mode}
        displayMsg={dialogComment.msg}
        visible={dialogComment.status === 'success' && dialogComment.visible}
        onDimissAlert={onDimissAlert}
      // onHandlerActionOK={() => setDialogComment(prevDialogComment => ({...prevDialogComment, visible: false}))}
      />

      <CustomAlert
        stateColor={theme.colors.yellow}
        displayMode='EVALUATE'
        displayMsg='Let us know how much you like this place?'
        isStar={true}
        visible={showDialog}
        isEdit={true}
        star={starEditComment}
        inputComment={comment !== '' ? comment : inputEditComment}
        onChangeInput={setInputEditComment}
        onDimissAlert={setShowDialog}
        onHandlerActionOK={onHandlerActionOK_EVALUATE}
      // onHandlerActionCANCEL={onHandlerActionCANCEL}
      />

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
              <FlatlistImagesHorizontal data={destinationImages} />
            </View>
            <Text style={[theme.textVariants.textXl, styles.content]}>{destination?.nameVi}</Text>
            <View style={styles.ratingContainer}>
              <View style={styles.rating}>
                <Rating
                  type='star'
                  ratingCount={5}
                  startingValue={destination?.vote}
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
                  onFinishRating={() => handlePressButtonLove()}
                />
              </View>
            </View>
            <Text style={[theme.textVariants.textLg, styles.content]}>
              {destination?.descriptionVi}
            </Text>
          </View>
          <View style={styles.commentContainer}>
            <Text style={[theme.textVariants.textLg, styles.title]}>Comment</Text>
            <View style={styles.commentBox}>
              <View style={{ flex: 1 }}>
                <CustomInput
                  name='contentComment'
                  value={comment}
                  placeholder='Enter your comment'
                  handleInputChange={setComment}
                />
              </View>
              <View style={styles.sendBtn}>
                <TouchableOpacity
                  onPress={() => {
                    setIdCommentChoose('')
                    setShowDialog(true)
                  }}
                >
                  <Icons name='send' color='white' />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerUserComment}>
              {comments.map((comment, index) => (
                <View key={index} style={styles.userCommentItem}>
                  <Comment
                    _id={comment._id}
                    avatar={comment.avatar}
                    email={comment.email}
                    star={comment.star}
                    content={comment.content}
                    createdAt={comment.createdAt}
                    updatedAt={comment.updatedAt}
                    onActionRemove={(id: string) => {
                      setShowDialogRemoveComment(true)
                      setIdCommentChoose(id)
                    }}
                    onActionEdit={() => {
                      setInputEditComment(comment.content)
                      setStarEditComment(comment.star)
                      setIdCommentChoose(comment._id)
                      setShowDialog(true)
                    }}
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
      </ScrollView>
    </View>
  )
}

export default DetailPlaceScreen