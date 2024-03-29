import theme, { Text } from '@/utils/theme';
import React, { useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { AppScreenNavigationType } from '@/navigation/types';
import BorderButton from '@/components/button/borderButton/BorderButton';
import LabelScreen from '@/components/labelScreen/LabelScreen';
import * as ImagePicker from 'react-native-image-picker';
// import * as ImagePicker from 'react-native-image-crop-picker';
import DialogChooseImage from '@/components/customAler/dialogChooseImage/DialogChooseImage';
import { BASE_URL_AVATAR } from '@/services/config';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import CustomInputInfoUser from '@/components/input/customInputInfoUser/CustomInputInfoUser';
import Button01 from '@/components/button/button01/Button01';
import { labelEn, labelVi } from '@/utils/label';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from '@/components/dialog-handle-event';
import { getDestinationTypes } from '@/services/destination-service';
import { defaultDialog, getErrorMessage, randomNumberString } from '@/utils';
import {
  getUserById,
  updateUserById,
  uploadAvatar,
} from '@/services/user-service';
import {
  languageConstant,
  roleConstant,
  themeConstant,
} from '@/API/src/utils/constant';
import { DarkMode, LightMode } from '@/utils/mode';

const PersonalScreen = () => {
  const { user, updateUser } = useUserGlobalStore();
  const bilingual = user?.language === languageConstant.VI ? labelVi : labelEn;
  const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;
  const [loading, setLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);
  const [changeEditable, setChangeEditable] = useState(true);
  const [languageToggle, setLanguageToggle] = useState(user?.language);

  const IMAGE = '../../assets/images/avatarDefault.jpg';
  const [person, setPerson] = useState<Person>({
    id: user?.id as string,
    email: user?.email as string,
    firstName: user?.firstName as string,
    lastName: user?.lastName as string,
    avatar: user?.avatar as string,
    hobby: [],
  });
  const navigation = useNavigation<AppScreenNavigationType<'Root'>>();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [showTakeImage, setShowTakeImage] = useState(false);
  const [isShowDialogFilter, setShowDialogFilter] = useState(false);
  const [image, setImage] = useState<any>('');

  const [infoChanged, setInfoChanged] = useState(false);
  const [types, setTypes] = useState<TypesFilterProps[]>([]);
  const [typesModal, setTypesModal] = useState<TypesFilterProps[]>([]);

  useEffect(() => {
    setLoading(true);
    if (user && user.id)
      getUserById(user.id)
        .then(ru => {
          const data: ApiReturnPerson = ru.data.data;
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
        .finally(() => setLoading(false));
  }, [user?.firstName, user?.lastName, user?.avatar, user?.hobby, user?.language]);

  const handleToggle = (key: keyof IAuthenticatedUser) => {
    if (user && user.id) {
      switch (key) {
        case 'language':
          let langValue =
            user?.language === languageConstant.VI
              ? languageConstant.EN
              : languageConstant.VI;
          updateUserById(user.id, { language: langValue })
            .then(r => {
              console.log('Switch lang OK');
            })
            .catch(e => {
              console.info('Switch lang failed');
            });
          updateUser({
            ...user,
            language: langValue,
            no_loading: true,
            data_loaded: false,
          });
          break;
        case 'theme':
          const themeValue =
            user?.theme === themeConstant.DARK
              ? themeConstant.LIGHT
              : themeConstant.DARK;
          updateUserById(user.id, { theme: themeValue })
            .then(r => {
              console.log('Switch lang OK');
            })
            .catch(e => {
              console.info('Switch lang failed');
            });
          updateUser({
            ...user,
            theme: themeValue,
          });
      }
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

  // checkChangeInfoUser
  useEffect(() => {
    const flag =
      hobbyChanged() ||
      person.firstName !== user?.firstName ||
      person.lastName !== user?.lastName;

    setInfoChanged(flag);
  }, [person, types]);

  const uploadImage = async ({ type, options }: any) => {
    if (type === 'capture') {

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
          // sendBackend
          uploadAvatarUser(imageUri);
        }
      });
    } else {

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
          uploadAvatarUser(imageUri);
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

  const uploadAvatarUser = (imageUri: any) => {
    setLoading(true);
    let formData = new FormData();
    const fileName = `${Date.now()}${randomNumberString()}.jpg`;
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: `${fileName}`,
    });

    uploadAvatar(user && user.id ? user.id : '', formData)
      .then(r => {
        updateUser({
          ...user,
          avatar: `${user?.id}/${fileName}`,
        });
        setDialog({
          visible: true,
          type: 'success',
          message: bilingual.PERSONAL.SUCCESS.UPLOAD_AVATAR,
          handleOk: () => setDialog(defaultDialog),
        });
      })
      .catch(e => {
        setDialog({
          visible: true,
          type: 'error',
          message: bilingual.PERSONAL.ERROR.UPLOAD_AVATAR,
          handleOk: () => setDialog(defaultDialog),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleActionSave = () => {
    if (types.filter(t => t.isChoose).length === 0) {
      setDialog({
        visible: true,
        type: 'error',
        message: bilingual.CREATE_EDIT_DEST.ERROR.MT_TYPES,
        handleOk: () => setDialog(defaultDialog),
      });
    }

    setChangeEditable(false);
    setLoading(true);
    updateUserById(person.id, {
      firstName: person.firstName,
      lastName: person.lastName,
      typesString: types
        .filter(t => t.isChoose)
        .map(t => t.dest.id)
        .join(','),
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
    <View style={[styles.container, { backgroundColor: mode.blue1 }]}>
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

      {/* modal pick types */}
      <Modal
        visible={isShowDialogFilter}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowDialogFilter(false)}>
        <View style={[styles.containerModal, { backgroundColor: mode.grey2 }]}>
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
              {bilingual.PERSONAL.FILTER_LABEL}
            </Text>

            <View style={styles.bodyModal}>
              {typesModal?.map(type => (
                <TouchableOpacity
                  key={type.dest.id}
                  activeOpacity={0.5}
                  style={[
                    styles.updateTypes,
                    {
                      backgroundColor: type.isChoose ? mode.grey : mode.blue1,
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
                label={bilingual.PERSONAL.FILTER_CHOOSE}
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
      {/* end modal pick types */}

      <ScrollView
        style={{ marginBottom: isKeyboardVisible ? 5 : 135 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text
            style={[
              theme.textVariants.textXl,
              styles.text,
              { color: mode.white },
            ]}>
            { }
          </Text>
          <View style={styles.containerAvatar}>
            <Image
              source={
                user?.avatar
                  ? { uri: `${BASE_URL_AVATAR}/${user.avatar}` }
                  : require(IMAGE)
              }
              style={[styles.imageAvatar, { borderColor: mode.grey }]}
            />
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowTakeImage(true)}>
              <View
                style={[styles.containerCamera, { backgroundColor: mode.grey }]}>
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
                { textAlign: 'center', color: mode.white },
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
              changeEditable={changeEditable}
            />
            <CustomInputInfoUser
              label={bilingual.PERSONAL.LAST_NAME}
              nameIcon="edit"
              value={person.lastName}
              name="lastName"
              handleChangeValue={handleChangeValue}
              changeEditable={changeEditable}
            />
            <View style={styles.containerUpdateTypes}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.updateTypes,
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
                    { color: mode.white },
                  ]}>
                  {bilingual.PERSONAL.SET_HOBBY}
                </Text>
              </TouchableOpacity>
              {types?.map((type, index) =>
                type.isChoose ? (
                  <View
                    key={index}
                    style={[styles.updateTypes, { borderColor: mode.grey }]}>
                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={styles.iconAdd}
                      onPress={() => {
                        setTypes(prevType =>
                          prevType.map(typeSelected =>
                            typeSelected.dest.id === type.dest.id
                              ? { ...type, isChoose: !type.isChoose }
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
                        { color: mode.white },
                      ]}>
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
                color={infoChanged ? mode.orange : mode.grey}
                onPress={() => handleActionSave()}
              />
            </View>

            <TouchableOpacity
              style={styles.changePassword}
              onPress={navigateToChangePasswordScreen}>
              <Text
                style={[
                  theme.textVariants.textLg,
                  styles.text,
                  { color: mode.white },
                ]}>
                {bilingual.PERSONAL.CHANGE_PWD}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.settings, { marginBottom: 20 }]}>
            <View style={styles.heading}>
              <LabelScreen
                nameIcon="setting"
                title={bilingual.PERSONAL.SETTING}
              />
            </View>

            {/* false là EN -> true là VI */}
            <GroupSettings
              label={bilingual.PERSONAL.LANGUAGUE}
              isEnabled={user?.language === languageConstant.EN}
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
