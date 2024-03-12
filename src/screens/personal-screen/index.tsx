import theme, { Box, Text } from '@/utils/theme'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import CustomAlert from '@/components/customAler/CustomAlert'
import { Alert, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './personal.style'
import Icons from '@/components/shared/icon'
import GroupSettings from '@/components/group_settings'
import { useNavigation } from '@react-navigation/native'
import { AppScreenNavigationType, AuthScreenNavigationType } from '@/navigation/types'
import BorderButton from '@/components/button/borderButton/BorderButton'
import LabelScreen from '@/components/labelScreen/LabelScreen'
import * as ImagePicker from 'react-native-image-picker'
// import * as ImagePicker from 'react-native-image-crop-picker';
import DialogChooseImage from '@/components/customAler/dialogChooseImage/DialogChooseImage'
import DialogNotification from '@/components/customAler/dialogNotification/DialogNotification'
import axiosInstance from '@/services/config'
import { BASE_URL } from '@/services/config'
import axios from 'axios'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import CustomInputInfoUser from '@/components/input/customInputInfoUser/CustomInputInfoUser'
import Button01 from '@/components/button/button01/Button01'
import { DestTypes } from '@/assets/data'
import { set } from 'mongoose'

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 100

const PersonalScreen = () => {
    const IMAGE = '../../assets/images/avatarDefault.jpg'
    const personInit: Person = {
        hobby: ['Du lich xa', 'Du lich gan', 'The thao', 'Thien nhien'],
        email: 'legend.mighty28102002@gmail.com',
        firstName: 'Cong Nghia',
        lastName: 'Le',
        image: '../../assets/images/avatarDefault.jpg',
        isEnglish: false,
        isLight: false,
    }

    const [person, setPerson] = useState<Person>(personInit);

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [showTakeImage, setShowTakeImage] = useState(false)
    const [response, setResponse] = useState<any>(null)
    const [image, setImage] = useState<any>('')
    const [dialogNotification, setDialogNotification] = useState<{ displayMsg: string, isShow: boolean }>({ displayMsg: '', isShow: false })

    const [types, setTypes] = useState<TypesFilterProps[]>()
    const [typesChoose, setTypesChoose] = useState<TypesFilterProps[]>()
    const [isShowDialogFilter, setShowDialogFilter] = useState(false)
    const [infoChanged, setInfoChanged] = useState(false)

    const { updateUser } = useUserGlobalStore();

    const navigation = useNavigation<AppScreenNavigationType<"Root">>()

    useEffect(() => {
        person.hobby = ['Du lich xa', 'Du lich gan', 'The thao', 'Thien nhien']
        person.email = 'legend.mighty28102002@gmail.com'
        person.firstName = 'Cong Nghia'
        person.lastName = 'Le'
        person.image = '../../assets/images/avatarDefault.jpg'
        person.isEnglish = false
        person.isLight = false
    }, [])

    const handleToggle = (name: keyof Person) => {
        // const updatedPeople = [...person]
        // updatedPeople[0] = { ...person[0], [name]: !person[0][name] }
        // setPerson(updatedPeople)

        setPerson({
            ...person,
            [name]: !person[name],
        });
    };

    const handleChangeValue = (name: keyof Person, value: string) => {
        setPerson({
            ...person,
            [name]: value
        })
    }

    const hanleButtonOKDialogError = () => {
        setDialogNotification({ displayMsg: '', isShow: false });
    }

    const navigateToChangePasswordScreen = () => {
        navigation.navigate("ChangePassword")
    }

    const navigateToUserListScreen = () => {
        navigation.navigate("ViewUsers")
    }

    const navigateToApprovePlacesScreen = () => {
        navigation.navigate("ApprovePlaces")
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

    const uploadImage = async ({ type, options }: any) => {
        if (type === 'capture') {
            /*ImagePicker.openCamera({
                width: 160,
                height: 160,
                cropperCircleOverlay: true,
                cropping: true,
            }).then((image) => {
                setImage(image.path)
                // send Backend
                console.log(image)
                const formData = new FormData();
                formData.append('file', {
                    uri: image.path,
                    type: 'image/jpeg',
                    name: Date.now().toString(),
                });
            }).catch((error) => {
                setDialogNotification({ displayMsg: error.message, isShow: true });
            });*/

            await ImagePicker.launchCamera(options, async (response) => {
                if (response.didCancel) {
                    setDialogNotification({ displayMsg: 'User cancelled camera', isShow: true })
                } else if (response.errorCode) {
                    setDialogNotification({ displayMsg: response.errorMessage ? response.errorMessage : 'Camera Error', isShow: true })
                } else {
                    let imageUri = response.assets?.[0]?.uri;
                    setImage(imageUri);
                    // sendBackend
                    let formData = new FormData()
                    formData.append('file', {
                        uri: imageUri,
                        type: 'image/jpeg',
                        name: 'kkkhhh.jpg',
                    })
                    try {
                        axios.post('http://192.168.1.66:1702/user/upload-avatar/65e9d0363e9261d9647632a6', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then((response) => {
                            console.log(response.data)
                        })
                    } catch (e) {
                        console.log(e)
                    }
                }
            })
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

            await ImagePicker.launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    setDialogNotification({ displayMsg: 'User cancelled image picker', isShow: true })
                } else if (response.errorCode) {
                    setDialogNotification({ displayMsg: response.errorMessage ? response.errorMessage : 'Cannot Upload this Image', isShow: true })
                } else {
                    let imageUri = response.assets?.[0]?.uri;
                    setImage(imageUri);
                    // sendBackend
                }
            });
        }
    }

    const handleActionRemove = () => {
        setImage('')
    }

    const logOut = () => {
        updateUser(null);
    }

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

        console.log('Personal-Screen(274): ')
        console.log(JSON.stringify(infoUserChange))
    }

    return (
        <View style={styles.container}>
            <DialogChooseImage
                visible={showTakeImage}
                onDimissAlert={setShowTakeImage}
                onHandlerActionCamera={uploadImage}
                onHandlerActionGallery={uploadImage}
                onHandlerActionRemove={handleActionRemove}
            />
            <DialogNotification
                status='error'
                displayMode='UPLOAD IMAGE ERROR'
                displayMsg={dialogNotification.displayMsg}
                visible={dialogNotification.isShow}
                onDimissAlert={hanleButtonOKDialogError}
            />
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

            <ScrollView
                style={{ marginBottom: isKeyboardVisible ? 5 : 135 }}
                showsVerticalScrollIndicator={false} >
                <View style={styles.header}>
                    <Text style={[theme.textVariants.textXl, styles.text]}>Your Profile</Text>
                    <View style={styles.containerAvatar}>
                        <Image
                            source={image !== '' ? { uri: image } : require(IMAGE)}
                            style={styles.imageAvatar} />
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => setShowTakeImage(true)}
                        >
                            <View style={styles.containerCamera}>
                                <Icons name='camera' />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerHobby}>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode='tail'
                            style={[theme.textVariants.textBase, styles.text, { textAlign: 'center' }]}>
                            {person.email}
                        </Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.information}>
                        <View style={styles.heading}>
                            <LabelScreen nameIcon='personal' title='Information' />
                        </View>
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
                            handleChangeValue={handleChangeValue}
                        />

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

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginTop: 16
                            }}
                            pointerEvents={infoChanged ? 'none' : 'auto'}>
                            <Button01
                                height={60}
                                label='save'
                                color={infoChanged ? theme.colors.grey : theme.colors.orange}
                                onPress={() => handleActionSave()}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.changePassword}
                            onPress={navigateToChangePasswordScreen}
                        >
                            <Text style={[theme.textVariants.textLg, styles.text]}>Change password</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.settings}>
                        <View style={styles.heading}>
                            <LabelScreen nameIcon='setting' title='Settings' />
                        </View>

                            {/* false là EN -> true là VI */}
                        <GroupSettings
                            label={'Language (VI/EN)'}
                            isEnabled={person.isEnglish}
                            activeText='VI'
                            inActiveText='EN'
                            toggleSwitch={() => handleToggle('isEnglish')}
                        />
                            
                            {/* false là Light -> true là Dark */}
                        <GroupSettings
                            label={'Theme (Dark/Light)'}
                            isEnabled={person.isLight}
                            activeText='Dark'
                            inActiveText='Light'
                            toggleSwitch={() => handleToggle('isLight')}
                        />
                    </View>

                    <View style={styles.advanced}>
                        <View style={styles.heading}>
                            <LabelScreen nameIcon='advanced' title='Advanced' />
                        </View>
                        <BorderButton
                            height={60}
                            label='Users'
                            nameIcon='userList'
                            onPress={navigateToUserListScreen} />

                        <BorderButton
                            height={60}
                            label='Approve creating'
                            nameIcon='advanced'
                            onPress={navigateToApprovePlacesScreen} />

                        <BorderButton
                            height={60}
                            label='Log out'
                            nameIcon='remove'
                            onPress={logOut} />
                    </View>
                </View >
            </ScrollView >
        </View >
    )
}

export default PersonalScreen