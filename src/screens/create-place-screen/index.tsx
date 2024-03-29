import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import Icons from '@/components/shared/icon';
import styles from './createScreen.style';
import theme from '@/utils/theme';
import { AppScreenNavigationType } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';
import ImageUpload from '@/components/imageUpload/ImageUpload';
import DialogChooseImage from '@/components/customAler/dialogChooseImage/DialogChooseImage';
import * as ImagePicker from 'react-native-image-picker';
import Button01 from '@/components/button/button01/Button01';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import { labelVi, labelEn } from '@/utils/label';
import {
  createDestination,
  getDestinationById,
  getDestinationTypes,
} from '@/services/destination-service';
import {
  defaultDialog,
  getErrorMessage,
  getRandomIntInclusive,
  randomNumberString,
} from '@/utils';
import Dialog from '@/components/dialog-handle-event';
import Spinner from 'react-native-loading-spinner-overlay';
import { languageConstant, themeConstant } from '@/API/src/utils/constant';
import { DarkMode, LightMode } from '@/utils/mode';
import BorderButton from '@/components/button/borderButton/BorderButton';
import CreateNotification from '../../../CreateNotification';

type ApiReturnType = {
  _id: string;
  labelVi: string;
  labelEn: string;
};

const CreatePlaceScreen = () => {
  const { user } = useUserGlobalStore();
  const bilingual = user?.language === languageConstant.VI ? labelVi : labelEn;
  const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;
  const [loading, setLoading] = useState<boolean>(true);
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);

  const navigation = useNavigation<AppScreenNavigationType<'Root'>>();
  const navigateToCreatedPlacesScreen = () => {
    navigation.navigate('CreatedPlaces');
  };

  const [newPlace, setNewPlace] = useState<PlaceProps>({
    nameVi: '',
    nameEn: '',
    descriptionVi: '',
    descriptionEn: '',
    longitude: 0,
    latitude: 0,
    types: [],
    images: [],
    vote: 0,
  });

  const [types, setTypes] = useState<TypesFilterProps[]>([]);
  const [typesModal, setTypesModal] = useState<TypesFilterProps[]>([]); //render afterward

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [showTakeImage, setShowTakeImage] = useState(false);
  const [idImage, setIdImage] = useState(-1);
  const [isShowDialogFilter, setShowDialogFilter] = useState(false);
  const [onFocus, setOnFoCus] = useState<FocusInfoUser>({
    nameVi: false,
    nameEn: false,
    descriptionVi: false,
    descriptionEn: false,
    latitude: false,
    longitude: false,
  });

  const [imageUploads, setImageUploads] = useState<UploadImages[]>([]);

  //dataAPI
  const fetchDestTypes = () => {
    getDestinationTypes()
      .then(r => {
        const dataChosen: TypesFilterProps[] = r.data.data.map(
          (d: ApiReturnType) => ({
            dest: {
              id: d._id,
              label: user?.language === 'VI' ? d.labelVi : d.labelEn,
            },
            isChoose: false,
          }),
        );
        setTypes(dataChosen);
      })
      .catch(e => {
        getErrorMessage(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchDestTypes();
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

  const uploadImage = async ({ type, options1, options2 }: any) => {
    if (type === 'capture') {
      await ImagePicker.launchCamera(options1, response => {
        if (response.didCancel) {
          setDialog({
            type: 'warning',
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
            { id: getRandomIntInclusive(5, 100), uri: imageUri },
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
              type: 'warning',
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
                upload.id === idImage ? { ...upload, uri: imageUri } : upload,
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
                { id: getRandomIntInclusive(5, 20), uri: asset.uri },
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
  };

  const onHandlerChangeInputString = (
    name: keyof PlaceProps,
    value: string,
  ) => {
    setNewPlace(prevPlace => ({ ...prevPlace, [name]: value }));
  };

  const onHandleFocusInput = (name: keyof FocusInfoUser, value: boolean) => {
    setOnFoCus(prevOnFocus => ({ ...prevOnFocus, [name]: value }));
  };

  const handleRequestSubmitCreate = () => {
    // const infoPlaceChange: PlaceProps = {
    //   nameVi: newPlace.nameVi,
    //   nameEn: newPlace.nameEn,
    //   descriptionVi: newPlace.descriptionVi,
    //   descriptionEn: newPlace.descriptionEn,
    //   latitude: newPlace.latitude,
    //   longitude: newPlace.longitude,
    //   images: imageUploads.map(imageUploadsItem => imageUploadsItem.uri),
    //   createdBy: user?.id,
    //   role: user?.role,
    //   typesString: types
    //     ?.filter(type => type.isChoose)
    //     .map(type => type.dest.id)
    //     .join(','),
    //   vote: 0,
    //   types: [],
    // };

    // console.log('Create-Screen(228): ');
    // console.log(JSON.stringify(infoPlaceChange));

    //create
    let invalidMsg = '';
    newPlace.latitude = parseFloat(newPlace.latitude.toString());
    newPlace.longitude = parseFloat(newPlace.longitude.toString());
    // console.log(typeof newPlace.latitude);
    // console.log(types);
    // console.log(typesModal);

    if (!newPlace.nameVi) {
      invalidMsg = bilingual.CREATE_EDIT_DEST.ERROR.MT_DEST_NAME_VI;
    } else if (!newPlace.nameEn) {
      invalidMsg = bilingual.CREATE_EDIT_DEST.ERROR.MT_DEST_NAME_EN;
    } else if (!newPlace.descriptionVi) {
      invalidMsg = bilingual.CREATE_EDIT_DEST.ERROR.MT_DEST_DESC_VI;
    } else if (!newPlace.descriptionEn) {
      invalidMsg = bilingual.CREATE_EDIT_DEST.ERROR.MT_DEST_DESC_EN;
    } else if (!newPlace.latitude) {
      invalidMsg = bilingual.CREATE_EDIT_DEST.ERROR.MT_LAT;
    } else if (typeof newPlace.latitude !== 'number') {
      invalidMsg = bilingual.CREATE_EDIT_DEST.ERROR.LAT_NUMBER;
    } else if (!newPlace.longitude) {
      invalidMsg = bilingual.CREATE_EDIT_DEST.ERROR.MT_LON;
    } else if (typeof newPlace.longitude !== 'number') {
      invalidMsg = bilingual.CREATE_EDIT_DEST.ERROR.LON_NUMBER;
    } else if (types.length === 0 || typesModal.length === 0) {
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
      imageUploads.forEach(img => {
        formData.append('files', {
          uri: img.uri,
          type: 'image/jpeg',
          name: `${Date.now()}${randomNumberString()}.jpg`,
        });
      });

      formData.append('nameVi', newPlace.nameVi);
      formData.append('nameEn', newPlace.nameEn);
      formData.append('descriptionVi', newPlace.descriptionVi);
      formData.append('descriptionEn', newPlace.descriptionEn);
      formData.append('latitude', newPlace.latitude);
      formData.append('longitude', newPlace.longitude);
      formData.append(
        'typesString',
        types
          .filter(type => type.isChoose)
          .map(type => type.dest.id)
          .join(','),
      );
      formData.append('createdBy', user?.id);
      formData.append('role', user?.role);

      setLoading(true);

      // Notification
      createDestination(formData)
        .then(r => {
          console.log("Create-place(332): " + JSON.stringify(r.data.data._id))
          setNewPlace({
            nameVi: '',
            nameEn: '',
            descriptionVi: '',
            descriptionEn: '',
            longitude: 0,
            latitude: 0,
            images: [],
            types: [],
            vote: 0,
          });
          setImageUploads([]);
          setDialog({
            visible: true,
            type: 'success',
            message: bilingual.CREATE_EDIT_DEST.SUCCESS.CREATE_DEST,
            handleOk: () => setDialog(defaultDialog),
          });

          getDestinationById(r.data.data._id)
          .then((r) => {
            // Notification
            CreateNotification(
              r.data.data._id,
              1,
              "APPROVE PLACES",
              `Tourist destination ${r.data.data.nameEn} just created by user. Awaiting approval.`,
              r.data.data.images[0]
            )

          })
        })
        .catch(e => {
          setDialog({
            visible: true,
            type: 'error',
            message: bilingual.CREATE_EDIT_DEST.ERROR.CREATE_DEST,
            handleOk: () => setDialog(defaultDialog),
          });
        })
        .finally(() => {
          setLoading(false);
          fetchDestTypes();
        });
    }
  };

  const handleActionResetCreate = () => {
    //reset
    setNewPlace({
      nameVi: '',
      nameEn: '',
      descriptionVi: '',
      descriptionEn: '',
      longitude: 0,
      latitude: 0,
      images: [],
      types: [],
      vote: 0,
    });
    setImageUploads([]);    
  };

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: mode.blue1 }]}>
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

        <DialogChooseImage
          visible={showTakeImage}
          onDimissAlert={setShowTakeImage}
          onHandlerActionCamera={uploadImage}
          onHandlerActionGallery={uploadImage}
          onHandlerActionRemove={handleActionRemove}
        />

        {/* Modal dest types */}
        <Modal
          visible={isShowDialogFilter}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowDialogFilter(false)}>
          <View
            style={[
              styles.containerModal,
              { backgroundColor: mode.grey2 },
            ]}>
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
                  { color: mode.orange1 },
                ]}>
                {bilingual.CREATE_EDIT_DEST.SELECT_TYPES}
              </Text>

              <View style={styles.bodyModal}>
                {typesModal.map(type => (
                  <TouchableOpacity
                    key={type.dest.id}
                    activeOpacity={0.5}
                    style={[
                      styles.filter,
                      {
                        backgroundColor: type.isChoose
                          ? mode.grey
                          : mode.blue1,
                        borderColor: mode.grey,
                      },
                    ]}
                    onPress={() =>
                      setTypesModal(types =>
                        types?.map(typeItem =>
                          typeItem.dest.id === type.dest.id
                            ? { ...typeItem, isChoose: !typeItem.isChoose }
                            : typeItem,
                        ),
                      )
                    }>
                    <Text
                      style={[
                        theme.textVariants.textBase,
                        styles.text,
                        { color: mode.white },
                      ]}>
                      {type.dest.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.footerModal}>
                <Button01
                  height={60}
                  label={bilingual.CREATE_EDIT_DEST.CHOOSE}
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
        {/* End modal dest types */}

        <ScrollView
          style={{ marginBottom: isKeyboardVisible ? 5 : 135 }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.headerItem}
              onPress={handleRequestSubmitCreate}>
              <Icons name={'createDestination'} color={mode.orange} />
              <Text style={[styles.headerText, { color: mode.orange }]}>
                {bilingual.CREATE_EDIT_DEST.CREATE}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerItem}
              onPress={navigateToCreatedPlacesScreen}
              activeOpacity={0.85}>
              <Icons name="list" color={mode.orange} />
              <Text style={[styles.headerText, { color: mode.orange }]}>
                {bilingual.CREATE_EDIT_DEST.LIST}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.viewInputDestination,
              {
                backgroundColor: mode.white,
                borderWidth: onFocus.nameVi ? 2 : 0,
                borderColor: onFocus.nameVi
                  ? mode.green1
                  : mode.white,
              },
            ]}>
            <Text
              style={[
                theme.textVariants.textBase,
                {
                  color: mode.orange,
                  marginStart: 8,
                  marginTop: 4,
                  paddingHorizontal: 4,
                },
              ]}>
              {bilingual.CREATE_EDIT_DEST.NAME_VI}
            </Text>
            <TextInput
              keyboardType="default"
              placeholder={bilingual.CREATE_EDIT_DEST.NAME_VI}
              onFocus={() => onHandleFocusInput('nameVi', true)}
              onBlur={() => onHandleFocusInput('nameVi', false)}
              style={[theme.textVariants.textBase, styles.inputDestination]}
              value={newPlace.nameVi}
              onChangeText={value =>
                onHandlerChangeInputString('nameVi', value)
              }
            />
          </View>

          <View
            style={[
              styles.viewInputDestination,
              {
                backgroundColor: mode.white,
                borderWidth: onFocus.nameEn ? 2 : 0,
                borderColor: onFocus.nameEn
                  ? mode.green1
                  : mode.white,
              },
            ]}>
            <Text
              style={[
                theme.textVariants.textBase,
                {
                  color: mode.orange,
                  marginStart: 8,
                  marginTop: 4,
                  paddingHorizontal: 4,
                },
              ]}>
              {bilingual.CREATE_EDIT_DEST.NAME_EN}
            </Text>
            <TextInput
              keyboardType="default"
              placeholder={bilingual.CREATE_EDIT_DEST.NAME_EN}
              onFocus={() => onHandleFocusInput('nameEn', true)}
              onBlur={() => onHandleFocusInput('nameEn', false)}
              style={[theme.textVariants.textBase, styles.inputDestination]}
              value={newPlace.nameEn}
              onChangeText={value =>
                onHandlerChangeInputString('nameEn', value)
              }
            />
          </View>

          <View
            style={[
              styles.destinationDescription,
              {
                backgroundColor: mode.white,
                borderWidth: onFocus.descriptionVi ? 2 : 0,
                borderColor: onFocus.descriptionVi
                  ? mode.green1
                  : mode.white,
              },
            ]}>
            <Text
              style={[
                theme.textVariants.textBase,
                {
                  color: mode.orange,
                  marginStart: 8,
                  marginTop: 4,
                  paddingHorizontal: 4,
                },
              ]}>
              {bilingual.CREATE_EDIT_DEST.DESC_VI}
            </Text>
            <TextInput
              keyboardType="default"
              style={[theme.textVariants.textBase, styles.inputDestination]}
              placeholder={bilingual.CREATE_EDIT_DEST.DESC_VI}
              onFocus={() => onHandleFocusInput('descriptionVi', true)}
              onBlur={() => onHandleFocusInput('descriptionVi', false)}
              multiline={true}
              numberOfLines={8}
              value={newPlace.descriptionVi}
              onChangeText={value =>
                onHandlerChangeInputString('descriptionVi', value)
              }
            />
          </View>

          <View
            style={[
              styles.destinationDescription,
              {
                backgroundColor: mode.white,
                borderWidth: onFocus.descriptionEn ? 2 : 0,
                borderColor: onFocus.descriptionEn
                  ? mode.green1
                  : mode.white,
              },
            ]}>
            <Text
              style={[
                theme.textVariants.textBase,
                {
                  color: mode.orange,
                  marginStart: 8,
                  marginTop: 4,
                  paddingHorizontal: 4,
                },
              ]}>
              {bilingual.CREATE_EDIT_DEST.DESC_EN}
            </Text>
            <TextInput
              keyboardType="default"
              style={[theme.textVariants.textBase, styles.inputDestination]}
              placeholder={bilingual.CREATE_EDIT_DEST.DESC_EN}
              onFocus={() => onHandleFocusInput('descriptionEn', true)}
              onBlur={() => onHandleFocusInput('descriptionEn', false)}
              multiline={true}
              numberOfLines={8}
              value={newPlace.descriptionEn}
              onChangeText={value =>
                onHandlerChangeInputString('descriptionEn', value)
              }
            />
          </View>

          <View
            style={[
              styles.viewInputDestination,
              {
                backgroundColor: mode.white,
                borderWidth: onFocus.latitude ? 2 : 0,
                borderColor: onFocus.latitude
                  ? mode.green1
                  : mode.white,
              },
            ]}>
            <Text
              style={[
                theme.textVariants.textBase,
                {
                  color: mode.orange,
                  marginStart: 8,
                  marginTop: 4,
                  paddingHorizontal: 4,
                },
              ]}>
              {bilingual.CREATE_EDIT_DEST.LAT}
            </Text>
            <TextInput
              keyboardType="default"
              placeholder={bilingual.CREATE_EDIT_DEST.LAT}
              onFocus={() => onHandleFocusInput('latitude', true)}
              onBlur={() => onHandleFocusInput('latitude', false)}
              style={[theme.textVariants.textBase, styles.inputDestination]}
              value={
                newPlace.latitude === 0 ? '' : newPlace.latitude.toString()
              }
              onChangeText={value =>
                onHandlerChangeInputString('latitude', value)
              }
            />
          </View>

          <View
            style={[
              styles.viewInputDestination,
              {
                backgroundColor: mode.white,
                borderWidth: onFocus.longitude ? 2 : 0,
                borderColor: onFocus.longitude
                  ? mode.green1
                  : mode.white,
              },
            ]}>
            <Text
              style={[
                theme.textVariants.textBase,
                {
                  color: mode.orange,
                  marginStart: 8,
                  marginTop: 4,
                  paddingHorizontal: 4,
                },
              ]}>
              {bilingual.CREATE_EDIT_DEST.LON}
            </Text>
            <TextInput
              keyboardType="default"
              placeholder={bilingual.CREATE_EDIT_DEST.LON}
              onFocus={() => onHandleFocusInput('longitude', true)}
              onBlur={() => onHandleFocusInput('longitude', false)}
              style={[theme.textVariants.textBase, styles.inputDestination]}
              value={
                newPlace.longitude === 0 ? '' : newPlace.longitude.toString()
              }
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
                setShowDialogFilter(true);
                // setTypeChosen(typesChosenRef);
                setTypesModal(types);
              }}>
              <Text
                style={[
                  theme.textVariants.textBase,
                  styles.text,
                  { color: mode.white },
                ]}>
                {bilingual.CREATE_EDIT_DEST.CHOOSE_TYPES}
              </Text>
            </TouchableOpacity>
            {types.map(type =>
              type.isChoose ? (
                <View
                  key={type.dest.id}
                  style={[styles.filter, { borderColor: mode.grey }]}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.iconRemove}
                    onPress={() => {
                      setTypes(prevType =>
                        prevType?.map(typeItem =>
                          typeItem.dest.id === type.dest.id
                            ? { ...type, isChoose: !type.isChoose }
                            : typeItem,
                        ),
                      );
                    }}>
                    <Icons name="cancel" />
                  </TouchableOpacity>
                  <Text
                    style={[
                      theme.textVariants.textBase,
                      styles.text,
                      { color: mode.white },
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
              { flexWrap: 'wrap', rowGap: 10, columnGap: 30 },
            ]}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.btnAdd, { backgroundColor: mode.white }]}
              onPress={() => {
                setIdImage(-1);
                setShowTakeImage(true);
              }}>
              <Icons name="add" />
            </TouchableOpacity>
            {imageUploads.length > 0
              ? imageUploads?.map((imageUpload, index) => (
                <View key={index} style={{ width: 100, height: 100 }}>
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
            <View style={{ flex: 1 }}>
              <BorderButton
                height={60}
                label={bilingual.CREATE_EDIT_DEST.CREATE_LABEL}
                nameIcon="createDestination"
                onPress={handleRequestSubmitCreate}
              />
            </View>

            <View style={{ flex: 1 }}>
              <BorderButton
                height={60}
                label={bilingual.CREATE_EDIT_DEST.RESSET_LABEL}
                nameIcon="cancel"
                onPress={handleActionResetCreate}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

export default CreatePlaceScreen;
