import {AppScreenNavigationType, AppStackParamList} from '@/navigation/types';
import theme from '@/utils/theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Alert, ScrollView, Text, View} from 'react-native';
import styles from './detailRequest.style';
import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft';
import Button01 from '@/components/button/button01/Button01';
import FlatlistImagesHorizontal from '@/components/flatList/flasListImagesHorizontal/FlatlistImagesHorizontal';
import {useEffect, useState} from 'react';
import {
  getDestinationById,
  waitingDestinationApproval,
} from '@/services/destination-service';
import {defaultDialog, parseTimestamp} from '@/utils';
import GroupSettings from '@/components/group_settings';
import {labelEn, labelVi} from '@/utils/label';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from '@/components/dialog-handle-event';
import { languageConstant, themeConstant } from '@/API/src/utils/constant';
import { DarkMode, LightMode } from '@/utils/mode';

const DetailRequestPlaceScreen = () => {
  const route = useRoute<any>();
  const {user} = useUserGlobalStore();
  const bilingual = user?.language === languageConstant.VI ? labelVi : labelEn;
  const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;
  const [loading, setLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);

  const navigation =
    useNavigation<AppScreenNavigationType<'DetailRequestPlace'>>();
  const [isVN, setIsVN] = useState(true);
  const [place, setPlace] = useState<ApiReturnDestination>({
    _id: route.params.id,
    descriptionEn: '',
    descriptionVi: '',
    images: [],
    latitude: 0,
    longitude: 0,
    nameEn: '',
    nameVi: '',
    status: 0,
    types: [],
    vote: 0,
  });
  console.log('DetaileRequestScreen(28) - id:' + route.params.id);

  useEffect(() => {
    getDestinationById(route.params.id).then(r => {
      setPlace(r.data.data as ApiReturnDestination);
    });
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const approve = () => {
    setLoading(true);
    waitingDestinationApproval(place._id, true)
      .then(r => {
        setDialog({
          visible: true,
          type: 'success',
          message: bilingual.DETAIL_REQUEST.SUCCESS.APPROVE,
          handleOk: () => goBack(),
        });
      })
      .catch(e => {
        setDialog({
          visible: true,
          type: 'error',
          message: bilingual.DETAIL_REQUEST.ERROR.APPROVE,
          handleOk: () => setDialog(defaultDialog),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const reject = () => {
    setLoading(true);
    waitingDestinationApproval(place._id, false)
      .then(r => {
        setDialog({
          visible: true,
          type: 'success',
          message: bilingual.DETAIL_REQUEST.SUCCESS.REJECT,
          handleOk: () => goBack(),
        });
      })
      .catch(e => {
        setDialog({
          visible: true,
          type: 'error',
          message: bilingual.DETAIL_REQUEST.ERROR.REJECT,
          handleOk: () => setDialog(defaultDialog),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePressApprove = () => {
    setDialog({
      visible: true,
      type: 'warning',
      message: bilingual.DETAIL_REQUEST.CF_APPROVE,
      handleOk: () => approve(),
      handleCancel: () => setDialog(defaultDialog),
    });
  };

  const handlePressReject = () => {
    setDialog({
      visible: true,
      type: 'warning',
      message: bilingual.DETAIL_REQUEST.CF_REJECT,
      handleOk: () => reject(),
      handleCancel: () => setDialog(defaultDialog),
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: mode.blue1}}>
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
        handleCancel={dialog.handleCancel}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {backgroundColor: mode.blue1}]}>
          <View style={styles.containerHeader}>
            <ButtonArrowLeft onPress={goBack} />
            <View style={styles.containerTitle}>
              <Text
                style={[
                  theme.textVariants.textLg,
                  styles.title,
                  {color: mode.orange},
                ]}>
                {bilingual.DETAIL_REQUEST.TITLE}
              </Text>
            </View>
          </View>
          <View style={styles.containerInfo}>
            <View style={styles.containerinfoItem}>
              <Text
                style={[
                  theme.textVariants.textLg,
                  styles.textInfo,
                  {color: mode.white},
                ]}>
                {bilingual.DETAIL_REQUEST.CREATED_BY}
              </Text>
              <Text
                style={[
                  theme.textVariants.textBase,
                  styles.textInfo,
                  {color: mode.white},
                ]}>
                {place.createdBy}
              </Text>
            </View>
            <View style={styles.containerinfoItem}>
              <Text
                style={[
                  theme.textVariants.textLg,
                  styles.textInfo,
                  {color: mode.white},
                ]}>
                {bilingual.DETAIL_REQUEST.CREATED_TIME}
              </Text>
              <Text
                style={[
                  theme.textVariants.textBase,
                  styles.textInfo,
                  {color: mode.white},
                ]}>
                {parseTimestamp(place.createdAt ? place.createdAt : '')}
              </Text>
            </View>
          </View>
          <View style={styles.containerImage}>
            <FlatlistImagesHorizontal
              data={place?.images ? place.images : []}
            />
          </View>
          <View
            style={[styles.containerDestination, {flexDirection: 'column'}]}>
            <GroupSettings
              label={bilingual.PERSONAL.LANGUAGUE}
              isEnabled={!isVN}
              activeText="EN"
              inActiveText="VI"
              toggleSwitch={() => setIsVN(!isVN)}
            />
            <Text
              style={[
                theme.textVariants.textLg,
                styles.textInfo,
                {color: mode.white},
              ]}>
              {isVN ? place.nameVi : place.nameEn}
            </Text>
          </View>
          <Text
            style={[
              theme.textVariants.textBase,
              styles.content,
              {color: mode.white},
            ]}>
            {isVN ? place.descriptionVi : place.descriptionEn}
          </Text>
          <View style={styles.containerInfo}>
            <View style={styles.containerinfoItem}>
              <Text
                style={[
                  theme.textVariants.textLg,
                  styles.textInfo,
                  {color: mode.white},
                ]}>
                {bilingual.CREATE_EDIT_DEST.LAT}
              </Text>
              <Text
                style={[
                  theme.textVariants.textBase,
                  styles.textInfo,
                  {color: mode.white},
                ]}>
                {place.latitude}
              </Text>
            </View>
            <View style={styles.containerinfoItem}>
              <Text
                style={[
                  theme.textVariants.textLg,
                  styles.textInfo,
                  {color: mode.white},
                ]}>
                {bilingual.CREATE_EDIT_DEST.LON}
              </Text>
              <Text
                style={[
                  theme.textVariants.textBase,
                  styles.textInfo,
                  {color: mode.white},
                ]}>
                {place.longitude}
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={{flex: 1}}>
              <Button01
                height={60}
                label={bilingual.DETAIL_REQUEST.REJECT}
                color={mode.red1}
                onPress={handlePressReject}
              />
            </View>
            <View style={{flex: 1}}>
              <Button01
                height={60}
                label={bilingual.DETAIL_REQUEST.APPROVE}
                color={mode.green2}
                onPress={handlePressApprove}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailRequestPlaceScreen;
