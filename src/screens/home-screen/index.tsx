import theme, { Box, Text } from '@/utils/theme'
import React, { useState } from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import DialogNotification from '@/components/customAler/dialogNotification/DialogNotification'
import { Alert, Image, View } from 'react-native'
import Button01 from '@/components/button/button01/Button01'
import DialogChooseImage from '@/components/customAler/dialogChooseImage/DialogChooseImage'
import * as ImagePicker from 'react-native-image-picker';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Point, Region } from 'react-native-maps'
import { Places } from '@/assets/data'
import MyCustomMarkerView from '@/components/maps/MyCustomMarkerView'
import MyCustomCalloutView from '@/components/maps/MyCustomCalloutView'
import styles from './homeScreen.style'
import { PartialRoute, useRoute } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from '@/navigation/types'
const BASE_URL_AVATAR = process.env.BASE_URL_AVATAR;

const HomeScreen = () => {

    const routes = useRoute<any>()
    console.log('Home Screen(20): id: ' + (routes.params ? routes.params.id : '0'))

    const [region, setRegion] = useState<Region>({
        longitude: 107.35, // kinh độ
        latitude: 16.27, // vĩ độ
        latitudeDelta: 1.5,
        longitudeDelta: 1.5,
    })

    const [places, setPlaces] = useState(Places)
    const [markerSelected, setMarketSelected] = useState(false)
    const [dialogNotification, setDialogNotification] = useState<{ displayMsg: string, isShow: boolean }>({ displayMsg: '', isShow: false })


    const onRegionChange = (region: Region) => {
        setRegion(region)
    }

    const hanleButtonOKDialogError = () => {
        setDialogNotification({ displayMsg: '', isShow: false });
    }

    return (
        <SafeAreaWrapper>
            <DialogNotification
                status='error'
                displayMode='SEARCH DESTINATION'
                displayMsg={dialogNotification.displayMsg}
                visible={dialogNotification.isShow}
                onDimissAlert={hanleButtonOKDialogError}
            />
            {/* <View style={styles.containerSearch}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    // onFail={error => setDialogNotification({ 
                    //     displayMsg: error.errorMessage ? error.errorMessage : 'Cannot Find this location', 
                    //     isShow: true })}
                    onFail={error => console.log(error)}
                    
                    onNotFound={() => setDialogNotification({
                        displayMsg: 'This location was not found',
                        isShow: true
                    })}
                    query={{
                        key: GOOGLE_MAPS_API_KEY,
                        language: 'vi',
                    }}
                    currentLocation={true}
                />
            </View> */}
            <MapView provider={PROVIDER_GOOGLE} style={{ width: '100%', height: '100%' }}
                region={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                    latitudeDelta: region.latitudeDelta,
                    longitudeDelta: region.longitudeDelta,
                }}

            // onRegionChange={onRegionChange}
            >
                {places.map(place => (
                    <Marker
                        key={place.id}
                        description={place.content}
                        coordinate={{ latitude: place.latitude, longitude: place.longitude }}
                        onSelect={() => setMarketSelected(true)}

                    >
                        <MyCustomMarkerView selected={markerSelected} />
                        <Callout style={styles.callout}>
                            <MyCustomCalloutView label={place.destination} />
                        </Callout>
                    </Marker>
                ))}

            </MapView>
        </SafeAreaWrapper>
    )
}

export default HomeScreen