import { AppScreenNavigationType } from '@/navigation/types';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './reviewUser.style';
import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft';
import theme from '@/utils/theme';
import CustomInputInfoUser from '@/components/input/customInputInfoUser/CustomInputInfoUser';
import LabelScreenReverse from '@/components/labelScreen/LabelScreenReverse';
import Icons from '@/components/shared/icon';
import { DestTypes, LoginHistory, Places } from '@/assets/data';
import LoginHistoryItem from '@/components/loginHistoryItem/LoginHistoryItem';
import Place from '@/components/place/Place';
import Button01 from '@/components/button/button01/Button01';
import { getAllLoveListByUser, getUserById, updateUserById } from '@/services/user-service';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import { labelEn, labelVi } from '@/utils/label';
import { defaultDialog, getErrorMessage } from '@/utils';
import { getDestinationTypes } from '@/services/destination-service';
import { BASE_URL_AVATAR } from '@/services/config';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from '@/components/dialog-handle-event';
import { languageConstant, themeConstant } from '@/API/src/utils/constant';
import { DarkMode, LightMode } from '@/utils/mode';

type ApiReturn = {
  _id: string;
  userId: string;
  destinationId: string;
  createdAt: string;
  updatedAt: string;
  lovedDest: {
    nameVi: string;
    nameEn: string;
    descriptionVi: string;
    descriptionEn: string;
    latitude: number;
    longitude: number;
    types: string[];
    vote: number;
    status: number;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    images: string[];
  };
};

