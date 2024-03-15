import {AppScreenNavigationType} from '@/navigation/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
import {DestTypes, LoginHistory, Places} from '@/assets/data';
import LoginHistoryItem from '@/components/loginHistoryItem/LoginHistoryItem';
import Place from '@/components/place/Place';
import Button01 from '@/components/button/button01/Button01';
import {getUserById} from '@/services/user-service';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import {labelEn, labelVi} from '@/utils/label';
import {defaultDialog, getErrorMessage} from '@/utils';
import {getDestinationTypes} from '@/services/destination-service';
import {BASE_URL_AVATAR} from '@/services/config';

const ReviewUserScreen = () => {
  const {user} = useUserGlobalStore();
  const bilingual = user?.language === 'EN' ? labelEn : labelVi;
  const [loading, setLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);
  const navigation = useNavigation<AppScreenNavigationType<'ReviewUser'>>();
  const router = useRoute<any>();
  const userId = router.params.id;

  // Person mặc định (DEMO)
  const personInit: Person = {
    id: '',
    email: 'legend.mighty28102002@gmail.com',
    firstName: 'Cong Nghia',
    lastName: 'Le',
    avatar: '../../assets/images/avatarDefault.jpg',
    hobby: ['Du lich xa', 'Du lich gan', 'The thao', 'Thien nhien'],
  };

  const [loginHistory, setLoginHistory] = useState(true);
  const [placeHistory, setPlaceHistory] = useState(true);

  const [person, setPerson] = useState<Person>(personInit);
  const [types, setTypes] = useState<TypesFilterProps[]>();
  const [typesModal, setTypesModal] = useState<TypesFilterProps[]>();
  const [isShowDialogFilter, setShowDialogFilter] = useState(false);
  const [infoChanged, setInfoChanged] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const handleChangeValue = (name: keyof Person, value: string) => {
    setPerson({
      ...person,
      [name]: value,
    });
  };

  const handleLoginHistory = () => {
    setLoginHistory(!loginHistory);
  };

  const handlePlaceHistory = () => {
    setPlaceHistory(!placeHistory);
  };

  // // Get user by id
  useEffect(() => {
    getUserById(userId)
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
  }, []);

  // Init Type
  useEffect(() => {
    let dataTypes: TypesFilterProps[] = [];
    DestTypes.map(destType =>
      dataTypes.push({
        dest: {id: destType.id, label: destType.typeName},
        isChoose: person.hobby.includes(destType.typeName),
      }),
    );
    setTypes(dataTypes);
    setTypesModal(dataTypes);
  }, []);

  // passing types to person.hobby
  useEffect(() => {
    const personUpdate = {...person};
    types?.forEach(type => {
      if (type.isChoose && !personUpdate.hobby.includes(type.dest.label)) {
        personUpdate.hobby.push(type.dest.label);
      } else if (
        !type.isChoose &&
        personUpdate.hobby.includes(type.dest.label)
      ) {
        const index = personUpdate.hobby.indexOf(type.dest.label);
        if (index !== -1) {
          personUpdate.hobby.splice(index, 1);
        }
      }
    });
    setPerson(personUpdate);
  }, [types]);

  // checkChangeInfoUser
  useEffect(() => {
    setInfoChanged(
      compareHobby() &&
        person.email === personInit.email &&
        person.firstName === personInit.firstName &&
        person.lastName === personInit.lastName,
    );
  }, [person]);

  // compare hobby
  const compareHobby = () => {
    let isEqual = true;

    personInit.hobby.forEach((element, index) => {
      if (element !== person.hobby[index]) {
        isEqual = false;
        return; // Thoát khỏi vòng lặp
      }
    });
    return isEqual;
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

    console.log('review-user-Screen(145): ');
    console.log(JSON.stringify(infoUserChange));
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <Modal
        visible={isShowDialogFilter}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowDialogFilter(false)}>
        <View style={styles.containerModal}>
          <View style={styles.containerModalDialog}>
            <Text style={[theme.textVariants.textXl, styles.textTitleModal]}>
              {bilingual.REVIEW_USER.SELECT_TYPES}
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
                      types?.map(typeSelected =>
                        typeSelected.dest.id === type.dest.id
                          ? {...type, isChoose: !typeSelected.isChoose}
                          : typeSelected,
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
                label={bilingual.REVIEW_USER.CHOOSE}
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
      <ScrollView
        style={{backgroundColor: theme.colors.blue1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <ButtonArrowLeft onPress={goBack} />
            <View style={styles.containerTitle}>
              <Text style={[theme.textVariants.textLg, styles.title]}>
                {bilingual.REVIEW_USER.TITLE}
              </Text>
            </View>
            <View pointerEvents={infoChanged ? 'none' : 'auto'}>
              <Button01
                height={40}
                label={bilingual.REVIEW_USER.CHANGE_BTN}
                color={infoChanged ? theme.colors.grey : theme.colors.orange}
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
                style={styles.image}
                source={
                  person.avatar
                    ? {uri: `${BASE_URL_AVATAR}/${person.avatar}`}
                    : require('../../assets/images/user.png')
                }
              />
              <Text
                style={[theme.textVariants.textBase, styles.text, {flex: 1}]}>
                {person.email}
              </Text>
            </View>

            <Text style={[theme.textVariants.textLg, styles.titleInfo]}>
              {bilingual.REVIEW_USER.INFORMATION}
            </Text>

            <CustomInputInfoUser
              label={bilingual.REVIEW_USER.FIRST_NAME}
              nameIcon="edit"
              value={person.firstName}
              name="firstName"
              handleChangeValue={handleChangeValue}
            />

            <CustomInputInfoUser
              label={bilingual.REVIEW_USER.LAST_NAME}
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
                  {bilingual.REVIEW_USER.SET_HOBBY}
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
          </View>
          <View style={styles.containerContent}>
            <TouchableOpacity activeOpacity={0.9} onPress={handleLoginHistory}>
              <LabelScreenReverse
                nameIcon={loginHistory === true ? 'sub' : 'add'}
                title={bilingual.REVIEW_USER.LOGIN_HISTORY}
              />
            </TouchableOpacity>
            <View
              style={[styles.content, {height: loginHistory ? undefined : 0}]}>
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
              {marginBottom: placeHistory ? 16 : 0},
            ]}>
            <TouchableOpacity activeOpacity={0.9} onPress={handlePlaceHistory}>
              <LabelScreenReverse
                nameIcon={placeHistory === true ? 'sub' : 'add'}
                title={bilingual.REVIEW_USER.PLACE_HISTORY}
              />
            </TouchableOpacity>
            <View
              style={[styles.content, {height: placeHistory ? undefined : 0}]}>
              {Places.map((place, index) => (
                <Place
                  id={place.id ? place.id : ''}
                  key={index}
                  description={place.descriptionVi}
                  name={place.nameVi}
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
