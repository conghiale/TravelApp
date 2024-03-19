import theme, { Box, Text } from '@/utils/theme';
import React, { useEffect, useRef, useState } from 'react';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import { Search } from '@/components';
import styles from './places.style';
import Icons from '@/components/shared/icon';
import {
  Keyboard,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import FlatlistHorizontal from '@/components/flatList/flasListPlacesHorizontal/FlatlistPlaceHorizontal';
import FlatListPlaceVertical from '@/components/flatList/flatListPlaceVertical/FlatListPlaceVertical';
import LabelScreen from '@/components/labelScreen/LabelScreen';
import Button01 from '@/components/button/button01/Button01';
import {
  getDestinationPublic,
  getDestinationTypes,
  getNearDestination,
  getTopDestination,
} from '@/services/destination-service';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import { labelEn, labelVi } from '@/utils/label';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from '@/components/dialog-handle-event';
import {
  defaultDialog,
  formatDestination,
  getErrorMessage,
  getItemPagination,
  isShowBtnPagination,
  isShowMoreUtil,
} from '@/utils';
import { useFocusEffect } from '@react-navigation/native';
import { languageConstant, themeConstant } from '@/API/src/utils/constant';
import { DarkMode, LightMode } from '@/utils/mode';

type FilterProps = 'all' | 'search' | 'type';

const OutstandingPlacesScreen = () => {
  const { user, updateUser } = useUserGlobalStore();
  const bilingual = user?.language === languageConstant.VI ? labelVi : labelEn;
  const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;
  const [loading, setLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isShowDialogFilter, setShowDialogFilter] = useState(false);

  const [types, setTypes] = useState<TypesFilterProps[]>([]);
  const [typesModal, setTypesModal] = useState<TypesFilterProps[]>([]);
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [topPlaces, setTopPlaces] = useState<IPlace[]>([]);
  const [nearPlaces, setNearPlaces] = useState<IPlace[]>([]);
  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState<FilterProps>('all');
  const [searchText, setSearchText] = useState('');
  const dataRender = () => {
    // console.log('filter:', filter);
    switch (filter) {
      case 'all':
        return places;
      case 'type':
        const data = places.filter(p =>
          p.types.every(idStr =>
            types
              .filter(t => t.isChoose)
              .map(t => t.dest.id)
              .includes(idStr),
          ),
        );
        // console.info('type:', data.length);
        return data;
      case 'search':
        const ds = places.filter(p =>
          p.name.toLowerCase().includes(searchText.toLowerCase()),
        );
        // console.log('search:', ds.length);
        return ds;
    }
  };
  const isShowMore = isShowMoreUtil(dataRender(), page);

  const releaseMemory = () => {
    setTypes([]);
    setTypesModal([]);
    setPlaces([]);
    setTopPlaces([]);
    setNearPlaces([]);
  };

  //call API
  const fetchOutstandingPlaces = () => {
    setLoading(true);
    Promise.all([
      getDestinationPublic().catch(e => { getErrorMessage(e); return Promise.reject(e); }),
      getTopDestination().catch(e => { getErrorMessage(e); return Promise.reject(e); }),
      getNearDestination(user?.latitude as number, user?.longitude as number).catch(e => { getErrorMessage(e); return Promise.reject(e); }),
    ]).then(([rDestPulbic, rTopDest, rNearDest]) => {
      setPlaces(rDestPulbic.data.data.map(
        (place: ApiReturnDestination) =>
          formatDestination(place, user?.language as string),
      ));

      setTopPlaces(
        rTopDest.data.data.map((place: ApiReturnDestination) =>
          formatDestination(place, user?.language as string),
        ),
      );

      setNearPlaces(
        rNearDest.data.data.map((place: ApiReturnDestination) =>
          formatDestination(place, user?.language as string),
        ),
      );
    }).catch(e => {
      getErrorMessage(e);
    }).finally(() => {
      setLoading(false);
    });
  };

  // const fetchDests = () => {
  //   getDestinationPublic().then(r => {
  //     setNearPlaces(
  //       r.data.data.map((place: ApiReturnDestination) =>
  //         formatDestination(place, user?.language as string),
  //       ),
  //     );
  //   })
  // }

  const fetchTypes = () => {
    getDestinationTypes().then(r => {
      const dataCustom: TypesFilterProps[] = r.data.data.map(
        (dtype: ApiReturnDestType) => ({
          dest: {
            id: dtype._id,
            label:
              user?.language === languageConstant.VI
                ? dtype.labelVi
                : dtype.labelEn,
          },
          isChoose: false,
        }),
      );
      setTypes(dataCustom);
      setTypesModal(dataCustom);
    })
  }

  // useEffect(() => {
  //   if (!user?.no_loading) {
  //     setLoading(true);
  //   }
  //   fetchOutstandingPlaces();
  // }, [user?.language]);

  useFocusEffect(
    React.useCallback(() => {
      // fetchDests();
      console.log(user?.no_loading, user?.data_loaded);
      if (!user?.no_loading || !user?.data_loaded) {
        fetchOutstandingPlaces();
        fetchTypes();
        updateUser({
          ...user,
          no_loading: false,
          data_loaded: true,
        });
      }

      return () => {
        // releaseMemory();
        // console.log('Screen blurred');
      };
    }, [
      user?.language,
      user?.latitude,
      user?.no_loading,
      user?.theme,
      user?.data_loaded,
    ]),
  );

  //filter data
  useEffect(() => {
    // console.info(types.filter(t => t.isChoose).length);
    if (types.filter(t => t.isChoose).length > 0) {
      setFilter('type');
    } else {
      setFilter('all');
    }
  }, [types, page]);

  // end filter data

  const handleChangeValueSearch = (value: string) => {
    setSearchText(value);
    if (value.length === 0) {
      setFilter('all');
    } else {
      setFilter('search');
    }
  };

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
      <View style={[styles.container, { backgroundColor: mode.blue1 }]}>
        <Modal
          visible={isShowDialogFilter}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowDialogFilter(false)}>
          <View style={[styles.containerModal, { backgroundColor: mode.grey2 }]}>
            <View
              style={[
                styles.containerModalDialog,
                {
                  backgroundColor: mode.blue1,
                  borderColor: mode.white,
                  shadowColor: mode.black,
                },
              ]}>
              <Text
                style={[
                  theme.textVariants.textXl,
                  styles.textTitleModal,
                  { color: mode.orange1 },
                ]}>
                {bilingual.OUTSTANDING.FILTER_LABEL}
              </Text>
              <View style={styles.bodyModal}>
                {typesModal?.map(type => (
                  <TouchableOpacity
                    key={type.dest.id}
                    activeOpacity={0.5}
                    style={[
                      styles.filter,
                      {
                        backgroundColor: type.isChoose ? mode.grey : mode.blue1,
                        borderColor: mode.grey,
                      },
                    ]}
                    onPress={() =>
                      setTypesModal(types =>
                        types?.map(typeSelected =>
                          typeSelected.dest.id === type.dest.id
                            ? { ...type, isChoose: !typeSelected.isChoose }
                            : typeSelected,
                        ),
                      )
                    }>
                    <Text
                      style={[
                        theme.textVariants.textBase,
                        styles.text,
                        { color: mode.white },
                      ]}>
                      {type.dest.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.footerModal}>
                <Button01
                  height={60}
                  label={bilingual.OUTSTANDING.FILTER_CHOOSE}
                  color={mode.orange}
                  onPress={() => {
                    setShowDialogFilter(false);
                    setTypes(typesModal);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView
          style={{ marginBottom: isKeyboardVisible ? 5 : 135 }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.containerSearch}>
            <Search
              value={searchText}
              handleChangeValueSearch={handleChangeValueSearch}
              placeholderLabel={bilingual.OUTSTANDING.FIND_PLACEHOLDER}
            />
          </View>

          <View style={styles.containerFilter}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.filter,
                {
                  backgroundColor: mode.orange,
                  marginStart: 0,
                  borderWidth: 0,
                  borderColor: mode.grey,
                },
              ]}
              onPress={() => {
                setTypesModal(types);
                setShowDialogFilter(true);
              }}>
              <Text
                style={[
                  theme.textVariants.textBase,
                  styles.text,
                  { color: mode.white },
                ]}>
                {bilingual.OUTSTANDING.FILTER_BTN}
              </Text>
            </TouchableOpacity>
            {types?.map((type, index) =>
              type.isChoose ? (
                <View
                  key={index}
                  style={[styles.filter, { borderColor: mode.grey }]}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.iconAdd}
                    onPress={() => {
                      // setFilter('type');
                      setTypes(prevType =>
                        prevType?.map(typeSelected =>
                          typeSelected.dest.id === type.dest.id
                            ? { ...type, isChoose: !type.isChoose }
                            : typeSelected,
                        ),
                      );
                    }}>
                    <Icons name="cancel" />
                  </TouchableOpacity>
                  <Text
                    style={[
                      theme.textVariants.textBase,
                      styles.text,
                      { color: mode.white },
                    ]}>
                    {type.dest.label}
                  </Text>
                </View>
              ) : null,
            )}
          </View>

          {filter === 'all' &&
            searchText.length === 0 &&
            types.filter(t => t.isChoose).length === 0 ? (
            <>
              {/* Top Places */}
              <View style={styles.title_container}>
                <LabelScreen
                  nameIcon="topPlace"
                  title={bilingual.OUTSTANDING.TOP_PLACES}
                />
              </View>
              <View style={{ marginVertical: 8 }}>
                <FlatlistHorizontal data={topPlaces} />
              </View>
              {/* Nearest Places */}
              <View style={styles.title_container}>
                <LabelScreen
                  nameIcon="places"
                  title={bilingual.OUTSTANDING.NEAREST_PLACE}
                />
              </View>
              <View style={{ marginVertical: 8 }}>
                <FlatlistHorizontal data={nearPlaces} />
              </View>
            </>
          ) : (
            <></>
          )}

          {/* Places */}
          <View style={styles.title_container}>
            <LabelScreen
              nameIcon="nearestPlace"
              title={bilingual.OUTSTANDING.HOBBY_PLACES}
            />
          </View>
          <FlatListPlaceVertical
            data={dataRender().slice(0, getItemPagination(page))}
          // onRefresh={() => setPage(prePage => prePage + 1)}
          />
          {isShowBtnPagination(dataRender()) ? (
            <View
              pointerEvents={'auto'}
              style={{ marginTop: 32, marginHorizontal: 90 }}>
              <Button01
                height={40}
                label={
                  isShowMore
                    ? bilingual.OUTSTANDING.SHOW_MORE
                    : bilingual.OUTSTANDING.COLLAPSE
                }
                color={isShowMore ? mode.green : mode.grey}
                onPress={() =>
                  isShowMore ? setPage(prePage => prePage + 1) : setPage(1)
                }
              />
            </View>
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

export default OutstandingPlacesScreen;