const ReviewUserScreen = () => {
  const { user } = useUserGlobalStore();
  const bilingual = user?.language === languageConstant.VI ? labelVi : labelEn;
  const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;
  const [loading, setLoading] = useState<boolean>(true);
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);
  const navigation = useNavigation<AppScreenNavigationType<'ReviewUser'>>();
  const router = useRoute<any>();
  const userId = router.params.id;
  const [changeEditable, setChangeEditable] = useState(true);

  // Person mặc định (DEMO)
  const personInit: Person = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    avatar: '',
    hobby: [],
  };

  const [loginHistory, setLoginHistory] = useState(true);
  const [placeHistory, setPlaceHistory] = useState(false);

  const [person, setPerson] = useState<Person>(personInit);
  const [input, setInput] = useState<Person>(personInit);
  const [types, setTypes] = useState<TypesFilterProps[]>([]);
  const [typesModal, setTypesModal] = useState<TypesFilterProps[]>([]);
  const [infoChanged, setInfoChanged] = useState(false);
  const [isShowDialogFilter, setShowDialogFilter] = useState(false);
  const [places, setPlaces] = useState<IPlace[]>([]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleChangeValue = (name: keyof Person, value: string) => {
    setInput({
      ...person,
      [name]: value,
    });
  };

  useEffect(() => {
    getAllLoveListByUser(userId as string, false)
      .then(r => {
        const customData: IPlace[] = r.data.data.map((d: ApiReturn) => ({
          id: d.destinationId,
          name:
            user?.language === languageConstant.VI
              ? d.lovedDest.nameVi
              : d.lovedDest.nameEn,
          description:
            user?.language === languageConstant.VI
              ? d.lovedDest.descriptionVi
              : d.lovedDest.descriptionEn,
          latitude: d.lovedDest.latitude,
          longitude: d.lovedDest.longitude,
          images: d.lovedDest.images,
          types: d.lovedDest.types,
          vote: d.lovedDest.vote,
        }));
        setPlaces(customData);
      })
      .catch(e => {
        setDialog({
          visible: true,
          type: 'error',
          message: e.response.data.message,
          handleOk: () => setDialog(defaultDialog),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router])

  const handleLoginHistory = () => {
    setLoginHistory(!loginHistory);
  };

  const handlePlaceHistory = () => {
    setPlaceHistory(!placeHistory);
  };

  const releaseMemory = () => {
    setTypes([]);
  };

  const fetchData = () => {
    setLoading(true);
    getUserById(userId)
      .then(ru => {
        const data: ApiReturnPerson = ru.data.data;
        const dataAssign = {
          id: data._id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          avatar: data.avatar,
          hobby: data.hobby,
        };
        setPerson(dataAssign);
        setInput(dataAssign);
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
            // console.log(dataCustom.map(d => d.isChoose));
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
  };

  useFocusEffect(
    React.useCallback(() => {
      // console.log('Screen focused');
      fetchData();

      return () => {
        releaseMemory();
        // console.log('Screen blurred');
      };
    }, []),
  );

  // checkChangeInfoUser
  useEffect(() => {
    const flag =
      hobbyChanged() ||
      person.firstName !== input.firstName ||
      person.lastName !== input.lastName;
    setInfoChanged(flag);
  }, [input, types]);

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
      firstName: input.firstName,
      lastName: input.lastName,
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
    <View style={{ width: '100%', height: '100%' }}>
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
      // handleCancel={dialog.handleCancel}
      />
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
              {bilingual.REVIEW_USER.SELECT_TYPES}
            </Text>
            <View style={styles.bodyModal}>
              {typesModal?.map(type => (
                <TouchableOpacity
                  key={type.dest.id}
                  activeOpacity={0.5}
                  style={[
                    styles.updateTypes,
                    {
                      backgroundColor: type.isChoose
                        ? mode.grey
                        : mode.blue1,
                      borderColor: mode.grey,
                    },
                  ]}
                  onPress={() =>
                    setTypesModal(types =>
                      types?.map(typeSelected =>
                        typeSelected.dest.id === type.dest.id
                          ? { ...type, isChoose: !typeSelected.isChoose }
                          : typeSelected,
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
                label={bilingual.REVIEW_USER.CHOOSE}
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
      <ScrollView
        style={{ backgroundColor: mode.blue1 }}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.container, { backgroundColor: mode.blue1 }]}>
          <View style={styles.containerHeader}>
            <ButtonArrowLeft onPress={goBack} />
            <View style={styles.containerTitle}>
              <Text
                style={[
                  theme.textVariants.textLg,
                  styles.title,
                  { color: mode.orange },
                ]}>
                {bilingual.REVIEW_USER.TITLE}
              </Text>
            </View>
            <View pointerEvents={infoChanged ? 'auto' : 'none'}>
              <Button01
                height={40}
                label={bilingual.REVIEW_USER.CHANGE_BTN}
                color={infoChanged ? mode.orange : mode.grey}
                onPress={() => handleActionSave()}
              />
            </View>
          </View>
          <View style={styles.containerContent}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }}>
              {/* get uri form person.image */}
              <Image
                style={[styles.image, { borderColor: mode.grey }]}
                source={
                  person.avatar
                    ? { uri: `${BASE_URL_AVATAR}/${person.avatar}` }
                    : require('../../assets/images/avatarDefault.jpg')
                }
              />
              <Text
                style={[
                  theme.textVariants.textBase,
                  styles.text,
                  { color: mode.white, flex: 1 },
                ]}>
                {person.email}
              </Text>
            </View>

            <Text
              style={[
                theme.textVariants.textLg,
                styles.titleInfo,
                { color: mode.orange },
              ]}>
              {bilingual.REVIEW_USER.INFORMATION}
            </Text>

            <CustomInputInfoUser
              label={bilingual.REVIEW_USER.FIRST_NAME}
              nameIcon="edit"
              value={input.firstName}
              name="firstName"
              handleChangeValue={handleChangeValue}
              changeEditable={changeEditable}
            />

            <CustomInputInfoUser
              label={bilingual.REVIEW_USER.LAST_NAME}
              nameIcon="edit"
              value={input.lastName}
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
                  {bilingual.REVIEW_USER.SET_HOBBY}
                </Text>
              </TouchableOpacity>
              {types?.map(type =>
                type.isChoose ? (
                  <View
                    key={type.dest.id}
                    style={[
                      styles.updateTypes,
                      { borderColor: mode.grey },
                    ]}>
                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={styles.iconAdd}
                      onPress={() => {
                        setTypes(prevType =>
                          prevType?.map(typeSelected =>
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
          </View>
          <View style={styles.containerContent}>
            <TouchableOpacity activeOpacity={0.9} onPress={handleLoginHistory}>
              <LabelScreenReverse
                nameIcon={loginHistory === true ? 'sub' : 'add'}
                title={bilingual.REVIEW_USER.LOGIN_HISTORY}
              />
            </TouchableOpacity>
            <View
              style={[styles.content, { height: loginHistory ? undefined : 0 }]}>
              {LoginHistory.map(loginHistory => (
                <LoginHistoryItem
                  key={loginHistory.id}
                  id={loginHistory.id}
                  startTime={loginHistory.startTime}
                  endTime={loginHistory.endTime}
                  time={loginHistory.time}
                />
              ))}
            </View>
          </View>
          <View
            style={[
              styles.containerContent,
              { marginBottom: placeHistory ? 16 : 0 },
            ]}>
            <TouchableOpacity activeOpacity={0.9} onPress={handlePlaceHistory}>
              <LabelScreenReverse
                nameIcon={placeHistory === true ? 'sub' : 'add'}
                title={bilingual.REVIEW_USER.PLACE_LOVE_HISTORY}
              />
            </TouchableOpacity>
            <View
              style={[styles.content, { height: placeHistory ? undefined : 0 }]}>
              {places.map((place, index) => (
                <Place
                  id={place.id ? place.id : ''}
                  key={index}
                  description={place.description}
                  name={place.name}
                  images={place.images}
                  types={place.types}
                  vote={place.vote}
                  longitude={place.longitude}
                  latitude={place.latitude}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewUserScreen;
