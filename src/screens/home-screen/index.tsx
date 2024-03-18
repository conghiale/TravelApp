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
import {
  defaultDialog,
  formatDestinationWithSelect,
  getErrorMessage,
} from '@/utils';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import Geolocation from '@react-native-community/geolocation';
import {labelEn, labelVi} from '@/utils/label';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from '@/components/dialog-handle-event';
import {languageConstant, themeConstant} from '@/API/src/utils/constant';
import {DarkMode, LightMode} from '@/utils/mode';

const HomeScreen = () => {
  const route = useRoute<any>();
  // console.log('Home Screen(20):', route.params ? route.params.id : '0');
  const initRegion: Region = {
    latitude: 16.27,
    longitude: 107.35,
    latitudeDelta: 1.5,
    longitudeDelta: 1.5,
  };

  const [region, setRegion] = useState<Region>(initRegion);

  const {user, updateUser} = useUserGlobalStore();
  const bilingual = user?.language === languageConstant.VI ? labelVi : labelEn;
  const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;
  const [loading, setLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);
  const [places, setPlaces] = useState<IPlace[]>([]);

  const genMarker = (latitude: number, longitude: number): IPlace => {
    return {
      latitude,
      longitude,
      name: 'You',
      selected: true,
      description: 'abc',
      id: 'current_position',
      images: [],
      types: [],
      vote: 0,
    };
  };

  const fetchDestPublic = () => {
    setLoading(true);
    getDestinationPublic()
      .then(r => {
        setPlaces(
          r.data.data.map((place: ApiReturnDestination) =>
            formatDestinationWithSelect(place, user?.language as string),
          ),
        );
        requestLocationPermission(r.data.data);
      })
      .catch(e => {
        getErrorMessage(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const requestLocationPermission = async (data: any) => {
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
              data_loaded: false,
            });

            const dp: IPlace[] = data.map((place: ApiReturnDestination) =>
              formatDestinationWithSelect(place, user?.language as string),
            );
            //add user current pos
            dp.push(genMarker(latitude, longitude));

            if (!route?.params?.latitude) {
              setPlaces(dp);
              setRegion(region => ({...region, latitude, longitude}));
            } else {
              const {id, latitude, longitude} = route.params;
              if (id && latitude && longitude) {
                const found = dp.find(p => p.id === id);
                if (found) {
                  setPlaces(dp.map(p => ({...p, selected: p.id === id || p.id === 'current_position'})));
                  setRegion(region => ({
                    ...region,
                    latitude,
                    longitude,
                  }));
                }
              }
            }
            console.info('Got current pos:', latitude, longitude);
          },
          (error: GeolocationError) => console.info(error),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.info(err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchDestPublic();

      return () => {
        setPlaces([]);
      };
    }, [
      user?.language,
      user?.latitude,
      user?.no_loading,
      user?.theme,
      user?.data_loaded,
      user?.longitude,
      user?.destId,
      route.params,
    ]),
  );

  // const onRegionChange = (region: Region) => {
  //   setRegion(region);
  // };

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
        color={mode.orange1}
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
        region={region}>
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{latitude: place.latitude, longitude: place.longitude}}>
            <MyCustomMarkerView selected={place.selected as boolean} />
            <Callout
              style={[
                styles.callout,
                {
                  backgroundColor: mode.white,
                  shadowColor: mode.black,
                },
              ]}
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
