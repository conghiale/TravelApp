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

const CreatePlaceScreen = () => {
    const navigation = useNavigation<AppScreenNavigationType<"Root">>()

    const routes = useRoute<any>()
    const idPlace = routes.params ? routes.params.id : '-1'
    const [placeUpdate, setPlaceUpdate] = useState<PlaceProps>({
        id: idPlace,
        destination: '',
        content: '',
        star: -1,
        longitude: -1,
        latitude: -1,
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
    const [isEnglish, setIsEnglish] = useState(false)

    const [imageUploads, setImageUploads] = useState<UploadImages[]>([
        { id: 0, uri: '' },
        { id: 1, uri: '' },
        { id: 2, uri: '' },
        { id: 3, uri: '' },
        { id: 4, uri: '' },
    ])

    // Get places by id
    useEffect(() => {
        const place = Places.filter(p => p.id === idPlace)

        if (place.length > 0) {
            setPlaceUpdate(prevPlace => ({
                ...prevPlace,
                destination: place[0].destination,
                content: place[0].content,
                sta: place[0].star,
                longitude: place[0].longitude,
                latitude: place[0].latitude,
                status: place[0].status,
                types: place[0].types
            }))
        }

    }, [idPlace])

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
            if (placeUpdate.types && placeUpdate.types.length > 0) {
                placeUpdate.types.forEach((type) => {
                    if (type === destType.typeName)
                        choose = true
                })
            }
            dataTypes.push({ type: destType, isChoose: choose })
        })
        setTypes(dataTypes)
        setTypesChoose(dataTypes)


    }, [idPlace])

    // Set ImageUpload
    useEffect(() => {
        setImageUploads([])
        placeUpdate.images?.map((uriImage, index) => {
            setImageUploads((prevUploads) => {
                return (
                    prevUploads.map((upload) => {
                        return { ...upload, id: index, uri: uriImage }
                    }
                    ))
            })
        })
    }, [idPlace])

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
                                {id: getRandomIntInclusive(5, 100), uri: imageUri}
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
                                {id: getRandomIntInclusive(5, 20), uri: asset.uri}
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

    const handleChagesSwitchLanguage = () => {
        setIsEnglish(!isEnglish)
    }

    const hanleButtonOKDialogError = () => {
        setDialogNotification({ displayMsg: '', isShow: false });
    }

    const handleRequestSubmitEdit = () => {
        const infoPlaceChange: PlaceProps =
        {
            id: placeUpdate.id,
            destination: placeUpdate.destination,
            content: placeUpdate.content,
            latitude: placeUpdate.latitude,
            longitude: placeUpdate.longitude,
            star: placeUpdate.star,
            images: imageUploads.map(imageUploadsItem => imageUploadsItem.uri),
            status: placeUpdate.status,
            isEnglish: isEnglish,
            types: types?.filter(typeItem => typeItem.isChoose)
                            .map(typeItem => typeItem.type.typeName) || []
        }

        console.log('Edit-Screen(228): ')
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
                            onPress={handleRequestSubmitEdit} >
                            <Icons name={idPlace ? 'edit' : 'createDestination'} color={theme.colors.orange} />
                            <Text style={styles.headerText}>{idPlace ? 'Edit Destination' : 'Create destination'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.headerItem}
                            onPress={navigateToCreatedPlacesScreen}
                            activeOpacity={0.85}>
                            <Icons name='list' />
                            <Text style={styles.headerText}>List</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewInputDestination}>
                        <TextInput
                            placeholder='Destination name'
                            style={[
                                theme.textVariants.textBase,
                                styles.inputDestination]}
                            value={placeUpdate.destination} />
                    </View>
                    <View style={[styles.destinationDescription]}>
                        <TextInput
                            style={[theme.textVariants.textBase, styles.inputDestination]}
                            placeholder='Destination content'
                            multiline={true}
                            numberOfLines={8}
                            value={placeUpdate.content}
                        />
                    </View>

                    <View style={styles.viewInputDestination}>
                        <TextInput
                            placeholder='Latitude'
                            style={[
                                theme.textVariants.textBase,
                                styles.inputDestination]}
                            value={placeUpdate.latitude === -1 ? '' : ('' + placeUpdate.latitude)} />
                    </View>

                    <View style={styles.viewInputDestination}>
                        <TextInput
                            placeholder='Longitude'
                            style={[
                                theme.textVariants.textBase,
                                styles.inputDestination]}
                            value={placeUpdate.longitude === -1 ? '' : ('' + placeUpdate.longitude)} />
                    </View>

                    <View style={{marginTop: 16, marginEnd: '3%'}}>
                        <GroupSettings
                            label={'Language (VI/EN)'}
                            isEnabled={isEnglish}
                            toggleSwitch={handleChagesSwitchLanguage}
                        />
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
                        )): null}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    )
}

export default CreatePlaceScreen