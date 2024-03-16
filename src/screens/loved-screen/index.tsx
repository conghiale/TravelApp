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
import {getItemPagination, isShowBtnPagination, isShowMoreUtil} from '@/utils';
import {font} from '@/utils/font';
import { useFocusEffect } from '@react-navigation/native';

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
  const [page, setPage] = useState(1);
  const [isAsc, setIsAsc] = useState(false);

  const isShowMore = isShowMoreUtil(places, page);
  const releaseMemory = () => {
    setPlaces([]);
  }

  const fetchLoveList = () => {
    setLoading(true);
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

  useFocusEffect(
    React.useCallback(() => {
      //focused
      fetchLoveList();

      return () => {
        //blur
        releaseMemory();
      };
    }, []),
  );

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
          {places.slice(0, getItemPagination(page))?.map((place, index) => (
            <ListPlaceItem key={index} placeItem={place} onDismiss={onDimiss} />
          ))}
          {!loading && places.length === 0 ? (
            <Text
              style={{
                marginTop: '75%',
                color: theme.colors.white,
                textAlign: 'center',
                fontFamily: font.bold,
                fontSize: 20,
              }}>
              {loading ? '' : bilingual.GENERAL.NO_DATA}
            </Text>
          ) : (
            <></>
          )}

          {isShowBtnPagination(places) ? <View
            pointerEvents={'auto'}
            style={{marginTop: 32, marginHorizontal: 50}}>
            <Button01
              height={60}
              label={isShowMore ? bilingual.OUTSTANDING.SHOW_MORE : bilingual.OUTSTANDING.COLLAPSE}
              color={isShowMore ? theme.colors.green : theme.colors.grey}
              onPress={() => isShowMore ? setPage(prePage => prePage + 1) : setPage(1)}
            />
          </View> : <></>}
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

export default LovedScreen;
