import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft';
import {AppScreenNavigationType} from '@/navigation/types';
import theme from '@/utils/theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Keyboard, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './detailPlace.style';
import {AirbnbRating, Rating} from 'react-native-ratings';
import CustomInput from '@/components/input/CustomInput';
import Icons from '@/components/shared/icon';
import Comment from '@/components/comment/Comment';
import Button01 from '@/components/button/button01/Button01';
import CustomAlert from '@/components/customAler/CustomAlert';
import FlatlistImagesHorizontal from '@/components/flatList/flasListImagesHorizontal/FlatlistImagesHorizontal';
import {
  checkUserLoveDestination,
  createComment,
  deleteCommentById,
  getCommentByDestinationId,
  toggleLoveDestination,
  updateCommentById,
} from '@/services/comments-service';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import {getDestinationById} from '@/services/destination-service';
import DialogNotification from '@/components/customAler/dialogNotification/DialogNotification';
import {defaultDialog, getErrorMessage} from '@/utils';
import {labelEn, labelVi} from '@/utils/label';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from '@/components/dialog-handle-event';
import {languageConstant, themeConstant} from '@/API/src/utils/constant';
import {DarkMode, LightMode} from '@/utils/mode';

const DetailPlaceScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<'DetailPlace'>>();

  const route = useRoute<any>();
  const idPlace = route.params ? route.params.id : '';

  const {user, updateUser} = useUserGlobalStore();
  const bilingual = user?.language === languageConstant.VI ? labelVi : labelEn;
  const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;
  const [loading, setLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);

  const [destination, setDestination] = useState<ApiReturnDestination>();
  const [love, setLove] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [destinationImages, setDestinationImages] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogRemoveComment, setShowDialogRemoveComment] = useState(false);
  const [dialogComment, setDialogComment] = useState({
    status: '',
    visible: false,
    mode: '',
    msg: '',
  });
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [idCommentChoose, setIdCommentChoose] = useState('');
  const [inputEditComment, setInputEditComment] = useState('');
  const [starEditComment, setStarEditComment] = useState<number>();

  const goBack = () => {
    if (user?.data_loaded) {
      updateUser({
        ...user,
        no_loading: true,
      });
    }
    navigation.goBack();
  };

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

  const fetchComments = () => {
    setLoading(true);
    getCommentByDestinationId(idPlace)
      .then(res => {
        const dataComments: ApiReturnUserComment[] = res.data.data;
        const commentsInit: CommentProps[] = dataComments.map(comment => ({
          _id: comment._id,
          avatar: comment.avatar,
          email: comment.email,
          star: comment.star,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        }));

        setComments(commentsInit);
      })
      .catch(e => getErrorMessage(e))
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchDest = () => {
    setLoading(true);
    getDestinationById(idPlace)
      .then(res => {
        const dest: ApiReturnDestination = res.data.data;
        setDestination(dest);
        setDestinationImages(dest.images);
      })
      .catch(e => getErrorMessage(e))
      .finally(() => setLoading(false));
  };

  const fetchUserLoveDest = () => {
    if (user && user.id)
      checkUserLoveDestination(user.id, idPlace)
        .then(r => {
          setLove(true);
        })
        .catch(e => {
          setLove(false);
        });
  };
  useEffect(() => {
    fetchUserLoveDest();
    fetchComments();
    fetchDest();
  }, []);

  const navigateToMainScreen = () => {
    navigation.navigate('Root', {
      screen: 'Home',
      params: {
        id: idPlace,
        latitude: destination?.latitude,
        longitude: destination?.longitude,
      },
    });
  };

  const handlePressButtonLove = () => {
    if (user && user.id)
      toggleLoveDestination({
        userId: user.id,
        destId: idPlace,
        flag: !love,
      })
        .then(r => {
          setLove(!love);
        })
        .catch(e => {
          setDialog({
            visible: true,
            type: 'error',
            message: getErrorMessage(e),
            handleOk: () => setDialog(defaultDialog),
          });
        });
  };

  const onHandlerActionOK_EVALUATE = (star?: number) => {
    idCommentChoose === ''
      ? createComment(
          user && user.id ? user.id : '',
          idPlace,
          comment,
          star ? star : 4.5,
        ).then(res => {
          const newComment = {
            _id: res.data.data._id,
            avatar: res.data.data.avatar,
            email: res.data.data.email,
            star: res.data.data.star,
            content: res.data.data.content,
            createdAt: res.data.data.createdAt,
            updatedAt: res.data.data.updatedAt,
          };

          setComments(prevComment => [newComment, ...prevComment]);
          setComment('');
          updateUser({
            ...user,
            data_loaded: false,
          });
        })
      : updateCommentById(idCommentChoose, inputEditComment, star ? star : 4.5)
          .then(res => {
            const {content, star, updatedAt} = res.data.data;

            setComments(prevComments =>
              prevComments.map(comment =>
                comment._id === idCommentChoose
                  ? {
                      ...comment,
                      content: content,
                      star: star,
                      updatedAt: updatedAt,
                    }
                  : comment,
              ),
            );

            setDialogComment({
              status: 'success',
              visible: true,
              mode: '',
              msg: bilingual.DETAIL_PLACE.SUCCESS.EDIT_CMT,
            });

            setInputEditComment('');
            setIdCommentChoose('');
            updateUser({
              ...user,
              data_loaded: false,
            });
          })
          .catch(err => {
            getErrorMessage(err);
          });
  };

  const onHandlerActionOK_REMOVE = () => {
    // const rand = getRandomNumber(1, 100)
    idCommentChoose !== ''
      ? deleteCommentById(idCommentChoose).then(res => {
          setDialogComment({
            status: 'success',
            visible: true,
            mode: '',
            msg: bilingual.DETAIL_PLACE.SUCCESS.DEL_CMT,
          });

          setComments(prevComments =>
            prevComments.filter(c => c._id !== idCommentChoose),
          );
          setComment('');
          setIdCommentChoose('');
          updateUser({
            ...user,
            data_loaded: false,
          });
        })
      : undefined;
  };

  const onDimissAlert = (visible: boolean) => {
    setDialogComment(prevRemove => ({...prevRemove, ['visible']: visible}));
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <Spinner
        size={'large'}
        visible={loading}
        color={mode.orange1}
        animation={'fade'}
      />
      <Dialog
        isVisible={dialog.visible}
        message={dialog.message}
        type={dialog.type}
        handleOk={dialog.handleOk}
      />
      {/* //lor */}
      <DialogNotification
        status="error"
        displayMode="REMOVE COMMENT"
        displayMsg={bilingual.DETAIL_PLACE.CF_DEL_CMT}
        visible={showDialogRemoveComment}
        onDimissAlert={setShowDialogRemoveComment}
        onHandlerActionOK={onHandlerActionOK_REMOVE}
      />
      <DialogNotification
        status="success"
        displayMode={dialogComment.mode}
        displayMsg={dialogComment.msg}
        visible={dialogComment.status === 'success' && dialogComment.visible}
        onDimissAlert={onDimissAlert}
        // onHandlerActionOK={() => console.log('OK')}
        // onHandlerActionOK={() => setDialogComment(prevDialogComment => ({...prevDialogComment, visible: false}))}
      />
      {/* //end lor */}
      <CustomAlert
        stateColor={mode.yellow}
        displayMode="EVALUATE"
        displayMsg={bilingual.DETAIL_PLACE.ASK_STAR}
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
      <ScrollView
        style={{
          backgroundColor: mode.blue1,
          paddingBottom: isKeyboardVisible ? 50 : 0,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {backgroundColor: mode.blue1}]}>
          <View style={styles.containerHeader}>
            <ButtonArrowLeft onPress={goBack} />
            <View style={styles.containerTitle}>
              <Text
                style={[
                  theme.textVariants.textLg,
                  styles.label,
                  {color: mode.orange},
                ]}>
                {bilingual.DETAIL_PLACE.TITLE}
              </Text>
            </View>
          </View>
          <View style={styles.placeDetail}>
            <View style={styles.imageContainer}>
              {/* change to data = {places.images} */}
              <FlatlistImagesHorizontal data={destinationImages} />
            </View>
            <Text
              style={[
                theme.textVariants.textXl,
                styles.content,
                {color: mode.white},
              ]}>
              {destination?.nameVi}
            </Text>
            <View style={styles.ratingContainer}>
              <View style={styles.rating}>
                <Rating
                  type="star"
                  ratingCount={5}
                  startingValue={destination?.vote}
                  readonly
                  tintColor={mode.blue1}
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
                  selectedColor={mode.red}
                  showRating={false}
                  isDisabled={false}
                  starImage={require('../../assets/images/heart.png')}
                  onFinishRating={() => handlePressButtonLove()}
                />
              </View>
            </View>
            <Text
              style={[
                theme.textVariants.textLg,
                styles.content,
                {color: mode.white},
              ]}>
              {destination?.descriptionVi}
            </Text>
          </View>
          <View style={styles.commentContainer}>
            <Text
              style={[
                theme.textVariants.textLg,
                styles.title,
                {color: mode.orange},
              ]}>
              {bilingual.DETAIL_PLACE.COMMENT}
            </Text>
            <View style={[styles.commentBox, {backgroundColor: mode.grey3}]}>
              <View style={{flex: 1}}>
                <CustomInput
                  name="contentComment"
                  value={comment}
                  placeholder={bilingual.DETAIL_PLACE.ENTER_COMMENT}
                  handleInputChange={setComment}
                />
              </View>
              <View style={[styles.sendBtn, {backgroundColor: mode.blue}]}>
                <TouchableOpacity
                  onPress={() => {
                    setIdCommentChoose('');
                    setShowDialog(true);
                  }}>
                  <Icons name="send" color={mode.white} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerUserComment}>
              {comments.map((comment, index) => (
                <View
                  key={index}
                  style={[
                    styles.userCommentItem,
                    {
                      backgroundColor: mode.blue1,
                      shadowColor: mode.black,
                    },
                  ]}>
                  <Comment
                    _id={comment._id}
                    avatar={comment.avatar}
                    email={comment.email}
                    star={comment.star}
                    content={comment.content}
                    createdAt={comment.createdAt}
                    updatedAt={comment.updatedAt}
                    onActionRemove={(id: string) => {
                      setShowDialogRemoveComment(true);
                      setIdCommentChoose(id);
                    }}
                    onActionEdit={() => {
                      setInputEditComment(comment.content);
                      setStarEditComment(comment.star);
                      setIdCommentChoose(comment._id);
                      setShowDialog(true);
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
          {!loading && (
            <View
              style={[styles.containerButtonFooter, {shadowColor: mode.black}]}>
              <Button01
                height={60}
                label={bilingual.DETAIL_PLACE.GO_MAP}
                onPress={navigateToMainScreen}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailPlaceScreen;
