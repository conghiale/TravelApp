import theme, { Box, Text } from '@/utils/theme'
import React, { useState } from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import DialogNotification from '@/components/customAler/dialogNotification/DialogNotification'
import { Alert, Image, View } from 'react-native'
import Button01 from '@/components/button/button01/Button01'
import DialogChooseImage from '@/components/customAler/dialogChooseImage/DialogChooseImage'
import * as ImagePicker from 'react-native-image-picker';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
const BASE_URL_AVATAR = process.env.BASE_URL_AVATAR;

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
            <MapView style={{ width: '100%', height: '100%' }}
                initialRegion={{
                    latitude: 15.0583,
                    longitude: 106.2772,
                    latitudeDelta: 10,
                    longitudeDelta: 10,
                }}
                >
                <Marker
                    coordinate={{ latitude: 21.03700002, longitude: 105.8354464 }}
                    title="Quảng trường Ba Đình - Lăng Bác"
                />
            </MapView>
        </SafeAreaWrapper>
    )
}

export default HomeScreen