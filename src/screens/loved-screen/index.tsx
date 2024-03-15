import theme from '@/utils/theme';
import React, {useCallback, useEffect, useState} from 'react';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import {ScrollView, Text, View} from 'react-native';
import {Places} from '@/assets/data';
import styles from './loved.style';
import ListPlaceItem from '@/components/listPlaceItem/ListPlaceItem';
import LabelScreen from '@/components/labelScreen/LabelScreen';
import Button01 from '@/components/button/button01/Button01';
import {getAllLoveListByUser} from '@/services/user-service';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import {labelEn, labelVi} from '@/utils/label';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from '@/components/dialog-handle-event';
import {languageConstant} from '@/API/src/utils/constant';
import {getItemPagination} from '@/utils';
import {font} from '@/utils/font';

type ApiReturn = {
  _id: string;
  userId: string;
  destinationId: string;
  createdAt: string;
  updatedAt: string;
  lovedDest: {
    nameVi: string;
    nameEn: string;
    descriptionVi: string;
    descriptionEn: string;
    latitude: number;
    longitude: number;
    types: string[];
    vote: number;
    status: number;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    images: string[];
  };
};

const LovedScreen = () => {
  console.log('Loved-Place-screen(12): ');
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
  const [places, setPlaces] = useState<IPlace[]>([]);
  // pagination
  const [dataPagination, setDataPagination] = useState<IPlace[]>([]);
  const [page, setPage] = useState(1);
  const [isActionShowMore, setIsActionShowMore] = useState(false);
  const [isAsc, setIsAsc] = useState(false);

  const loadDataByPage = () => {
    setDataPagination(places.slice(0, getItemPagination(page)));
  };

  const fetchLoveList = () => {
    getAllLoveListByUser(user?.id as string, isAsc)
      .then(r => {
        const customData: IPlace[] = r.data.data.map((d: ApiReturn) => ({
          id: d.destinationId,
          name:
            user?.language === languageConstant.VI
              ? d.lovedDest.nameVi
              : d.lovedDest.nameEn,
          description:
            user?.language === languageConstant.VI
              ? d.lovedDest.descriptionVi
              : d.lovedDest.descriptionEn,
          latitude: d.lovedDest.latitude,
          longitude: d.lovedDest.longitude,
          images: d.lovedDest.images,
          types: d.lovedDest.types,
          vote: d.lovedDest.vote,
        }));
        // console.log('custom:', customData);
        setPlaces(customData);
        setDataPagination(customData.slice(0, getItemPagination(page)));
      })
      .catch(e => {
        setDialog({
          visible: true,
          type: 'error',
          message: e.response.data.message,
          handleOk: () => setDialog(defaultDialog),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLoveList();
  }, [user]);

  useEffect(() => {
    loadDataByPage();
  }, [page]);

  useEffect(() => {
    if (dataPagination?.length === Places.length) setIsActionShowMore(true);
    else setIsActionShowMore(false);
  }, [dataPagination]);

  const onDimiss = useCallback((place: IPlace) => {
    setPlaces(places => places.filter(item => item.id !== place.id));

    // Xoa trong data base
  }, []);

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
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
        <ScrollView
          style={{marginBottom: 135, width: '100%', paddingHorizontal: 24}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.title_container}>
            <LabelScreen
              nameIcon="loved"
              title={bilingual.LOVE_LIST.TITLE_SCREEN}
            />
            <LabelScreen
              nameIcon="newest"
              title={
                isAsc
                  ? bilingual.LOVE_LIST.TOGGLE_OLDEST
                  : bilingual.LOVE_LIST.TOGGLE_NEWEST
              }
            />
          </View>

          {/* list data */}
          {dataPagination?.map((place, index) => (
            <ListPlaceItem key={index} placeItem={place} onDismiss={onDimiss} />
          ))}
          {dataPagination?.length === 0 ? (
            <Text
              style={{
                marginTop: '75%',
                color: theme.colors.white,
                textAlign: 'center',
                fontFamily: font.bold,
                fontSize: 20,
              }}>
            {loading ? "" : bilingual.GENERAL.NO_DATA}
            </Text>
          ) : (
            <></>
          )}

          {!loading && dataPagination && dataPagination.length < places.length ? (
            <View
              pointerEvents={isActionShowMore ? 'none' : 'auto'}
              style={{marginTop: 32, marginHorizontal: 50}}>
              <Button01
                height={60}
                label={bilingual.LOVE_LIST.BTN_SHOW_MORE}
                color={
                  isActionShowMore ? theme.colors.grey : theme.colors.orange
                }
                onPress={() => setPage(prePage => prePage + 1)}
              />
            </View>
          ) : (
            <></>
          )}
          {dataPagination && dataPagination.length === places.length ? (
            <View
              pointerEvents={isActionShowMore ? 'none' : 'auto'}
              style={{marginTop: 32, marginHorizontal: 50}}>
              <Button01
                height={60}
                label={bilingual.LOVE_LIST.COLLAPSE}
                color={
                  isActionShowMore ? theme.colors.grey : theme.colors.orange
                }
                onPress={() => setPage(1)}
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

export default LovedScreen;
