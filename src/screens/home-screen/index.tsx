import theme, { Box, Text } from '@/utils/theme'
import React, { useState } from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import DialogNotification from '@/components/customAler/dialogNotification/DialogNotification'
import { Alert, Image, View } from 'react-native'
import Button01 from '@/components/button/button01/Button01'
import DialogChooseImage from '@/components/customAler/dialogChooseImage/DialogChooseImage'
import * as ImagePicker from 'react-native-image-picker';

// interface imageForm {
//     path: string,
//     fileName: string,
// }

const HomeScreen = () => {
    const URL = 'localhost...'
    const [showDialogSuccess, setShowDialogSuccess] = useState(false)
    const [showDialogWarning, setShowDialogWarning] = useState(false)
    const [showDialogError, setShowDialogError] = useState(false)
    const [showTakeImage, setShowTakeImage] = useState(false)
    const [response, setResponse] = useState<any>(null)

    const handleActionButtonOK = () => {

    }
    const handleActionButtonCancel = () => {

    }

    const handleActionRemove = () => {

    }

    const uploadImage = async ({ type, options1, options2 }: any) => {
        if (type === 'capture') {
            // await ImagePicker.launchCamera(options, (response) => {
            //     if (response.errorCode) {
            //         Alert.alert('Error uploading image: ' + response.errorMessage)
            //     } else {
            //         saveImage(response)
            //     }
            // });
        } else {
            await ImagePicker.launchImageLibrary(options2, (response) => {
                if (response.errorCode) {
                    Alert.alert('Error uploading image: ', response.errorMessage)
                } else {
                    saveImage(response)
                    // sendToBackend
                }
            });
        }
    }

    const saveImage = async (response: any) => {
        try {
            setResponse(response)
        } catch (error) {
            throw error
        }
    }

    const sendToBackend = async () => {

        try {
            const formData = new FormData()
            formData.append('file', response)
            let res = await fetch(
                URL,
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            let responseJson = await res.json()
            console.log(responseJson)
        } catch (error) {
            throw error
        }
    }

    return (
        <SafeAreaWrapper>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 50, gap: 10 }}>
                {response?.assets && response?.assets.map(({ uri }: { uri: string }) => (
                    <View key={uri} style={{ marginVertical: 24, alignItems: 'center' }}>
                        <Image
                            style={{ width: 200, height: 200 }}
                            source={{ uri: response?.assets && response?.assets[0].uri }} />
                    </View>
                ))}

                <DialogNotification
                    status='success'
                    displayMode='SUCCESS'
                    displayMsg='Your account has been successfully registered'
                    visible={showDialogSuccess}
                    onDimissAlert={setShowDialogSuccess}
                    onHandlerActionOK={handleActionButtonOK}
                />
                <DialogNotification
                    status='warning'
                    displayMode='WARNING'
                    displayMsg='Your account has been successfully registered'
                    visible={showDialogWarning}
                    onDimissAlert={setShowDialogWarning}
                    onHandlerActionOK={handleActionButtonOK}
                    onHandlerActionCANCEL={handleActionButtonCancel}
                />
                <DialogNotification
                    status='error'
                    displayMode='ERROR'
                    displayMsg='Your account has been successfully registered'
                    visible={showDialogError}
                    onDimissAlert={setShowDialogError}
                    onHandlerActionOK={handleActionButtonOK}
                />

                <DialogChooseImage
                    visible={showTakeImage}
                    onDimissAlert={setShowTakeImage}
                    onHandlerActionCamera={uploadImage}
                    onHandlerActionGallery={uploadImage}
                    onHandlerActionRemove={handleActionRemove}
                />

                <Button01
                    height={60}
                    label='Button Success'
                    color='#05c46b'
                    onPress={() => setShowDialogSuccess(true)}
                />
                <Button01
                    height={60}
                    label='Button Warning'
                    color='#ffd32a'
                    onPress={() => setShowDialogWarning(true)}
                />
                <Button01
                    height={60}
                    label='Button Error'
                    color='#ff3f34'
                    onPress={() => setShowDialogError(true)}
                />

                <Button01
                    height={60}
                    label='Button Take Image'
                    color={theme.colors.grey}
                    onPress={() => setShowTakeImage(true)}
                />
            </View>
        </SafeAreaWrapper>
    )
}

export default HomeScreen