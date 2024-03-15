import theme, {Box, Text} from '@/utils/theme';
import React, {useEffect, useRef, useState} from 'react';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import {Search} from '@/components';
import styles from './places.style';
import Icons from '@/components/shared/icon';
import {
  Keyboard,
  Modal,
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
import Geolocation from '@react-native-community/geolocation';
import {
  getAllDestinationByRole,
  getDestinationPublic,
  getDestinationTypes,
  getNearDestination,
  getTopDestination,
} from '@/services/destination-service';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import {labelEn, labelVi} from '@/utils/label';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from '@/components/dialog-handle-event';
import {languageConstant} from '@/API/src/utils/constant';
import {formatDestination, getErrorMessage, getItemPagination} from '@/utils';

const OutstandingPlacesScreen = () => {
  const {user} = useUserGlobalStore();
  const bilingual = user?.language === 'EN' ? labelEn : labelVi;
  const [loading, setLoading] = useState<boolean>(true);
  const defaultDialog: DialogHandleEvent = {
    visible: false,
    type: 'success',
    message: '',
    handleOk: () => {},
  };
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);
  const [searchValue, setSearchValue] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [types, setTypes] = useState<TypesFilterProps[]>([]);
  const [typesModal, setTypesModal] = useState<TypesFilterProps[]>([]);

  const [isShowDialogFilter, setShowDialogFilter] = useState(false);
  const [isActionShowMore, setIsActionShowMore] = useState(false);

  const [places, setPlaces] = useState<IPlace[]>([]);
  const [topPlaces, setTopPlaces] = useState<IPlace[]>([]);
  const [nearPlaces, setNearPlaces] = useState<IPlace[]>([]);

  //call API
  useEffect(() => {
    //get dests
    getDestinationPublic().then(r => {
      const dataFetch: IPlace[] = r.data.data.map((place: ApiReturnDestination) =>
        formatDestination(place, user),
      );
      setPlaces(dataFetch);
      setDataPagination(dataFetch.slice(0, getItemPagination(page)));
    });
    // get top
    getTopDestination()
      .then(r => {
        console.log(r.data.data.length);
        setTopPlaces(
          r.data.data.map((place: ApiReturnDestination) =>
            formatDestination(place, user),
          ),
        );
      })
      .catch(e => {
        console.log('top e:', e);
      });
    // get types
    getDestinationTypes()
      .then(r => {
        const dataCustom: TypesFilterProps[] = r.data.data.map(
          (dtype: ApiReturnDestType) => ({
            dest: {
              id: dtype._id,
              label: user?.language === 'VI' ? dtype.labelVi : dtype.labelEn,
            },
            isChoose: false,
          }),
        );
        setTypes(dataCustom);
        setTypesModal(dataCustom);
      })
      .catch(e => {
        setDialog({
          visible: true,
          message: getErrorMessage(e),
          type: 'error',
          handleOk: () => setDialog(defaultDialog),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user && user.latitude && user.longitude) {
      getNearDestination(user.latitude, user.longitude)
        .then(r => {
          setNearPlaces(
            r.data.data.map((place: ApiReturnDestination) =>
              formatDestination(place, user),
            ),
          );
        })
        .catch(e => {
          console.log('near e:', e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.latitude]);

  // pagination
  const [dataPagination, setDataPagination] = useState<IPlace[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const newData: IPlace[] = places.slice(0, getItemPagination(page));
    setDataPagination(newData);
  }, [page]);

  useEffect(() => {
    if (places.length > dataPagination.length) setIsActionShowMore(true);
    else setIsActionShowMore(false);
  }, [dataPagination]);

  const handleChangeValueSearch = (value: string) => {
    setSearchValue(value);
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
        color={theme.colors.orange1}
        animation={'fade'}
      />
      <Dialog
        isVisible={dialog.visible}
        message={dialog.message}
        type={dialog.type}
        handleOk={dialog.handleOk}
      />
      <View style={styles.container}>
        <Modal
          visible={isShowDialogFilter}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowDialogFilter(false)}>
          <View style={styles.containerModal}>
            <View style={styles.containerModalDialog}>
              <Text style={[theme.textVariants.textXl, styles.textTitleModal]}>
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
                        backgroundColor: type.isChoose
                          ? theme.colors.grey
                          : theme.colors.blue1,
                      },
                    ]}
                    onPress={() =>
                      setTypesModal(types =>
                        types?.map(typeSelected =>
                          typeSelected.dest.id === type.dest.id
                            ? {...type, isChoose: !typeSelected.isChoose}
                            : typeSelected,
                        ),
                      )
                    }>
                    <Text style={[theme.textVariants.textBase, styles.text]}>
                      {type.dest.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.footerModal}>
                <Button01
                  height={60}
                  label={bilingual.OUTSTANDING.FILTER_CHOOSE}
                  color={theme.colors.orange}
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
          style={{marginBottom: isKeyboardVisible ? 5 : 135}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.containerSearch}>
            <Search
              value={searchValue}
              handleChangeValueSearch={handleChangeValueSearch}
            />
          </View>

          <View style={styles.containerFilter}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.filter,
                {
                  backgroundColor: theme.colors.orange,
                  marginStart: 0,
                  borderWidth: 0,
                },
              ]}
              onPress={() => {
                setTypesModal(types);
                setShowDialogFilter(true);
              }}>
              <Text style={[theme.textVariants.textBase, styles.text]}>
                {bilingual.OUTSTANDING.FILTER_BTN}
              </Text>
            </TouchableOpacity>
            {types?.map(type =>
              type.isChoose ? (
                <View key={type.dest.id} style={styles.filter}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.iconAdd}
                    onPress={() => {
                      setTypes(prevType =>
                        prevType?.map(typeSelected =>
                          typeSelected.dest.id === type.dest.id
                            ? {...type, isChoose: !type.isChoose}
                            : typeSelected,
                        ),
                      );
                    }}>
                    <Icons name="cancel" />
                  </TouchableOpacity>
                  <Text style={[theme.textVariants.textBase, styles.text]}>
                    {type.dest.label}
                  </Text>
                </View>
              ) : null,
            )}
          </View>

          {/* Top Places */}
          <View style={styles.title_container}>
            <LabelScreen
              nameIcon="topPlace"
              title={bilingual.OUTSTANDING.TOP_PLACES}
            />
          </View>
          <View style={{marginVertical: 8}}>
            <FlatlistHorizontal data={topPlaces} />
          </View>

          {/* Nearest Places */}
          <View style={styles.title_container}>
            <LabelScreen
              nameIcon="places"
              title={bilingual.OUTSTANDING.NEAREST_PLACE}
            />
          </View>
          <FlatlistHorizontal data={nearPlaces} />

          {/* Places */}
          <View style={styles.title_container}>
            <LabelScreen
              nameIcon="nearestPlace"
              title={bilingual.OUTSTANDING.HOBBY_PLACES}
            />
          </View>
          <FlatListPlaceVertical
            data={dataPagination}
            // onRefresh={() => setPage(prePage => prePage + 1)}
          />

          <View
            pointerEvents={isActionShowMore ? 'auto' : 'none'}
            style={{marginTop: 32, marginHorizontal: 50}}>
            <Button01
              height={60}
              label={bilingual.OUTSTANDING.SHOW_MORE}
              color={isActionShowMore ? theme.colors.orange : theme.colors.grey}
              onPress={() => setPage(prePage => prePage + 1)}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

export default OutstandingPlacesScreen;
