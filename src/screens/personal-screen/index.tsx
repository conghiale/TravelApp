import theme, { Box, Text } from '@/utils/theme'
import React, { useEffect, useState } from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import CustomAlert from '@/components/customAler/CustomAlert'
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
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

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 100

const PersonalScreen = () => {
    const IMAGE = '../../assets/images/avatarDefault.jpg'
    const personInit: Person = {
        hobby: 'Trai nghiem, Kham pha, Thien nhien, Mao hiem',
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
    const { updateUser } = useUserGlobalStore();

    const navigation = useNavigation<AppScreenNavigationType<"Root">>()

    useEffect(() => {
        personInit.hobby = 'Trai nghiem, Kham pha, Thien nhien, Mao hiem'
        personInit.email = 'legend.mighty28102002@gmail.com'
        personInit.firstName = 'Cong Nghia'
        personInit.lastName = 'Le'
        personInit.image = '../../assets/images/avatarDefault.jpg'
        personInit.isEnglish = false
        personInit.isLight = false
    }, [])

    const handleInputChange = (name: keyof Person, value: string) => {
        setPerson({
            ...person,
            [name]: value,
        });
    };

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
        // const updatedPeople = [...person]
        // updatedPeople[0] = { ...person[0], [name]: value }
        // setPerson(updatedPeople)

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

    const compareValuesPerson = () => {
        return (
            person.hobby === personInit.hobby &&
            person.email === personInit.email &&
            person.firstName === personInit.firstName &&
            person.lastName === personInit.lastName &&
            person.isEnglish === personInit.isEnglish &&
            person.isLight === personInit.isLight
        )
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
                        <CustomInputInfoUser
                            label='Hobby'
                            nameIcon='edit'
                            value={person.hobby}
                            name='hobby'
                            handleChangeValue={handleChangeValue}
                        />
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

                        <GroupSettings
                            label={'Language (VI/EN)'}
                            isEnabled={person.isEnglish}
                            toggleSwitch={() => handleToggle('isEnglish')}
                        />

                        <GroupSettings
                            label={'Theme (Dark/Light)'}
                            isEnabled={person.isLight}
                            toggleSwitch={() => handleToggle('isLight')}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 16
                        }}
                        pointerEvents={compareValuesPerson() ? 'none' : 'auto'}>
                        <Button01
                            height={60}
                            label='save'
                            color={compareValuesPerson() ? theme.colors.grey : theme.colors.orange}
                            onPress={() => console.log("Button Save pressed")}
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