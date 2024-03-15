import theme, {Box, Text} from '@/utils/theme';
import React, {useEffect, useState} from 'react';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import DialogNotification from '@/components/customAler/dialogNotification/DialogNotification';
import {Alert, Image, Linking, PermissionsAndroid, View} from 'react-native';
import Button01 from '@/components/button/button01/Button01';
import DialogChooseImage from '@/components/customAler/dialogChooseImage/DialogChooseImage';
import * as ImagePicker from 'react-native-image-picker';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Point,
  Region,
} from 'react-native-maps';
import {Places} from '@/assets/data';
import MyCustomMarkerView from '@/components/maps/MyCustomMarkerView';
import MyCustomCalloutView from '@/components/maps/MyCustomCalloutView';
import styles from './homeScreen.style';
import {PartialRoute, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '@/navigation/types';
import {getDestinationPublic} from '@/services/destination-service';
import {formatDestination} from '@/utils';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import Geolocation from '@react-native-community/geolocation';

const HomeScreen = () => {
  const routes = useRoute<any>();
  console.log(
    'Home Screen(20): id: ' + (routes.params ? routes.params.id : '0'),
  );

  const [region, setRegion] = useState<Region>({
    longitude: 107.35, // kinh độ
    latitude: 16.27, // vĩ độ
    latitudeDelta: 1.5,
    longitudeDelta: 1.5,
  });

  const {user, updateUser} = useUserGlobalStore();
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [markerSelected, setMarketSelected] = useState(false);
  const [dialogNotification, setDialogNotification] = useState<{
    displayMsg: string;
    isShow: boolean;
  }>({displayMsg: '', isShow: false});

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position: Position) => {
              const {latitude, longitude} = position.coords;
              updateUser({
                ...user,
                latitude,
                longitude,
              });
              console.log('Current pos:', latitude, longitude);
            },
            (error: GeolocationError) => console.error(error),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
    console.log('requested');
  }, []);

  useEffect(() => {
    getDestinationPublic().then(r => {
      setPlaces(
        r.data.data.map((place: ApiReturnDestination) =>
          formatDestination(place, user),
        ),
      );
    });
  }, []);

  const onRegionChange = (region: Region) => {
    setRegion(region);
  };

  const hanleButtonOKDialogError = () => {
    setDialogNotification({displayMsg: '', isShow: false});
  };

  const goToGoogleMap = (lat: number, lon: number) => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
    );
  };

  return (
    <SafeAreaWrapper>
      <DialogNotification
        status="error"
        displayMode="SEARCH DESTINATION"
        displayMsg={dialogNotification.displayMsg}
        visible={dialogNotification.isShow}
        onDimissAlert={hanleButtonOKDialogError}
      />
      <MapView
        // onRegionChange={onRegionChange}
        provider={PROVIDER_GOOGLE}
        style={{width: '100%', height: '100%'}}
        region={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta,
        }}>
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{latitude: place.latitude, longitude: place.longitude}}
            onSelect={() => setMarketSelected(true)}>
            <MyCustomMarkerView selected={markerSelected} />
            <Callout
              style={styles.callout}
              onPress={() => goToGoogleMap(place.latitude, place.longitude)}>
              <MyCustomCalloutView label={place.name.trim()} />
            </Callout>
          </Marker>
        ))}
      </MapView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
