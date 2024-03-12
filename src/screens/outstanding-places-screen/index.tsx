import theme, {Box, Text} from '@/utils/theme';
import React, {useEffect, useRef, useState} from 'react';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import {Search} from '@/components';
import styles from './places.style';
import Icons from '@/components/shared/icon';
import {
  Animated,
  FlatList,
  Image,
  Keyboard,
  Modal,
  PermissionsAndroid,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Place from '@/components/place/Place';
import {DestTypes, NearestPlaces, Places, TopPlaces} from '@/assets/data';
import Pagination from '@/components/Pagination';
import FlatlistHorizontal from '@/components/flatList/flasListPlacesHorizontal/FlatlistPlaceHorizontal';
import FlatListPlaceVertical from '@/components/flatList/flatListPlaceVertical/FlatListPlaceVertical';
import LabelScreen from '@/components/labelScreen/LabelScreen';
import Button01 from '@/components/button/button01/Button01';
// import Geolocation from '@react-native-community/geolocation';

const OutstandingPlacesScreen = () => {
    const [searchValue, setSearchValue] = useState('')
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [types, setTypes] = useState<TypesFilterProps[]>()
    const [typesChoose, setTypesChoose] = useState<TypesFilterProps[]>()
    const [isShowDialogFilter, setShowDialogFilter] = useState(false)
    const [isActionShowMore, setIsActionShowMore] = useState(false)


    // pagination 
    const [data, setData] = useState<PlaceProps[]>()
    const [page, setPage] = useState(0)

    useEffect(() => {
        const maxPlaces = 5 + 5 * page
        const newData: PlaceProps[] = Places.slice(0, maxPlaces)
        setData(newData)
    }, [page])

    useEffect(() => {
        if (data?.length === Places.length)
            setIsActionShowMore(true)
        else
            setIsActionShowMore(false)
    }, [data])

    const handleChangeValueSearch = (value: string) => {
        setSearchValue(value)
    }

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

    useEffect(() => {
        let dataTypes: TypesFilterProps[] = []
        DestTypes.map((destType) => (
            dataTypes.push({ type: destType, isChoose: false })
        ))
        setTypes(dataTypes)
        setTypesChoose(dataTypes)
    }, [])

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>
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
                    <View style={styles.containerSearch}>
                        <Search value={searchValue} handleChangeValueSearch={handleChangeValueSearch} />
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
                            <Text style={[theme.textVariants.textBase, styles.text]}>Filter</Text>
                        </TouchableOpacity>
                        {types?.map(type => (
                            type.isChoose ? (
                                <View key={type.type.id} style={styles.filter}>
                                    <TouchableOpacity
                                        activeOpacity={0.85}
                                        style={styles.iconAdd}
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

                    {/* Top Places */}
                    <View style={styles.title_container}>
                        <LabelScreen nameIcon='topPlace' title='Top Places' />
                    </View>
                    <View style={{ marginVertical: 8 }}>
                        <FlatlistHorizontal data={TopPlaces} />
                    </View>

                    {/* Nearest Places */}
                    <View style={styles.title_container}>
                        <LabelScreen nameIcon='nearestPlace' title='Nearest Places' />
                    </View>
                    <FlatlistHorizontal data={NearestPlaces} />

                    {/* Places */}
                    <View style={styles.title_container}>
                        <LabelScreen nameIcon='places' title='Places' />
                    </View>
                    <FlatListPlaceVertical
                        data={data ? data : []}
                    // onRefresh={() => setPage(prePage => prePage + 1)}
                    />

                    <View
                        pointerEvents={isActionShowMore ? 'none' : 'auto'}
                        style={{ marginTop: 32, marginHorizontal: 50 }}>
                        <Button01
                            height={60}
                            label='Show more'
                            color={isActionShowMore ? theme.colors.grey : theme.colors.orange}
                            onPress={() => setPage(prePage => prePage + 1)}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    )
}

// interface Coordinates {
//   latitude: number;
//   longitude: number;
// }

// interface Position {
//   coords: Coordinates;
// }

// interface GeolocationError {
//   code: number;
//   message: string;
// }

// const OutstandingPlacesScreen = () => {
//   const [searchValue, setSearchValue] = useState('');
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);
//   const [types, setTypes] = useState<TypesFilterProps[]>();
//   const [typesChoose, setTypesChoose] = useState<TypesFilterProps[]>();
//   const [isShowDialogFilter, setShowDialogFilter] = useState(false);
//   const [location, setLocation] = useState<Coordinates | null>(null);

//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location.',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           Geolocation.getCurrentPosition(
//             (position: Position) => {
//               const {latitude, longitude} = position.coords;
//               console.log(latitude, longitude);
//               setLocation({latitude, longitude});
//             },
//             (error: GeolocationError) => console.error(error),
//             {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
//           );
//         } else {
//           console.log('Location permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     };

//     requestLocationPermission();
//     console.log('requested');
//   }, []);

//   // pagination
//   const [data, setData] = useState<PlaceProps[]>();
//   const [page, setPage] = useState(0);

//   useEffect(() => {
//     const maxPlaces = 5 + 5 * page;
//     const newData: PlaceProps[] = Places.slice(0, maxPlaces);
//     setData(newData);
//   }, [page]);

//   const handleChangeValueSearch = (value: string) => {
//     setSearchValue(value);
//   };

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       () => {
//         setKeyboardVisible(true);
//       },
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => {
//         setKeyboardVisible(false);
//       },
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   useEffect(() => {
//     let dataTypes: TypesFilterProps[] = [];
//     DestTypes.map(destType =>
//       dataTypes.push({type: destType, isChoose: false}),
//     );
//     setTypes(dataTypes);
//     setTypesChoose(dataTypes);
//   }, []);

//   return (
//     <SafeAreaWrapper>
//       <View style={{justifyContent: 'center', alignItems: 'center'}}>
//         {location ? (
//           <>
//             <Text>Latitude: {location.latitude}</Text>
//             <Text>Longitude: {location.longitude}</Text>
//           </>
//         ) : (
//           <Text>Loading...</Text>
//         )}
//       </View>

//       <View style={styles.container}>
//         <Modal
//           visible={isShowDialogFilter}
//           animationType="fade"
//           transparent={true}
//           onRequestClose={() => setShowDialogFilter(false)}>
//           <View style={styles.containerModal}>
//             <View style={styles.containerModalDialog}>
//               <Text style={[theme.textVariants.textXl, styles.textTitleModal]}>
//                 Select the type of place you want to search
//               </Text>

//               <View style={styles.bodyModal}>
//                 {typesChoose?.map(type => (
//                   <TouchableOpacity
//                     key={type.type.id}
//                     activeOpacity={0.5}
//                     style={[
//                       styles.filter,
//                       {
//                         backgroundColor: type.isChoose
//                           ? theme.colors.grey
//                           : theme.colors.blue1,
//                       },
//                     ]}
//                     onPress={() =>
//                       setTypesChoose(types =>
//                         types?.map(typeSelected =>
//                           typeSelected.type.id === type.type.id
//                             ? {...type, isChoose: !typeSelected.isChoose}
//                             : typeSelected,
//                         ),
//                       )
//                     }>
//                     <Text style={[theme.textVariants.textBase, styles.text]}>
//                       {type.type.typeName}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>

//               <View style={styles.footerModal}>
//                 <Button01
//                   height={60}
//                   label="Choose"
//                   color={theme.colors.orange}
//                   onPress={() => {
//                     setShowDialogFilter(false);
//                     setTypes(typesChoose);
//                   }}
//                 />
//               </View>
//             </View>
//           </View>
//         </Modal>
//         <ScrollView
//           style={{marginBottom: isKeyboardVisible ? 5 : 135}}
//           showsVerticalScrollIndicator={false}>
//           <View style={styles.containerSearch}>
//             <Search
//               value={searchValue}
//               handleChangeValueSearch={handleChangeValueSearch}
//             />
//           </View>

//           <View style={styles.containerFilter}>
//             <TouchableOpacity
//               activeOpacity={0.85}
//               style={[
//                 styles.filter,
//                 {
//                   backgroundColor: theme.colors.orange,
//                   marginStart: 0,
//                   borderWidth: 0,
//                 },
//               ]}
//               onPress={() => {
//                 setTypesChoose(types);
//                 setShowDialogFilter(true);
//               }}>
//               <Text style={[theme.textVariants.textBase, styles.text]}>
//                 Filter
//               </Text>
//             </TouchableOpacity>
//             {types?.map(type =>
//               type.isChoose ? (
//                 <View key={type.type.id} style={styles.filter}>
//                   <TouchableOpacity
//                     activeOpacity={0.85}
//                     style={styles.iconAdd}
//                     onPress={() => {
//                       setTypes(prevType =>
//                         prevType?.map(typeSelected =>
//                           typeSelected.type.id === type.type.id
//                             ? {...type, isChoose: !type.isChoose}
//                             : typeSelected,
//                         ),
//                       );
//                     }}>
//                     <Icons name="cancel" />
//                   </TouchableOpacity>
//                   <Text style={[theme.textVariants.textBase, styles.text]}>
//                     {type.type.typeName}
//                   </Text>
//                 </View>
//               ) : null,
//             )}
//           </View>

//           {/* Top Places */}
//           <View style={styles.title_container}>
//             <LabelScreen nameIcon="topPlace" title="Top Places" />
//           </View>
//           <View style={{marginVertical: 8}}>
//             <FlatlistHorizontal data={TopPlaces} />
//           </View>

//           {/* Nearest Places */}
//           <View style={styles.title_container}>
//             <LabelScreen nameIcon="nearestPlace" title="Nearest Places" />
//           </View>
//           <FlatlistHorizontal data={NearestPlaces} />

//           {/* Places */}
//           <View style={styles.title_container}>
//             <LabelScreen nameIcon="places" title="Places" />
//           </View>
//           <FlatListPlaceVertical
//             data={data ? data : []}
//             // onRefresh={() => setPage(prePage => prePage + 1)}
//           />

//           <View style={{marginTop: 32, marginHorizontal: 50}}>
//             <Button01
//               height={60}
//               label="Show more"
//               onPress={() => setPage(prePage => prePage + 1)}
//             />
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaWrapper>
//   );
// };

export default OutstandingPlacesScreen;
