import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import Icons from '@/components/shared/icon';
import styles from './editScreen.style';
import theme from '@/utils/theme';
import {AppScreenNavigationType} from '@/navigation/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import ImageUpload from '@/components/imageUpload/ImageUpload';
import DialogChooseImage from '@/components/customAler/dialogChooseImage/DialogChooseImage';
import * as ImagePicker from 'react-native-image-picker';
import Button01 from '@/components/button/button01/Button01';
import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft';
import BorderButton from '@/components/button/borderButton/BorderButton';
import {
  getDestinationById,
  getDestinationTypes,
  resubmitDestination,
  updateDestination,
} from '@/services/destination-service';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import {labelEn, labelVi} from '@/utils/label';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from '@/components/dialog-handle-event';
import {
  defaultDialog,
  getErrorMessage,
  getRandomIntInclusive,
  randomNumberString,
} from '@/utils';
import {BASE_URL_DESTINATION} from '@/services/config';
import { languageConstant, statusDestinationConstant, themeConstant } from '@/API/src/utils/constant';
import { DarkMode, LightMode } from '@/utils/mode';
import Place from '@/components/place/Place';
import { font } from '@/utils/font';

const EditPlaceScreen = () => {
  const {user} = useUserGlobalStore();
  const bilingual = user?.language === languageConstant.VI ? labelVi : labelEn;
  const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;
  const [loading, setLoading] = useState<boolean>(true);
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);
  const navigation = useNavigation<AppScreenNavigationType<'EditPlace'>>();

  const routes = useRoute<any>();
  const idPlace = routes.params ? routes.params.id : '-1';
  console.log('EditPlaceScreen(32): idPlace: ' + idPlace);

  const [placeUpdate, setPlaceUpdate] = useState<PlaceProps>({
    id: idPlace,
    nameVi: '',
    nameEn: '',
    descriptionVi: '',
    descriptionEn: '',
    vote: -1,
    longitude: 0,
    latitude: 0,
    status: -1,
    types: [],
    images: [],
  });

  const [onFocus, setOnFoCus] = useState<FocusInfoUser>({
    nameVi: false,
    nameEn: false,
    descriptionVi: false,
    descriptionEn: false,
    latitude: false,
    longitude: false,
  });

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [showTakeImage, setShowTakeImage] = useState(false);
  const [idImage, setIdImage] = useState(-1);
  const [isShowDialogFilter, setShowDialogFilter] = useState(false);
  const [types, setTypes] = useState<TypesFilterProps[]>([]);
  const [typesModal, setTypesModal] = useState<TypesFilterProps[]>([]);

  const [imageUploads, setImageUploads] = useState<UploadImages[]>([]);

  const goBack = () => {
    navigation.goBack();
  };

  const fetchPlace = () => {
    setLoading(true);
    getDestinationById(routes?.params?.id)
      .then((r: any) => {
        const d: ApiReturnDestination = r.data.data;
        console.log(d.status)
        setPlaceUpdate({
          id: d._id,
          nameVi: d.nameVi,
          nameEn: d.nameEn,
          descriptionVi: d.descriptionVi,
          descriptionEn: d.descriptionEn,
          createdBy: d.nameVi,
          latitude: d.latitude,
          longitude: d.longitude,
          types: d.types,
          images: d.images,
          vote: d.vote,
          status: d.status,
          reasonReject: d.reasonReject,
        });

        setImageUploads(
          d.images.map((img, index) => ({
            id: index,
            uri: `${BASE_URL_DESTINATION}/${img}`,
          })),
        );

        getDestinationTypes()
          .then(r => {
            const dataCustom: TypesFilterProps[] = r.data.data.map(
              (dtype: ApiReturnDestType) => ({
                dest: {
                  id: dtype._id,
                  label:
                    user?.language === 'VI' ? dtype.labelVi : dtype.labelEn,
                },
                isChoose: d.types?.includes(dtype._id),
              }),
            );
            setTypes(dataCustom);
            setTypesModal(dataCustom);
          })
          .catch(e => {
            setDialog({
              visible: true,
              message: getErrorMessage(e),
              type: 'error',
              handleOk: () => goBack(),
            });
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(e => {
        setDialog({
          visible: true,
          message: getErrorMessage(e),
          type: 'error',
          handleOk: () => goBack(),
        });
      });
  }
  // Get places by id
  useEffect(() => {
    fetchPlace();
  }, []);

  // keyboard
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

  // Set ImageUpload
  useEffect(() => {
    setImageUploads([]);
    placeUpdate.images?.map((uriImage, index) => {
      setImageUploads(prevUploads => {
        return prevUploads.map(upload => {
          return {...upload, id: index, uri: uriImage};
        });
      });
    });
  }, [idPlace]);

  const uploadImage = async ({type, options1, options2}: any) => {
    if (type === 'capture') {
      await ImagePicker.launchCamera(options1, response => {
        if (response.didCancel) {
          setDialog({
            type: 'error',
            visible: true,
            message: bilingual.CREATE_EDIT_DEST.CAMERA_CANCELED,
            handleOk: () => setDialog(defaultDialog),
          });
        } else if (response.errorCode) {
          setDialog({
            type: 'error',
            visible: true,
            message: response.errorMessage
              ? response.errorMessage
              : bilingual.CREATE_EDIT_DEST.CAMERA_ERROR,
            handleOk: () => setDialog(defaultDialog),
          });
        } else {
          let imageUri = response.assets?.[0]?.uri;
          setImageUploads(prevUploads => [
            ...prevUploads,
            {id: getRandomIntInclusive(5, 100), uri: imageUri},
          ]);
          // sendBackend
        }
      });
    } else {
      if (idImage !== -1) {
        await ImagePicker.launchImageLibrary(options1, response => {
          if (response.didCancel) {
            setDialog({
              message: bilingual.CREATE_EDIT_DEST.PICKER_CANCELED,
              visible: true,
              type: 'error',
              handleOk: () => setDialog(defaultDialog),
            });
          } else if (response.errorCode) {
            setDialog({
              message: response.errorMessage
                ? response.errorMessage
                : bilingual.CREATE_EDIT_DEST.PICKER_ERROR,
              visible: true,
              type: 'error',
              handleOk: () => setDialog(defaultDialog),
            });
          } else {
            let imageUri = response.assets?.[0]?.uri;
            setImageUploads(prevUploads =>
              prevUploads.map(upload =>
                upload.id === idImage ? {...upload, uri: imageUri} : upload,
              ),
            );
            // sendBackend
          }
        });
      } else {
        await ImagePicker.launchImageLibrary(options2, response => {
          if (response.didCancel) {
            setDialog({
              visible: true,
              type: 'warning',
              message: bilingual.CREATE_EDIT_DEST.PICKER_CANCELED,
              handleOk: () => setDialog(defaultDialog),
            });
          } else if (response.errorCode) {
            setDialog({
              visible: true,
              type: 'error',
              message: response.errorMessage
                ? response.errorMessage
                : bilingual.CREATE_EDIT_DEST.PICKER_ERROR,
              handleOk: () => setDialog(defaultDialog),
            });
          } else {
            response.assets?.map(asset => {
              setImageUploads(prevUploads => [
                ...prevUploads,
                {id: getRandomIntInclusive(5, 20), uri: asset.uri},
              ]);
            });
            // sendBackend
          }
        });
      }
    }
  };

  const handleActionRemove = () => {
    setImageUploads(prevUploads =>
      prevUploads.filter(upload => upload.id !== idImage),
    );
    // setImage('')
  };

  const onHandlerChangeInputString = (
    name: keyof PlaceProps,
    value: string,
  ) => {
    setPlaceUpdate(prevPlace => ({...prevPlace, [name]: value}));
  };

  const onHandleFocusInput = (name: keyof FocusInfoUser, value: boolean) => {
    setOnFoCus(prevOnFocus => ({...prevOnFocus, [name]: value}));
  };

  const handleRequestSubmitEdit = () => {
    // console.log('Edit-Screen(228): ');
    // console.log(JSON.stringify(infoPlaceChange));

    //create
    placeUpdate.latitude = parseFloat(placeUpdate.latitude.toString());
    placeUpdate.longitude = parseFloat(placeUpdate.longitude.toString());

    let invalidMsg = '';
    if (types.length === 0 || typesModal.length === 0) {
      invalidMsg = bilingual.CREATE_EDIT_DEST.ERROR.MT_TYPES;
    } else if (imageUploads.length === 0) {
      invalidMsg = bilingual.CREATE_EDIT_DEST.ERROR.MT_IMAGE;
    }

    if (invalidMsg.length !== 0) {
      setDialog({
        visible: true,
        type: 'error',
        message: invalidMsg,
        handleOk: () => setDialog(defaultDialog),
      });
    } else {
      const formData = new FormData();
      // console.log(imageUploads.length)
      imageUploads.forEach(img => {
        formData.append('files', {
          uri: img.uri,
          type: 'image/jpeg',
          name: `${Date.now()}${randomNumberString()}.jpg`,
        });
      });

      formData.append('nameVi', placeUpdate.nameVi);
      formData.append('nameEn', placeUpdate.nameEn);
      formData.append('descriptionVi', placeUpdate.descriptionVi);
      formData.append('descriptionEn', placeUpdate.descriptionEn);
      formData.append('latitude', placeUpdate.latitude);
      formData.append('longitude', placeUpdate.longitude);
      formData.append('status', placeUpdate.status);
      formData.append(
        'typesString',
        types
          .filter(type => type.isChoose)
          .map(type => type.dest.id)
          .join(','),
      );
      formData.append('createdBy', user?.email);
      formData.append('role', user?.role);
      
      setLoading(true);
      updateDestination(idPlace, formData)
        .then(r => {
          const data: ApiReturnDestination = r.data.data;
          // setPlaceUpdate({
          //   id: data._id,
          //   nameVi: data.nameVi,
          //   nameEn: data.nameEn,
          //   descriptionVi: data.descriptionVi,
          //   descriptionEn: data.descriptionEn,
          //   longitude: data.longitude,
          //   latitude: data.latitude,
          //   vote: data.vote,
          //   images: data.images,
          //   types: data.types,
          //   status: data.status,
          // });

          setTypes(prevTypes =>
            prevTypes.map(prevType => ({
              ...prevType,
              isChoose: data.types.includes(prevType.dest.id),
            })),
          );
          setImageUploads(
            data.images.map((img, index) => ({
              id: index,
              uri: `${BASE_URL_DESTINATION}/${img}`,
            })),
          );
          setDialog({
            visible: true,
            type: 'success',
            message: bilingual.CREATE_EDIT_DEST.SUCCESS.UPDATE_DEST,
            handleOk: () => setDialog(defaultDialog),
          });
          fetchPlace();
        })
        .catch(e => {
          getErrorMessage(e);
          setDialog({
            visible: true,
            type: 'error',
            message: bilingual.CREATE_EDIT_DEST.ERROR.UPDATE_DEST,
            handleOk: () => setDialog(defaultDialog),
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const resubmit = () => {
    setDialog(defaultDialog);
    setLoading(true);
    resubmitDestination({destinationId: idPlace})
      .then(r => {
        setDialog({
          visible: true,
          type: 'success',
          message: bilingual.CREATE_EDIT_DEST.SUCCESS.RESUBMIT,
          handleOk: () => goBack(),
        });
      })
      .catch(e => {
        getErrorMessage(e);
        setDialog({
          visible: true,
          type: 'error',
          message: bilingual.CREATE_EDIT_DEST.ERROR.RESUBMIT,
          handleOk: () => setDialog(defaultDialog),
        });
      }).finally(() => setLoading(false));
  };

  const handleRequestReSubmitEdit = () => {
    setDialog({
      visible: true,
      type: 'warning',
      message: bilingual.CREATE_EDIT_DEST.CF_RESUBMIT,
      handleOk: () => resubmit(),
      handleCancel: () => setDialog(defaultDialog),
    });
  };

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, {backgroundColor: mode.blue1}]}>
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
          handleCancel={dialog.handleCancel}
        />
        <DialogChooseImage
          visible={showTakeImage}
          onDimissAlert={setShowTakeImage}
          onHandlerActionCamera={uploadImage}
          onHandlerActionGallery={uploadImage}
          onHandlerActionRemove={handleActionRemove}
        />

        {/* modal select types */}
        <Modal
          visible={isShowDialogFilter}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowDialogFilter(false)}>
          <View style={[styles.containerModal, {backgroundColor: mode.grey2}]}>
            <View
              style={[
                styles.containerModalDialog,
                {
                  backgroundColor: mode.blue1,
                  borderColor: mode.white,
                  shadowColor: mode.black,
                },
              ]}>
              <Text
                style={[
                  theme.textVariants.textXl,
                  styles.textTitleModal,
                  {color: mode.orange1},
                ]}>
                {bilingual.CREATE_EDIT_DEST.SELECT_TYPES}
              </Text>

              <View style={styles.bodyModal}>
                {typesModal?.map(type => (
                  <TouchableOpacity
                    key={type.dest.id + randomNumberString()}
                    activeOpacity={0.5}
                    style={[
                      styles.filter,
                      {
                        backgroundColor: type.isChoose ? mode.grey : mode.blue1,
                        borderColor: mode.grey,
                      },
                    ]}
                    onPress={() =>
                      setTypesModal(types =>
                        types.map(typeItem =>
                          typeItem.dest.id === type.dest.id
                            ? {...typeItem, isChoose: !typeItem.isChoose}
                            : typeItem,
                        ),
                      )
                    }>
                    <Text
                      style={[
                        theme.textVariants.textBase,
                        styles.text,
                        {color: mode.white},
                      ]}>
                      {type.dest.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.footerModal}>
                <Button01
                  height={60}
                  label="Choose"
                  color={mode.orange}
                  onPress={() => {
                    setShowDialogFilter(false);
                    setTypes(typesModal);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        {/* end modal select types */}

        <ScrollView
          style={{marginBottom: isKeyboardVisible ? 5 : 0}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <ButtonArrowLeft onPress={goBack} />
            <View style={styles.containerTitle}>
              <Text
                style={[
                  theme.textVariants.textLg,
                  styles.headerText,
                  {color: mode.orange},
                ]}>
                {bilingual.CREATE_EDIT_DEST.EDIT_LABEL}
              </Text>
            </View>
          </View>
          <View>
            {/* <Text style={{fontFamily: font.semiBold, marginTop: 20, fontSize: 16, color: theme.colors.orange}}>Status:</Text> */}
            {placeUpdate.status === statusDestinationConstant.ACCEPTED ? (
              <Text style={{color: theme.colors.green2, marginTop: 20, fontSize: 16, fontFamily: font.bold}}>ACCEPTED</Text>
            ) : (
              <></>
            )}
            {placeUpdate.status === statusDestinationConstant.WAITING ? (
              <Text style={{color: theme.colors.yellow, marginTop: 20, fontSize: 16, fontFamily: font.bold}}>WAITING</Text>
            ) : (
              <></>
            )}
            {placeUpdate.status === statusDestinationConstant.REJECTED ? (
              <>
              <Text style={{color: theme.colors.red, marginTop: 20, fontSize: 16, fontFamily: font.bold}}>REJECTED</Text>
              <Text style={{color: theme.colors.red, fontSize: 16}}>Reason: {placeUpdate.reasonReject}</Text>
              </>
            ) : (
              <></>
            )}
          </View>

          <View
            style={[
              styles.viewInputDestination,
              {
                borderWidth: onFocus.nameVi ? 2 : 0,
                borderColor: onFocus.nameVi ? mode.green1 : mode.white,
                backgroundColor: mode.white,
              },
            ]}>
            <Text
              style={[
                theme.textVariants.textBase,
                {
                  color: mode.orange,
                  marginStart: 8,
                  marginTop: 4,
                },
              ]}>
              {bilingual.CREATE_EDIT_DEST.NAME_VI}
            </Text>
            <TextInput
              placeholder="Destination name"
              onFocus={() => onHandleFocusInput('nameVi', true)}
              onBlur={() => onHandleFocusInput('nameVi', false)}
              style={[theme.textVariants.textBase, styles.inputDestination]}
              value={placeUpdate.nameVi}
              onChangeText={value =>
                onHandlerChangeInputString('nameVi', value)
              }
            />
          </View>

          <View
            style={[
              styles.viewInputDestination,
              {
                borderWidth: onFocus.nameEn ? 2 : 0,
                borderColor: onFocus.nameEn ? mode.green1 : mode.white,
                backgroundColor: mode.white,
              },
            ]}>
            <Text
              style={[
                theme.textVariants.textBase,
                {
                  color: mode.orange,
                  marginStart: 8,
                  marginTop: 4,
                },
              ]}>
              {bilingual.CREATE_EDIT_DEST.NAME_EN}
            </Text>
            <TextInput
              placeholder="Destination name"
              onFocus={() => onHandleFocusInput('nameEn', true)}
              onBlur={() => onHandleFocusInput('nameEn', false)}
              style={[theme.textVariants.textBase, styles.inputDestination]}
              value={placeUpdate.nameEn}
              onChangeText={value =>
                onHandlerChangeInputString('nameEn', value)
              }
            />
          </View>

          <View
            style={[
              styles.destinationDescription,
              {
                borderWidth: onFocus.descriptionVi ? 2 : 0,
                borderColor: onFocus.descriptionVi ? mode.green1 : mode.white,
                backgroundColor: mode.white,
              },
            ]}>
            <Text
              style={[
                theme.textVariants.textBase,
                {
                  color: mode.orange,
                  marginStart: 8,
                  marginTop: 4,
                },
              ]}>
              {bilingual.CREATE_EDIT_DEST.DESC_VI}
            </Text>
            <TextInput
              style={[theme.textVariants.textBase, styles.inputDestination]}
              placeholder="Destination content"
              onFocus={() => onHandleFocusInput('descriptionVi', true)}
              onBlur={() => onHandleFocusInput('descriptionVi', false)}
              multiline={true}
              numberOfLines={8}
              value={placeUpdate.descriptionVi}
              onChangeText={value =>
                onHandlerChangeInputString('descriptionVi', value)
              }
            />
          </View>

          <View
            style={[
              styles.destinationDescription,
              {
                borderWidth: onFocus.descriptionEn ? 2 : 0,
                borderColor: onFocus.descriptionEn ? mode.green1 : mode.white,
                backgroundColor: mode.white,
              },
            ]}>
            <Text
              style={[
                theme.textVariants.textBase,
                {
                  color: mode.orange,
                  marginStart: 8,
                  marginTop: 4,
                },
              ]}>
              {bilingual.CREATE_EDIT_DEST.DESC_EN}
            </Text>
            <TextInput
              style={[theme.textVariants.textBase, styles.inputDestination]}
              placeholder="Destination content"
              onFocus={() => onHandleFocusInput('descriptionEn', true)}
              onBlur={() => onHandleFocusInput('descriptionEn', false)}
              multiline={true}
              numberOfLines={8}
              value={placeUpdate.descriptionEn}
              onChangeText={value =>
                onHandlerChangeInputString('descriptionEn', value)
              }
            />
          </View>

          <View
            style={[
              styles.viewInputDestination,
              {
                borderWidth: onFocus.latitude ? 2 : 0,
                borderColor: onFocus.latitude ? mode.green1 : mode.white,
                backgroundColor: mode.white,
              },
            ]}>
            <Text
              style={[
                theme.textVariants.textBase,
                {
                  color: mode.orange,
                  marginStart: 8,
                  marginTop: 4,
                },
              ]}>
              {bilingual.CREATE_EDIT_DEST.LAT}
            </Text>
            <TextInput
              placeholder="Latitude"
              onFocus={() => onHandleFocusInput('latitude', true)}
              onBlur={() => onHandleFocusInput('latitude', false)}
              style={[theme.textVariants.textBase, styles.inputDestination]}
              value={'' + placeUpdate.latitude}
              onChangeText={value =>
                onHandlerChangeInputString('latitude', value)
              }
            />
          </View>

          <View
            style={[
              styles.viewInputDestination,
              {
                borderWidth: onFocus.longitude ? 2 : 0,
                borderColor: onFocus.longitude ? mode.green1 : mode.white,
                backgroundColor: mode.white,
              },
            ]}>
            <Text
              style={[
                theme.textVariants.textBase,
                {
                  color: mode.orange,
                  marginStart: 8,
                  marginTop: 4,
                },
              ]}>
              {bilingual.CREATE_EDIT_DEST.LON}
            </Text>
            <TextInput
              placeholder="Longitude"
              onFocus={() => onHandleFocusInput('longitude', true)}
              onBlur={() => onHandleFocusInput('longitude', false)}
              style={[theme.textVariants.textBase, styles.inputDestination]}
              value={'' + placeUpdate.longitude}
              onChangeText={value =>
                onHandlerChangeInputString('longitude', value)
              }
            />
          </View>

          <View style={styles.containerFilter}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.filter,
                {
                  backgroundColor: mode.orange,
                  marginStart: 0,
                  borderWidth: 0,
                  borderColor: mode.grey,
                },
              ]}
              onPress={() => {
                setTypesModal(types);
                setShowDialogFilter(true);
              }}>
              <Text
                style={[
                  theme.textVariants.textBase,
                  styles.text,
                  {color: mode.white},
                ]}>
                {bilingual.CREATE_EDIT_DEST.CHOOSE_TYPES}
              </Text>
            </TouchableOpacity>
            {types?.map(type =>
              type.isChoose ? (
                <View
                  key={type.dest.id + randomNumberString()}
                  style={[styles.filter, {borderColor: mode.grey}]}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.iconRemove}
                    onPress={() => {
                      setTypes(prevType =>
                        prevType?.map(typeSelected =>
                          typeSelected.dest.id === type.dest.id
                            ? {...type, isChoose: !type.isChoose}
                            : typeSelected,
                        ),
                      );
                    }}>
                    <Icons name="cancel" />
                  </TouchableOpacity>
                  <Text
                    style={[
                      theme.textVariants.textBase,
                      styles.text,
                      {color: mode.white},
                    ]}>
                    {type.dest.label}
                  </Text>
                </View>
              ) : null,
            )}
          </View>

          <View
            style={[
              styles.containerFooter,
              {flexWrap: 'wrap', rowGap: 10, columnGap: 30},
            ]}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.btnAdd, {backgroundColor: mode.white}]}
              onPress={() => {
                setIdImage(-1);
                setShowTakeImage(true);
              }}>
              <Icons name="add" />
            </TouchableOpacity>
            {imageUploads.length > 0
              ? imageUploads?.map((imageUpload, index) => (
                  <View key={index} style={{width: 100, height: 100}}>
                    <ImageUpload
                      image={imageUpload.uri}
                      onHandleShowTakeImage={() => {
                        setIdImage(imageUpload.id);
                        setShowTakeImage(true);
                      }}
                    />
                  </View>
                ))
              : null}
          </View>

          <View style={styles.containerButtonEdit}>
            <BorderButton
              height={60}
              label={bilingual.CREATE_EDIT_DEST.UPDATE_LABEL}
              nameIcon="edit"
              onPress={handleRequestSubmitEdit}
            />
          </View>

          {placeUpdate.status === statusDestinationConstant.REJECTED ? (
            <View style={[styles.containerButtonEdit, {marginTop: 8}]}>
              <BorderButton
                height={60}
                label={bilingual.CREATE_EDIT_DEST.RESUBMIT}
                nameIcon="send"
                onPress={handleRequestReSubmitEdit}
              />
            </View>
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

export default EditPlaceScreen;
