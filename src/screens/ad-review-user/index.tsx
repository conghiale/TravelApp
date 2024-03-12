import { AppScreenNavigationType } from '@/navigation/types'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styles from './reviewUser.style'
import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft'
import theme from '@/utils/theme'
import CustomInputInfoUser from '@/components/input/customInputInfoUser/CustomInputInfoUser'
import LabelScreen from '@/components/labelScreen/LabelScreen'
import LabelScreenReverse from '@/components/labelScreen/LabelScreenReverse'
import Icons from '@/components/shared/icon'
import { DestTypes, LoginHistory, Places } from '@/assets/data'
import LoginHistoryItem from '@/components/loginHistoryItem/LoginHistoryItem'
import Place from '@/components/place/Place'
import Button01 from '@/components/button/button01/Button01'
import { font } from '@/utils/font'

const ReviewUserScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"ReviewUser">>()

  // const [infoValue, setInfoValue] = useState<InfoProps>({
  //   email: '',
  //   firstName: 'Cong Nghia',
  //   lastName: 'Le',
  //   hobby: 'Phiêu lưu, Mạo Hiểm, Thiên nhiên, Văn hoá'
  // })

  // Person mặc định (DEMO)
  const personInit: Person = {
    hobby: ['Du lich xa', 'Du lich gan', 'The thao', 'Thien nhien'],
    email: 'legend.mighty28102002@gmail.com',
    firstName: 'Cong Nghia',
    lastName: 'Le',
    image: '../../assets/images/avatarDefault.jpg',
    isEnglish: false,
    isLight: false,
  }

  const [loginHistory, setLoginHistory] = useState(true)
  const [placeHistory, setPlaceHistory] = useState(true)

  const [person, setPerson] = useState<Person>(personInit);
  const [types, setTypes] = useState<TypesFilterProps[]>()
  const [typesChoose, setTypesChoose] = useState<TypesFilterProps[]>()
  const [isShowDialogFilter, setShowDialogFilter] = useState(false)
  const [infoChanged, setInfoChanged] = useState(false)

  const goBack = () => {
    navigation.goBack()
  }

  const handleChangeValue = (name: keyof Person, value: string) => {
    setPerson({
      ...person,
      [name]: value
    })
  }

  const handleLoginHistory = () => {
    setLoginHistory(!loginHistory)
  }

  const handlePlaceHistory = () => {
    setPlaceHistory(!placeHistory)
  }

  // // Get user by id
  useEffect(() => {
    person.hobby = ['Du lich xa', 'Du lich gan', 'The thao', 'Thien nhien']
    person.email = 'legend.mighty28102002@gmail.com'
    person.firstName = 'Cong Nghia'
    person.lastName = 'Le'
    person.image = '../../assets/images/avatarDefault.jpg'
    person.isEnglish = false
    person.isLight = false
  }, [])

  // Init Type
  useEffect(() => {
    let dataTypes: TypesFilterProps[] = []
    DestTypes.map((destType) => (
      dataTypes.push({ type: destType, isChoose: person.hobby.includes(destType.typeName) })
    ))
    setTypes(dataTypes)
    setTypesChoose(dataTypes)
  }, [])

  // passing types to person.hobby
  useEffect(() => {
    const personUpdate = { ...person }
    types?.forEach(type => {
      if (type.isChoose && !personUpdate.hobby.includes(type.type.typeName)) {
        personUpdate.hobby.push(type.type.typeName)
      }
      else if (!type.isChoose && personUpdate.hobby.includes(type.type.typeName)) {

        const index = personUpdate.hobby.indexOf(type.type.typeName);
        if (index !== -1) {
          personUpdate.hobby.splice(index, 1);
        }
      }
    })
    setPerson(personUpdate)
  }, [types])

  // checkChangeInfoUser
  useEffect(() => {
    setInfoChanged(
      compareHobby() &&
      person.email === personInit.email &&
      person.firstName === personInit.firstName &&
      person.lastName === personInit.lastName
    );
  }, [person])

  // compare hobby
  const compareHobby = () => {
    let isEqual = true;

    personInit.hobby.forEach((element, index) => {
      if (element !== person.hobby[index]) {
        isEqual = false;
        return; // Thoát khỏi vòng lặp
      }
    });
    return isEqual
  }

  // so sánh avatar
  const compareImages = () => {
    // so sanh avatar co thay doi hay khong
  }

  const handleActionSave = () => {
    const infoUserChange: Person =
    {
      hobby: person.hobby,
      email: person.email,
      firstName: person.firstName,
      lastName: person.lastName,
      image: person.image,
      isEnglish: person.isEnglish,
      isLight: person.isLight,
    }

    console.log('review-user-Screen(145): ')
    console.log(JSON.stringify(infoUserChange))
  }

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <Modal
        visible={isShowDialogFilter}
        animationType='fade'
        transparent={true}
        onRequestClose={() => setShowDialogFilter(false)}
      >
        <View style={styles.containerModal}>
          <View style={styles.containerModalDialog}>
            <Text
              style={[theme.textVariants.textXl, styles.textTitleModal
              ]}>
              Select the type of place you want to search
            </Text>

            <View style={styles.bodyModal}>
              {typesChoose?.map(type => (
                <TouchableOpacity
                  key={type.type.id}
                  activeOpacity={0.5}
                  style={[
                    styles.UpdateTypes,
                    { backgroundColor: type.isChoose ? theme.colors.grey : theme.colors.blue1 }
                  ]}
                  onPress={() => setTypesChoose((types) =>
                    types?.map(typeSelected => typeSelected.type.id === type.type.id ?
                      { ...type, isChoose: !typeSelected.isChoose } : typeSelected)
                  )}
                >
                  <Text style={[theme.textVariants.textBase, styles.text]}>{type.type.typeName}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.footerModal}>
              <Button01
                height={60}
                label='Choose'
                color={theme.colors.orange}
                onPress={() => {
                  setShowDialogFilter(false)
                  setTypes(typesChoose)
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView style={{ backgroundColor: theme.colors.blue1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <ButtonArrowLeft onPress={goBack} />
            <View style={styles.containerTitle}>
              <Text style={[theme.textVariants.textLg, styles.title]}>Review User</Text>
            </View>
            <View pointerEvents={infoChanged ? 'none' : 'auto'}>
              <Button01
                height={40}
                label='Change'
                color={infoChanged ? theme.colors.grey : theme.colors.orange}
                onPress={() => handleActionSave()}
              />
            </View>
          </View>
          <View style={styles.containerContent}>
            <View style={
              {
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }
            }>
              {/* get uri form person.image */}
              <Image
                style={styles.image}
                source={require('../../assets/images/user.png')} />
              <Text style={[
                theme.textVariants.textBase, styles.text, {flex: 1}
              ]}>
                {person.email}
              </Text>
            </View>
            
            <Text
              style={[theme.textVariants.textLg, styles.titleInfo]}>
              Information
            </Text>

            <CustomInputInfoUser
              label='First Name'
              nameIcon='edit'
              value={person.firstName}
              name='firstName'
              handleChangeValue={handleChangeValue}
            />

            <CustomInputInfoUser
              label='Last Name'
              nameIcon='edit'
              value={person.lastName}
              name='lastName'
              handleChangeValue={handleChangeValue} />

            <View style={styles.containerUpdateTypes}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.UpdateTypes,
                {
                  backgroundColor: theme.colors.orange,
                  marginStart: 0,
                  borderWidth: 0,
                }
                ]}
                onPress={() => {
                  setTypesChoose(types)
                  setShowDialogFilter(true)
                }}
              >
                <Text style={[theme.textVariants.textBase, styles.text]}>Update Types</Text>
              </TouchableOpacity>
              {types?.map(type => (
                type.isChoose ? (
                  <View key={type.type.id} style={styles.UpdateTypes}>
                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={styles.iconAdd}
                      onPress={() => {
                        setTypes((prevType) =>
                          prevType?.map(typeSelected => typeSelected.type.id === type.type.id ?
                            { ...type, isChoose: !type.isChoose } : typeSelected)
                        )
                      }}
                    >
                      <Icons name='cancel' />
                    </TouchableOpacity>
                    <Text style={[theme.textVariants.textBase, styles.text]}>{type.type.typeName}</Text>
                  </View>) : null
              ))}
            </View>
          </View>
          <View style={styles.containerContent}>
            <TouchableOpacity activeOpacity={0.9} onPress={handleLoginHistory}>
              <LabelScreenReverse
                nameIcon={loginHistory === true ? 'sub' : 'add'}
                title='Login History' />
            </TouchableOpacity>
            <View style={[styles.content, { height: loginHistory ? undefined : 0 }]}>
              {LoginHistory.map(loginHistory => (
                <LoginHistoryItem
                  key={loginHistory.id}
                  id={loginHistory.id}
                  startTime={loginHistory.startTime}
                  endTime={loginHistory.endTime}
                  time={loginHistory.time} />
              ))}
            </View>
          </View>
          <View style={[styles.containerContent, { marginBottom: placeHistory ? 16 : 0 }]}>
            <TouchableOpacity activeOpacity={0.9} onPress={handlePlaceHistory}>
              <LabelScreenReverse
                nameIcon={placeHistory === true ? 'sub' : 'add'}
                title='View Place History' />
            </TouchableOpacity>
            <View style={[styles.content, { height: placeHistory ? undefined : 0 }]}>
              {Places.map((place, index) => (
                <Place
                  id={place.id}
                  key={index}
                  destination_VI={place.destination_VI}
                  content_VI={place.content_VI}
                  star={place.star}
                  longitude={place.longitude}
                  latitude={place.latitude} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ReviewUserScreen