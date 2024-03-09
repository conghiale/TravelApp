import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import Icons from '@/components/shared/icon'
import styles from './createScreen.style'
import theme from '@/utils/theme'
import { AppScreenNavigationType } from '@/navigation/types'
import { useNavigation } from '@react-navigation/native'
import ImageUpload from '@/components/imageUpload/ImageUpload'
import DialogChooseImage from '@/components/customAler/dialogChooseImage/DialogChooseImage'
import DialogNotification from '@/components/customAler/dialogNotification/DialogNotification'
import * as ImagePicker from 'react-native-image-picker'

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 500

const IMAGES = {
    imgae1: '1',
    image2: '2',
    image3: '3',
    image4: '4',
    image5: '5',
}

interface UploadImages {
    id: number
    uri: any
}

const CreatePlaceScreen = () => {
    const navigation = useNavigation<AppScreenNavigationType<"CreatePlace">>()
    const navigateToCreatedPlacesScreen = () => {
        navigation.navigate("CreatedPlaces")
    }

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [showTakeImage, setShowTakeImage] = useState(false)
    const [dialogNotification, setDialogNotification] = useState<{ displayMsg: string, isShow: boolean }>({ displayMsg: '', isShow: false })

    const [imageUploads, setImageUploads] = useState<UploadImages[]>([
        { id: 0, uri: '' },
        { id: 1, uri: '' },
        { id: 2, uri: '' },
        { id: 3, uri: '' },
        { id: 4, uri: '' },
    ])
    const [idImage, setIdImage] = useState(-1)

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
                    setDialogNotification({ displayMsg: 'User cancelled camera', isShow: true })
                } else if (response.errorCode) {
                    setDialogNotification({ displayMsg: response.errorMessage ? response.errorMessage : 'Camera Error', isShow: true })
                } else {
                    let imageUri = response.assets?.[0]?.uri;
                    setImageUploads((prevUploads) =>
                        prevUploads.map((upload) =>
                            upload.id === idImage ? { ...upload, uri: imageUri } : upload
                        )
                    );

                    console.log(response.assets)
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

                        // const newData: UploadImages[] = response.assets?.map((asset, index) => {
                        //     return { id: index, uri: asset.uri ? asset.uri : '' }
                        // }) || []
                        // setImageUploads(newData)

                        // const newImageUplaods = imageUplaods
                        // newImageUplaods[idImage].uri = imageUri
                        // setImageUplaods(newImageUplaods)
                        console.log(idImage + ' -- idImage: ' + imageUploads[idImage].uri)
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
                        console.log(response.assets?.length)
                        let isFind = false
                        response.assets?.map((asset) => {
                            isFind = false
                            setImageUploads((prevUploads) => {
                                return (
                                    prevUploads.map((upload) => {
                                        if (!isFind && upload.uri === '') {
                                            isFind = true
                                            return { ...upload, uri: asset.uri }
                                        } else
                                            return upload
                                    }
                                    ))
                            })

                            // const newData: UploadImages[] = response.assets?.map((asset, index) => {
                            //     return { id: index, uri: asset.uri ? asset.uri : '' }
                            // }) || []
                            // setImageUploads(newData)
                        })
                        // sendBackend
                    }
                });
            }
        }
    }

    const handleActionRemove = () => {
        setImageUploads((prevUploads) =>
            prevUploads.map((upload) =>
                upload.id === idImage ? { ...upload, uri: '' } : upload
            )
        );
        // setImage('')
    }

    const hanleButtonOKDialogError = () => {
        setDialogNotification({ displayMsg: '', isShow: false });
    }

    const handleActionAddImage = (id: number, isShow: boolean) => {
        // console.log('-- idImage: ' + idImage + ' id: ' + id)
        setIdImage(id)
        setShowTakeImage(isShow)
        // console.log('-- idImage: ' + idImage)
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
                <ScrollView style={{ marginBottom: isKeyboardVisible ? 5 : 135 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerItem}>
                            <Icons name='createDestination' />
                            <Text style={styles.headerText}>Create destination</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.headerItem}
                            onPress={navigateToCreatedPlacesScreen}
                            activeOpacity={0.85}>
                            <Icons name='list' />
                            <Text style={styles.headerText}>List</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewInputDestination}>
                        <TextInput placeholder='Destination name' style={[theme.textVariants.textBase, styles.inputDestination]} />
                    </View>
                    <View style={[styles.destinationDescription]}>
                        <TextInput
                            style={[theme.textVariants.textBase, styles.inputDestination]}
                            placeholder='Destination name'
                            multiline={true}
                            numberOfLines={8}
                        />
                    </View>

                    <View style={styles.viewInputDestination}>
                        <TextInput placeholder='Latitude' style={[theme.textVariants.textBase, styles.inputDestination]} />
                    </View>

                    <View style={styles.viewInputDestination}>
                        <TextInput placeholder='Longitude' style={[theme.textVariants.textBase, styles.inputDestination]} />
                    </View>

                    <View style={styles.containerFooter}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.btnAdd}
                            onPress={() => {
                                setIdImage(-1)
                                setShowTakeImage(true)
                            }}>
                            <Icons name='add' />
                        </TouchableOpacity>
                        {/* {imageUploads.map((imageUpload, index) => (
                            <View key={index} style={{ width: 100, height: 100 }}>
                                <ImageUpload
                                    image={imageUpload.uri}
                                    onHandleShowTakeImage={() => {
                                        setIdImage(index)
                                        setShowTakeImage(true)
                                    }}
                                />
                            </View>
                        ))} */}
                        <View style={{ width: 100, height: 100 }}>
                            <ImageUpload
                                // id={0}
                                image={imageUploads[0].uri}
                                onHandleShowTakeImage={() => {
                                    setIdImage(0)
                                    setShowTakeImage(true)
                                }}
                            />
                        </View>
                        <View style={{ width: 100, height: 100 }}>
                            <ImageUpload
                                // id={1}
                                image={imageUploads[1].uri}
                                onHandleShowTakeImage={() => {
                                    setIdImage(1)
                                    setShowTakeImage(true)
                                }}
                            />
                        </View>
                    </View>
                        <View style={{ width: 100, height: 100 }}>
                            <ImageUpload
                                // id={2}
                                image={imageUploads[2].uri}
                                onHandleShowTakeImage={() => {
                                    setIdImage(2)
                                    setShowTakeImage(true)
                                }}
                            />
                        </View>
                        <View style={{ width: 100, height: 100 }}>
                            <ImageUpload
                                // id={3}
                                image={imageUploads[3].uri}
                                onHandleShowTakeImage={() => {
                                    setIdImage(3)
                                    setShowTakeImage(true)
                                }}
                            />
                        </View>
                        <View style={{ width: 100, height: 100 }}>
                            <ImageUpload
                                // id={4}
                                image={imageUploads[4].uri}
                                onHandleShowTakeImage={() => {
                                    setIdImage(4)
                                    setShowTakeImage(true)
                                }}
                            />
                        </View>
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    )
}

export default CreatePlaceScreen