import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Keyboard, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import Icons from '@/components/shared/icon'
import styles from './createScreen.style'
import theme from '@/utils/theme'
import { AppScreenNavigationType } from '@/navigation/types'
import { useNavigation, useRoute } from '@react-navigation/native'
import ImageUpload from '@/components/imageUpload/ImageUpload'
import DialogChooseImage from '@/components/customAler/dialogChooseImage/DialogChooseImage'
import DialogNotification from '@/components/customAler/dialogNotification/DialogNotification'
import * as ImagePicker from 'react-native-image-picker'
import Button01 from '@/components/button/button01/Button01'
import { DestTypes, Places } from '@/assets/data'
import GroupSettings from '@/components/group_settings'

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 500

interface UploadImages {
    id: number
    uri: any
}

interface FocusInfoUser {
    name_VI: boolean
    name_EN: boolean
    content_VI: boolean
    content_EN: boolean
    latitude: boolean
    longitude: boolean
}

const CreatePlaceScreen = () => {
    const navigation = useNavigation<AppScreenNavigationType<"Root">>()

    const [newPlace, setNewPlace] = useState<PlaceProps>({
        id: '-1',
        destination_VI: '',
        content_VI: '',
        destination_EN: '',
        content_EN: '',
        star: -1,
        longitude: 0,
        latitude: 0,
        status: -1,
        types: [],
        images: [],
    })

    const navigateToCreatedPlacesScreen = () => {
        navigation.navigate("CreatedPlaces")
    }

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [showTakeImage, setShowTakeImage] = useState(false)
    const [dialogNotification, setDialogNotification] = useState<{ displayMsg: string, isShow: boolean }>({ displayMsg: '', isShow: false })
    const [idImage, setIdImage] = useState(-1)
    const [types, setTypes] = useState<TypesFilterProps[]>()
    const [typesChoose, setTypesChoose] = useState<TypesFilterProps[]>()
    const [isShowDialogFilter, setShowDialogFilter] = useState(false)

    const [onFocus, setOnFoCus] = useState<FocusInfoUser>({
        name_VI: false,
        name_EN: false,
        content_VI: false,
        content_EN: false,
        latitude: false,
        longitude: false
    })

    const [imageUploads, setImageUploads] = useState<UploadImages[]>([
        { id: 0, uri: '' },
        { id: 1, uri: '' },
        { id: 2, uri: '' },
        { id: 3, uri: '' },
        { id: 4, uri: '' },
    ])

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

    // Set Type
    useEffect(() => {
        let dataTypes: TypesFilterProps[] = []
        DestTypes.map((destType) => {
            let choose = false
            if (newPlace.types && newPlace.types.length > 0) {
                newPlace.types.forEach((type) => {
                    if (type === destType.typeName)
                        choose = true
                })
            }
            dataTypes.push({ type: destType, isChoose: choose })
        })
        setTypes(dataTypes)
        setTypesChoose(dataTypes)


    }, [])

    // Set ImageUpload
    useEffect(() => {
        setImageUploads([])
    }, [])

    const getRandomIntInclusive = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const uploadImage = async ({ type, options1, options2 }: any) => {
        if (type === 'capture') {
            await ImagePicker.launchCamera(options1, response => {
                if (response.didCancel) {
                    setDialogNotification({ displayMsg: 'User cancelled camera', isShow: true })
                } else if (response.errorCode) {
                    setDialogNotification({ displayMsg: response.errorMessage ? response.errorMessage : 'Camera Error', isShow: true })
                } else {
                    let imageUri = response.assets?.[0]?.uri;
                    setImageUploads((prevUploads) =>
                        [...prevUploads,
                        { id: getRandomIntInclusive(5, 100), uri: imageUri }
                        ])
                    // sendBackend
                }
            })
        } else {
            if (idImage !== -1) {
                await ImagePicker.launchImageLibrary(options1, (response) => {
                    if (response.didCancel) {
                        setDialogNotification({ displayMsg: 'User cancelled image picker', isShow: true })
                    } else if (response.errorCode) {
                        setDialogNotification({ displayMsg: response.errorMessage ? response.errorMessage : 'Cannot Upload this Image', isShow: true })
                    } else {
                        let imageUri = response.assets?.[0]?.uri;
                        setImageUploads((prevUploads) =>
                            prevUploads.map((upload) =>
                                upload.id === idImage ? { ...upload, uri: imageUri } : upload
                            )
                        );
                        // sendBackend
                    }
                });
            } else {
                await ImagePicker.launchImageLibrary(options2, (response) => {
                    if (response.didCancel) {
                        setDialogNotification({ displayMsg: 'User cancelled image picker', isShow: true })
                    } else if (response.errorCode) {
                        setDialogNotification({ displayMsg: response.errorMessage ? response.errorMessage : 'Cannot Upload this Image', isShow: true })
                    } else {
                        response.assets?.map((asset) => {
                            setImageUploads((prevUploads) =>
                                [...prevUploads,
                                { id: getRandomIntInclusive(5, 20), uri: asset.uri }
                                ])
                        })
                        // sendBackend
                    }
                });
            }
        }
    }

    const handleActionRemove = () => {
        setImageUploads((prevUploads) =>
            // prevUploads.map((upload) =>
            //     upload.id === idImage ? { ...upload, uri: '' } : upload
            // )
            prevUploads.filter((upload) =>
                upload.id !== idImage
            )
        );
        // setImage('')
    }

    const hanleButtonOKDialogError = () => {
        setDialogNotification({ displayMsg: '', isShow: false });
    }

    const onHandlerChangeInputString = (name: keyof PlaceProps, value: string) => {
        setNewPlace(prevPlace => ({ ...prevPlace, [name]: value }))
    }

    const onHandleFocusInput = (name : keyof FocusInfoUser, value: boolean) => {
        setOnFoCus(prevOnFocus => ({ ...prevOnFocus, [name]: value}))
    }

    const handleRequestSubmitCreate = () => {
        const infoPlaceChange: PlaceProps =
        {
            id: newPlace.id,
            destination_VI: newPlace.destination_VI,
            content_VI: newPlace.content_VI,
            destination_EN: newPlace.destination_EN,
            content_EN: newPlace.content_EN,
            latitude: newPlace.latitude,
            longitude: newPlace.longitude,
            star: newPlace.star,
            images: imageUploads.map(imageUploadsItem => imageUploadsItem.uri),
            status: newPlace.status,
            types: types?.filter(typeItem => typeItem.isChoose)
                .map(typeItem => typeItem.type.typeName) || []
        }

        console.log('Create-Screen(228): ')
        console.log(JSON.stringify(infoPlaceChange))
    }

    return (
        <SafeAreaWrapper >
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
                                            styles.filter,
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
                <ScrollView style={{ marginBottom: isKeyboardVisible ? 5 : 135 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.headerItem}
                            onPress={handleRequestSubmitCreate} >
                            <Icons name={'createDestination'} color={theme.colors.orange} />
                            <Text style={styles.headerText}>{'Create destination'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.headerItem}
                            onPress={navigateToCreatedPlacesScreen}
                            activeOpacity={0.85}>
                            <Icons name='list' />
                            <Text style={styles.headerText}>List</Text>
                        </TouchableOpacity>
                    </View>

                    <View 
                        style={[
                            styles.viewInputDestination, 
                            {
                                borderWidth: onFocus.name_VI ? 2 : 0,
                                borderColor: onFocus.name_VI ? '#0be881' : theme.colors.white
                            }]}>
                        <Text style={[
                            theme.textVariants.textBase,
                            {
                                color: theme.colors.orange,
                                marginStart: 8,
                                marginTop: 4
                            }]} >
                            Name (VI)
                        </Text>
                        <TextInput
                            placeholder='Destination name'
                            onFocus={() => onHandleFocusInput('name_VI', true)}
                            onBlur={() => onHandleFocusInput('name_VI', false)}
                            style={[
                                theme.textVariants.textBase,
                                styles.inputDestination]}
                            value={newPlace.destination_VI}
                            onChangeText={(value) => onHandlerChangeInputString('destination_VI', value)} />
                    </View>

                    <View style={[
                        styles.viewInputDestination, 
                        {
                            borderWidth: onFocus.name_EN ? 2 : 0,
                            borderColor: onFocus.name_EN ? '#0be881' : theme.colors.white
                        }
                    ]}>
                        <Text style={[
                            theme.textVariants.textBase,
                            {
                                color: theme.colors.orange,
                                marginStart: 8,
                                marginTop: 4
                            }]} >
                            Name (EN)
                        </Text>
                        <TextInput
                            placeholder='Destination name'
                            onFocus={() => onHandleFocusInput('name_EN', true)}
                            onBlur={() => onHandleFocusInput('name_EN', false)}
                            style={[
                                theme.textVariants.textBase,
                                styles.inputDestination]}
                            value={newPlace.destination_EN}
                            onChangeText={(value) => onHandlerChangeInputString('destination_EN', value)} />
                    </View>

                    <View style={[
                        styles.destinationDescription, 
                        {
                            borderWidth: onFocus.content_VI ? 2 : 0,
                            borderColor: onFocus.content_VI ? '#0be881' : theme.colors.white
                        }
                    ]}>
                        <Text style={[
                            theme.textVariants.textBase,
                            {
                                color: theme.colors.orange,
                                marginStart: 8,
                                marginTop: 4
                            }]} >
                            Content (VI)
                        </Text>
                        <TextInput
                            style={[theme.textVariants.textBase, styles.inputDestination]}
                            placeholder='Destination content'
                            onFocus={() => onHandleFocusInput('content_VI', true)}
                            onBlur={() => onHandleFocusInput('content_VI', false)}
                            multiline={true}
                            numberOfLines={8}
                            value={newPlace.content_VI}
                            onChangeText={(value) => onHandlerChangeInputString('content_VI', value)}
                        />
                    </View>

                    <View style={[
                        styles.destinationDescription,
                        {
                            borderWidth: onFocus.content_EN ? 2 : 0,
                            borderColor: onFocus.content_EN ? '#0be881' : theme.colors.white
                        }
                    ]}>
                        <Text style={[
                            theme.textVariants.textBase,
                            {
                                color: theme.colors.orange,
                                marginStart: 8,
                                marginTop: 4
                            }]} >
                            Content (EN)
                        </Text>
                        <TextInput
                            style={[theme.textVariants.textBase, styles.inputDestination]}
                            placeholder='Destination content'
                            onFocus={() => onHandleFocusInput('content_EN', true)}
                            onBlur={() => onHandleFocusInput('content_EN', false)}
                            multiline={true}
                            numberOfLines={8}
                            value={newPlace.content_EN}
                            onChangeText={(value) => onHandlerChangeInputString('content_EN', value)}
                        />
                    </View>

                    <View style={[
                        styles.viewInputDestination,
                        {
                            borderWidth: onFocus.latitude ? 2 : 0,
                            borderColor: onFocus.latitude ? '#0be881' : theme.colors.white
                        }
                    ]}>
                        <TextInput
                            keyboardType='numeric'
                            placeholder='Latitude'
                            onFocus={() => onHandleFocusInput('latitude', true)}
                            onBlur={() => onHandleFocusInput('latitude', false)}
                            style={[
                                theme.textVariants.textBase,
                                styles.inputDestination]}
                            value={''+newPlace.latitude}
                            onChangeText={(value) => onHandlerChangeInputString('latitude', value)} />
                    </View>

                    <View style={[
                        styles.viewInputDestination,
                        {
                            borderWidth: onFocus.longitude ? 2 : 0,
                            borderColor: onFocus.longitude ? '#0be881' : theme.colors.white
                        }
                    ]}>
                        <TextInput
                            keyboardType='numeric'
                            placeholder='Longitude'
                            onFocus={() => onHandleFocusInput('longitude', true)}
                            onBlur={() => onHandleFocusInput('longitude', false)}
                            style={[
                                theme.textVariants.textBase,
                                styles.inputDestination]}
                            value={'' + newPlace.longitude}
                            onChangeText={(value) => onHandlerChangeInputString('longitude', value)} />
                    </View>

                    <View style={styles.containerFilter}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={[styles.filter,
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
                            <Text style={[theme.textVariants.textBase, styles.text]}>Chooses Types</Text>
                        </TouchableOpacity>
                        {types?.map(type => (
                            type.isChoose ? (
                                <View key={type.type.id} style={styles.filter}>
                                    <TouchableOpacity
                                        activeOpacity={0.85}
                                        style={styles.iconRemove}
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

                    <View style={[
                        styles.containerFooter,
                        { flexWrap: 'wrap', rowGap: 10, columnGap: 30 }
                    ]}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.btnAdd}
                            onPress={() => {
                                setIdImage(-1)
                                setShowTakeImage(true)
                            }}>
                            <Icons name='add' />
                        </TouchableOpacity>
                        {imageUploads.length > 0 ? imageUploads?.map((imageUpload, index) => (
                            <View key={imageUpload.id} style={{ width: 100, height: 100 }}>
                                <ImageUpload
                                    image={imageUpload.uri}
                                    onHandleShowTakeImage={() => {
                                        setIdImage(imageUpload.id)
                                        setShowTakeImage(true)
                                    }}
                                />
                            </View>
                        )) : null}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    )
}

export default CreatePlaceScreen