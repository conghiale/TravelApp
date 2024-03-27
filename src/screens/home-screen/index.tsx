import React, {useEffect, useState} from 'react';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import {Linking, PermissionsAndroid, Text} from 'react-native';
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
import {
  getDestinationById,
  getDestinationPublic,
  getNearDestination,
} from '@/services/destination-service';
import {
  defaultDialog,
  formatDestination,
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

// Notification

import CreateNotification from '../../../CreateNotification';
import {getWaitingDestination} from '@/services/destination-service';
import {useNavigation} from '@react-navigation/native';
import {AppScreenNavigationType} from '@/navigation/types';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  DisplayedNotification,
  EventType,
} from '@notifee/react-native';
import {
  createApprovePlace,
  getAllApprovePlace,
  updateUsersByDestinationId,
} from '@/services/approve-place-service';
import {IApprovePlace, IDestination} from '@/API/src/types';

const HomeScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<AppScreenNavigationType<'General'>>();

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
  // const [approvePlace, setApprovePlace] = useState<IApprovePlace[]>([]);
  let approvePlaces: IApprovePlace[] = [];

  const genMarker = (
    latitude: number,
    longitude: number,
    name = 'You',
  ): IPlace => {
    return {
      latitude,
      longitude,
      name,
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
        // requestLocationPermission(r.data.data);
      })
      .catch(e => {
        const em = getErrorMessage(e);
        if (em.includes('jwt expired')) {
          setDialog({
            type: 'error',
            message: 'Session Expired',
            visible: true,
            handleOk: () => updateUser(null),
          });
        }
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
              data_loaded: false,
            });

            if(!route.params) {
              console.log('current');
              setRegion(region => ({
                ...region,
                latitude,
                longitude,
              }));
            }

            /*const dp: IPlace[] = data.map((place: ApiReturnDestination) =>
              formatDestinationWithSelect(place, user?.language as string),
            );
            //add user current pos
            dp.push(genMarker(latitude, longitude));

            if (!route?.params?.latitude) {
              setPlaces(dp);
              setRegion(region => ({ ...region, latitude, longitude }));
            } else {
              const { id, latitude, longitude } = route.params;
              if (id && latitude && longitude) {
                const found = dp.find(p => p.id === id);
                if (found) {
                  setPlaces(dp.map(p => ({ ...p, selected: p.id === id || p.id === 'current_position' })));
                  setRegion(region => ({
                    ...region,
                    latitude,
                    longitude,
                  }));
                }
              }
            }*/
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
      // fetchDestPublic();
      requestLocationPermission();
      if (
        route.params &&
        route.params.latitude &&
        route.params.longitude
      ) {
        setRegion(region => ({
          ...region,
          latitude: route.params.latitude,
          longitude: route.params.longitude,
        }));
      }

      return () => {
        setPlaces([]);
      };
    }, [
      user?.language,
      // user?.latitude,
      // user?.longitude,
      user?.no_loading,
      user?.theme,
      user?.data_loaded,
      user?.destId,
      route.params,
    ]),
  );

  // const handleRegionChange = (region: Region) => {
  //   setRegion(region);
  // };

  const goToGoogleMap = (lat: number, lon: number) => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
    );
  };

  const fetchNeighbor = (newRegion: Region) => {
    // console.log('fetch neighbors');
    getNearDestination(newRegion.latitude, newRegion.longitude).then(r => {
      let assigned: IPlace[] = r.data.data.map((place: ApiReturnDestination) =>
        formatDestinationWithSelect(
          place,
          user?.language as string,
          route.params && route.params.id ? route.params.id : '',
        ),
      );
      if (user?.latitude && user.longitude) {
        assigned.push(genMarker(user?.latitude, user?.longitude));
      }
      setPlaces(assigned);
    });
  };

  const handleRegionChangeComplete = (newRegion: Region) => {
    // console.log(newRegion);
    fetchNeighbor(newRegion);
  };

  useEffect(() => {
    getAllApprovePlace().then(async r => {
      const dataApprovePlace: IApprovePlace[] = r.data.data;
      approvePlaces = dataApprovePlace;

      getWaitingDestination()
        .then(async r => {
          const destinations: [ApiReturnDestination] = r.data.data;

          if (destinations.length > 0) {
            // const notifications: DisplayedNotification[] = await notifee.getDisplayedNotifications()
            // console.log('HOME(188): ' + notifications.filter((notification) => notification.notification.data?.id === d._id).length)

            destinations.forEach(d => {
              if (user?.role === 'ADMIN') {
                if (
                  approvePlaces.length === 0 || // approve có data không
                  approvePlaces.filter(a => a.destinationId === d._id)
                    .length === 0
                ) {
                  // approve có dest này không

                  CreateNotification(
                    d._id,
                    1,
                    'APPROVE PLACES',
                    `Tourist destination ${d.nameEn} just created by user. Awaiting approval.`,
                    d.images[0],
                  );

                  createApprovePlace([user?.id ?? ''], d._id, 1)
                    .then(r => {
                      console.log('HOME(211): createApprovePlace successfully');
                    })
                    .catch(err => {
                      console.log(
                        'HOME(214): createApprovePlace failed: ' + err,
                      );
                    });
                } else if (
                  approvePlaces.filter(
                    a =>
                      a.destinationId === d._id &&
                      a.userId.includes(user?.id ?? ''),
                  ).length === 0
                ) {
                  CreateNotification(
                    d._id,
                    d.status,
                    'APPROVE PLACES',
                    `Tourist destination ${d.nameEn} just created by user. Awaiting approval.`,
                    d.images[0],
                  );

                  updateUsersByDestinationId(d._id, user?.id ?? '')
                    .then(() => {
                      console.log(
                        'Home(228): UpdateUsersByDestination successfully updated',
                      );
                    })
                    .catch(err => {
                      console.log(
                        'Home(231): UpdateUsersByDestination error: ' + err,
                      );
                    });
                }
              }
            });
          }
        })
        .catch(e => {
          console.info(getErrorMessage(e));
        });

      if (user?.role === 'USER') {
        approvePlaces.forEach(a => {
          if (
            approvePlaces.filter(a => a.userId.includes(user?.id ?? ''))
              .length === 0
          ) {
            getDestinationById(a.destinationId).then(res => {
              const destination: ApiReturnDestination = res.data.data;

              switch (a.status) {
                case 2:
                  if (user?.email === destination.createdBy) {
                    CreateNotification(
                      a.destinationId,
                      a.status,
                      'RESPONE APPROVE PLACES',
                      `This tourist destination ${destination.nameEn} has been rejected by Admin. Click on view to see the reason for the response.`,
                      destination.images[0],
                    );

                    updateUsersByDestinationId(a.destinationId, user?.id ?? '')
                      .then(() => {
                        console.log(
                          'Home(263): UpdateUsersByDestination successfully updated',
                        );
                      })
                      .catch(err => {
                        console.log(
                          'Home(266): UpdateUsersByDestination error: ' + err,
                        );
                      });
                  }
                  break;

                case 3:
                  CreateNotification(
                    a.destinationId,
                    a.status,
                    'RESPONE APPROVE PLACES',
                    `Tourist destination ${destination.nameEn} just created. Click view to display details of this location`,
                    destination.images[0],
                  );

                  updateUsersByDestinationId(a.destinationId, user?.id ?? '')
                    .then(() => {
                      console.log(
                        'Home(282): UpdateUsersByDestination successfully updated',
                      );
                    })
                    .catch(err => {
                      console.log(
                        'Home(285): UpdateUsersByDestination error: ' + err,
                      );
                    });
                  break;
              }
            });
          }
        });
      }
    });

    return notifee.onForegroundEvent(async ({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('HOME(299): Notification dismissed by user');
          break;
        case EventType.PRESS:
          console.log('HOME(302): Notification clicked by user');
          if (user?.role === 'ADMIN') navigation.navigate('ApprovePlaces');
          else if (
            detail.notification?.data?.status === 1 ||
            detail.notification?.data?.status === 2
          )
            navigation.navigate('CreatedPlaces');
          else if (detail.notification?.data?.status === 3)
            navigation.navigate('DetailPlace', {
              id: detail.notification?.data?.id,
            });
          break;
        case EventType.ACTION_PRESS:
          if (detail.pressAction?.id === 'close') {
            // notifee.cancelNotification(detail.notification?.id ?? '')
            console.log('HOME(313): PRESSED ACTION CLOSE');
          } else if (detail.pressAction?.id === 'view') {
            if (user?.role === 'ADMIN') navigation.navigate('ApprovePlaces');
            else if (
              detail.notification?.data?.status === 1 ||
              detail.notification?.data?.status === 2
            )
              navigation.navigate('CreatedPlaces');
            else if (detail.notification?.data?.status === 3)
              navigation.navigate('DetailPlace', {
                id: detail.notification?.data?.id,
              });
          }
          break;
      }
    });
  }, []);

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
        // onRegionChange={handleRegionChange}
        onRegionChangeComplete={handleRegionChangeComplete}
        provider={PROVIDER_GOOGLE}
        style={{width: '100%', height: '100%'}}
        region={region}>
        {places.map((place, index) => (
          <Marker
            key={index}
            // title={place.name}
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
              <MyCustomCalloutView label={place.name?.trim()} />
            </Callout>
          </Marker>
        ))}
      </MapView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
