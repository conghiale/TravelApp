import theme from '@/utils/theme';
import React, {useState} from 'react';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import {Linking, PermissionsAndroid} from 'react-native';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import MyCustomMarkerView from '@/components/maps/MyCustomMarkerView';
import MyCustomCalloutView from '@/components/maps/MyCustomCalloutView';
import styles from './homeScreen.style';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {getDestinationPublic} from '@/services/destination-service';
import {defaultDialog, formatDestination, getErrorMessage} from '@/utils';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import Geolocation from '@react-native-community/geolocation';
import {labelEn, labelVi} from '@/utils/label';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from '@/components/dialog-handle-event';

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
  const bilingual = user?.language === 'EN' ? labelEn : labelVi;
  const [loading, setLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [markerSelected, setMarketSelected] = useState(false);

  const releaseMemory = () => {
    setPlaces([]);
  };

  const fetchDestPublic = () => {
    setLoading(true);
    getDestinationPublic()
      .then(r => {
        setPlaces(
          r.data.data.map((place: ApiReturnDestination) =>
            formatDestination(place, user),
          ),
        );
      })
      .catch(e => {
        console.log(getErrorMessage(e));
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
            console.info('Got current pos:', latitude, longitude);
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

  useFocusEffect(
    React.useCallback(() => {
      console.log('Screen focused');
      requestLocationPermission();
      fetchDestPublic();
      return () => {
        releaseMemory();
        console.log('Screen blurred');
      };
    }, []),
  );

  const onRegionChange = (region: Region) => {
    setRegion(region);
  };

  const hanleButtonOKDialogError = () => {
    setDialog(defaultDialog);
  };

  const goToGoogleMap = (lat: number, lon: number) => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
    );
  };

  return (
    <SafeAreaWrapper>
      <Spinner
        size={'large'}
        visible={loading}
        color={theme.colors.orange1}
        animation={'fade'}
      />
      <Dialog
        isVisible={dialog.visible}
        message={dialog.message}
        type={dialog.type}
        handleOk={dialog.handleOk}
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
