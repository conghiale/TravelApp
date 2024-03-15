import theme, {Box, Text} from '@/utils/theme';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './personal.style';
import Icons from '@/components/shared/icon';
import GroupSettings from '@/components/group_settings';
import {useNavigation} from '@react-navigation/native';
import {AppScreenNavigationType} from '@/navigation/types';
import BorderButton from '@/components/button/borderButton/BorderButton';
import LabelScreen from '@/components/labelScreen/LabelScreen';
import * as ImagePicker from 'react-native-image-picker';
// import * as ImagePicker from 'react-native-image-crop-picker';
import DialogChooseImage from '@/components/customAler/dialogChooseImage/DialogChooseImage';
import axiosInstance, {BASE_URL_AVATAR} from '@/services/config';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import CustomInputInfoUser from '@/components/input/customInputInfoUser/CustomInputInfoUser';
import Button01 from '@/components/button/button01/Button01';
// import {DestTypes} from '@/assets/data';
import {labelEn, labelVi} from '@/utils/label';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from '@/components/dialog-handle-event';
import {getDestinationTypes} from '@/services/destination-service';
import {getErrorMessage} from '@/utils';
import {getUserById, updateUserById} from '@/services/user-service';
import {roleConstant} from '@/API/src/utils/constant';

const PersonalScreen = () => {
  const {user, updateUser} = useUserGlobalStore();
  const bilingual = user?.language === 'EN' ? labelEn : labelVi;
  const [loading, setLoading] = useState<boolean>(false);
  const defaultDialog: DialogHandleEvent = {
    visible: false,
    type: 'success',
    message: '',
    handleOk: () => {},
  };
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);

  const IMAGE = '../../assets/images/avatarDefault.jpg';
  const [person, setPerson] = useState<Person>({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    avatar: '',
    hobby: [],
  });
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showTakeImage, setShowTakeImage] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [image, setImage] = useState<any>('');
  const [types, setTypes] = useState<TypesFilterProps[]>([]);
  const [typesModal, setTypesModal] = useState<TypesFilterProps[]>([]);

  const [isShowDialogFilter, setShowDialogFilter] = useState(false);
  const navigation = useNavigation<AppScreenNavigationType<'Root'>>();
  const [infoChanged, setInfoChanged] = useState(false);

  //call API
  useEffect(() => {
    if (user && user.id)
      getUserById(user.id)
        .then(ru => {
          const data: ApiReturnPerson = ru.data.data;
          console.log('data:', data);
          setPerson({
            id: data._id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            avatar: data.avatar,
            hobby: data.hobby,
          });
          getDestinationTypes()
            .then(r => {
              const dataCustom: TypesFilterProps[] = r.data.data.map(
                (dtype: ApiReturnDestType) => ({
                  dest: {
                    id: dtype._id,
                    label:
                      user?.language === 'VI' ? dtype.labelVi : dtype.labelEn,
                  },
                  isChoose: ru.data.data.hobby.includes(dtype._id),
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
                handleOk: () => setDialog(defaultDialog),
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
            handleOk: () => setDialog(defaultDialog),
          });
        });
  }, [user]);

  const handleToggle = (key: keyof IAuthenticatedUser) => {
    switch (key) {
      case 'language':
        updateUser({
          ...user,
          language: user?.language === 'VI' ? 'EN' : 'VI',
        });
        break;
      case 'theme':
        updateUser({
          ...user,
          theme: user?.theme === 'Dark' ? 'Light' : 'Dark',
        });
    }
  };

  const handleChangeValue = (name: keyof Person, value: string) => {
    setPerson({
      ...person,
      [name]: value,
    });
  };

  const navigateToChangePasswordScreen = () => {
    navigation.navigate('ChangePassword');
  };

  const navigateToUserListScreen = () => {
    navigation.navigate('ViewUsers');
  };

  const navigateToApprovePlacesScreen = () => {
    navigation.navigate('ApprovePlaces');
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

  // passing types to person.hobby
  // useEffect(() => {
  //   const personUpdate = {...person};
  //   types.forEach(type => {
  //     if (type.isChoose && !personUpdate.hobby.includes(type.dest.id)) {
  //       personUpdate.hobby.push(type.dest.id);
  //     } else if (!type.isChoose && personUpdate.hobby.includes(type.dest.id)) {
  //       const index = personUpdate.hobby.indexOf(type.dest.id);
  //       if (index !== -1) {
  //         personUpdate.hobby.splice(index, 1);
  //       }
  //     }
  //   });
  //   setPerson(personUpdate);
  // }, [types]);

  // checkChangeInfoUser
  useEffect(() => {
    const flag =
      hobbyChanged() ||
      person.firstName !== user?.firstName ||
      person.lastName !== user?.lastName;

    setInfoChanged(flag);
  }, [person, types]);

  const uploadImage = async ({type, options}: any) => {
    if (type === 'capture') {
      // ImagePicker.openCamera({
      //   width: 160,
      //   height: 160,
      //   cropperCircleOverlay: true,
      //   cropping: true,
      // })
      //   .then(image => {
      //     setImage(image.path);
      //     // send Backend
      //     console.log(image);
      //     const formData = new FormData();
      //     formData.append('file', {
      //       uri: image.path,
      //       type: 'image/jpeg',
      //       name: Date.now().toString(),
      //     });
      //   })
      //   .catch(error => {
      //     setDialogNotification({displayMsg: error.message, isShow: true});
      //   });

      await ImagePicker.launchCamera(options, async response => {
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
          setImage(imageUri);
        }
      });
    } else {
      /*ImagePicker.openPicker({
                width: 200,
                height: 200,
                cropperCircleOverlay: true,
                cropping: true
            }).then(image => {
                setImage(image.path)
                // send Backend
            }).catch((error) => {
                setDialogNotification({ displayMsg: error.message, isShow: true });
            });*/

      await ImagePicker.launchImageLibrary(options, response => {
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
          setImage(imageUri);
          // sendBackend
        }
      });
    }
  };

  const handleActionRemove = () => {
    setImage('');
  };

  const logOut = () => {
    updateUser(null);
  };

  // compare hobby
  const hobbyChanged = () => {
    const selected = types.filter(t => t.isChoose);
    if (!person.hobby || selected.length !== person.hobby.length) {
      return true;
    }
    for (let i = 0; i < selected.length; ++i) {
      if (!person.hobby.includes(selected[i].dest.id)) {
        return true;
      }
    }
    return false;
  };

  // so sánh avatar
  const compareImages = () => {
    // so sanh avatar co thay doi hay khong
  };

  const handleActionSave = () => {
    const infoUserChange: Person = {
      id: person.id,
      hobby: person.hobby,
      email: person.email,
      firstName: person.firstName,
      lastName: person.lastName,
      avatar: person.avatar,
    };

    // console.log('Personal-Screen(274): ');
    // console.log(JSON.stringify(infoUserChange));

    if (person.hobby.length === 0) {
      setDialog({
        visible: true,
        type: 'error',
        message: bilingual.CREATE_EDIT_DEST.ERROR.MT_TYPES,
        handleOk: () => setDialog(defaultDialog),
      });
    }

    setLoading(true);
    updateUserById(person.id, {
      firstName: person.firstName,
      lastName: person.lastName,
      typesString: person.hobby.join(','),
    })
      .then(r => {
        const d: ApiReturnPerson = r.data.data;
        setPerson({
          id: d._id,
          email: d.email,
          firstName: d.firstName,
          lastName: d.lastName,
          avatar: d.avatar,
          hobby: d.hobby,
        });
        updateUser({
          ...user,
          firstName: d.firstName,
          lastName: d.lastName,
          hobby: d.hobby,
        });
        setDialog({
          visible: true,
          type: 'success',
          message: bilingual.PERSONAL.SUCCESS.UPDATE_PROFILE,
          handleOk: () => setDialog(defaultDialog),
        });
      })
      .catch(e => {
        setDialog({
          visible: true,
          message: getErrorMessage(e),
          type: 'error',
          handleOk: () => setDialog(defaultDialog),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <DialogChooseImage
        visible={showTakeImage}
        onDimissAlert={setShowTakeImage}
        onHandlerActionCamera={uploadImage}
        onHandlerActionGallery={uploadImage}
        onHandlerActionRemove={handleActionRemove}
      />
      <Spinner
        size={'large'}
        visible={loading}
        color={theme.colors.orange1}
        animation={'fade'}
      />
      <Dialog
        isVisible={dialog.visible}
        message={dialog.message}
        type={dialog.type}
        handleOk={dialog.handleOk}
        handleCancel={dialog.handleCancel}
      />

      {/* modal pick types */}
      <Modal
        visible={isShowDialogFilter}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowDialogFilter(false)}>
        <View style={styles.containerModal}>
          <View style={styles.containerModalDialog}>
            <Text style={[theme.textVariants.textXl, styles.textTitleModal]}>
              {bilingual.PERSONAL.FILTER_LABEL}
            </Text>

            <View style={styles.bodyModal}>
              {typesModal?.map(type => (
                <TouchableOpacity
                  key={type.dest.id}
                  activeOpacity={0.5}
                  style={[
                    styles.UpdateTypes,
                    {
                      backgroundColor: type.isChoose
                        ? theme.colors.grey
                        : theme.colors.blue1,
                    },
                  ]}
                  onPress={() =>
                    setTypesModal(types =>
                      types?.map(typeItem =>
                        typeItem.dest.id === type.dest.id
                          ? {...typeItem, isChoose: !typeItem.isChoose}
                          : typeItem,
                      ),
                    )
                  }>
                  <Text style={[theme.textVariants.textBase, styles.text]}>
                    {type.dest.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.footerModal}>
              <Button01
                height={60}
                label={bilingual.PERSONAL.FILTER_CHOOSE}
                color={theme.colors.orange}
                onPress={() => {
                  setShowDialogFilter(false);
                  setTypes(typesModal);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* end modal pick types */}

      <ScrollView
        style={{marginBottom: isKeyboardVisible ? 5 : 135}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[theme.textVariants.textXl, styles.text]}>{}</Text>
          <View style={styles.containerAvatar}>
            <Image
              source={
                user?.avatar
                  ? {uri: `${BASE_URL_AVATAR}/${user.avatar}`}
                  : require(IMAGE)
              }
              style={styles.imageAvatar}
            />
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowTakeImage(true)}>
              <View style={styles.containerCamera}>
                <Icons name="camera" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.containerHobby}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[
                theme.textVariants.textBase,
                styles.text,
                {textAlign: 'center'},
              ]}>
              {person.email}
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.information}>
            <View style={styles.heading}>
              <LabelScreen nameIcon="personal" title="Information" />
            </View>
            <CustomInputInfoUser
              label={bilingual.PERSONAL.FIRST_NAME}
              nameIcon="edit"
              value={person.firstName}
              name="firstName"
              handleChangeValue={handleChangeValue}
            />
            <CustomInputInfoUser
              label={bilingual.PERSONAL.LAST_NAME}
              nameIcon="edit"
              value={person.lastName}
              name="lastName"
              handleChangeValue={handleChangeValue}
            />
            <View style={styles.containerUpdateTypes}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.UpdateTypes,
                  {
                    backgroundColor: theme.colors.orange,
                    marginStart: 0,
                    borderWidth: 0,
                  },
                ]}
                onPress={() => {
                  setTypesModal(types);
                  setShowDialogFilter(true);
                }}>
                <Text style={[theme.textVariants.textBase, styles.text]}>
                  {bilingual.PERSONAL.SET_HOBBY}
                </Text>
              </TouchableOpacity>
              {types?.map(type =>
                type.isChoose ? (
                  <View key={type.dest.id} style={styles.UpdateTypes}>
                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={styles.iconAdd}
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
                    <Text style={[theme.textVariants.textBase, styles.text]}>
                      {type.dest.label}
                    </Text>
                  </View>
                ) : null,
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 16,
              }}
              pointerEvents={infoChanged ? 'auto' : 'none'}>
              <Button01
                height={60}
                label={bilingual.PERSONAL.SAVE}
                color={infoChanged ? theme.colors.orange : theme.colors.grey}
                onPress={() => handleActionSave()}
              />
            </View>

            <TouchableOpacity
              style={styles.changePassword}
              onPress={navigateToChangePasswordScreen}>
              <Text style={[theme.textVariants.textLg, styles.text]}>
                {bilingual.PERSONAL.CHANGE_PASSWORD}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.settings, {marginBottom: 20}]}>
            <View style={styles.heading}>
              <LabelScreen
                nameIcon="setting"
                title={bilingual.PERSONAL.SETTING}
              />
            </View>

            {/* false là EN -> true là VI */}
            <GroupSettings
              label={bilingual.PERSONAL.LANGUAGUE}
              isEnabled={user?.language === 'EN'}
              activeText="EN"
              inActiveText="VI"
              toggleSwitch={() => handleToggle('language')}
            />

            {/* false là Light -> true là Dark */}
            <GroupSettings
              label={bilingual.PERSONAL.THEME}
              isEnabled={user?.theme === 'Light'}
              activeText="LT"
              inActiveText="DK"
              toggleSwitch={() => handleToggle('theme')}
            />
          </View>

          {user?.role === roleConstant.ADMIN ? (
            <View style={styles.advanced}>
              <View style={styles.heading}>
                <LabelScreen
                  nameIcon="advanced"
                  title={bilingual.PERSONAL.ADVANCED}
                />
              </View>
              <BorderButton
                height={60}
                label={bilingual.PERSONAL.USERS}
                nameIcon="userList"
                onPress={navigateToUserListScreen}
              />

              <BorderButton
                height={60}
                label={bilingual.PERSONAL.APPROVAL}
                nameIcon="advanced"
                onPress={navigateToApprovePlacesScreen}
              />
            </View>
          ) : (
            <></>
          )}

          <BorderButton
            height={60}
            label={bilingual.PERSONAL.LOG_OUT}
            nameIcon="logout"
            onPress={() =>
              setDialog({
                visible: true,
                type: 'warning',
                message: bilingual.DIALOG.LOGOUT,
                handleOk: () => logOut(),
                handleCancel: () => setDialog(defaultDialog),
              })
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonalScreen;
