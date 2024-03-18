import {AppScreenNavigationType} from '@/navigation/types';
import theme from '@/utils/theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './createdPlaces.style';
import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft';
import {Search} from '@/components';
import Place from '@/components/place/Place';
import {SelectList} from 'react-native-dropdown-select-list';
import {font} from '@/utils/font';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import {getAllDestinationByRole} from '@/services/destination-service';
import {labelEn, labelVi} from '@/utils/label';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from '@/components/dialog-handle-event';
import {languageConstant, statusDestinationConstant, themeConstant} from '@/API/src/utils/constant';
import {defaultDialog, getErrorMessage, getItemPagination, isShowBtnPagination, isShowMoreUtil} from '@/utils';
import Button01 from '@/components/button/button01/Button01';
import { DarkMode, LightMode } from '@/utils/mode';

type FilterProps = 'all'|'rejected'|'accepted'|'waiting'|'search';

const CreatedPlacesScreen = () => {
  const {user} = useUserGlobalStore();
  const router = useRoute<any>();
  const bilingual = user?.language === languageConstant.VI ? labelVi : labelEn;
  const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;
  const [loading, setLoading] = useState<boolean>(true);
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [page, setPage] = useState(1);

  const navigation = useNavigation<AppScreenNavigationType<'CreatedPlaces'>>();
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = React.useState('');
  const dataFilter = [
    {key: '1', value: bilingual.CREATED_PLACES.FILTER_ALL},
    {key: '2', value: bilingual.CREATED_PLACES.FILTER_ACCEPTED},
    {key: '3', value: bilingual.CREATED_PLACES.FILTER_WAITING},
    {key: '4', value: bilingual.CREATED_PLACES.FILTER_REJECTED},
  ];
  const [filter, setFilter] = useState<FilterProps>('all');

  const handleChangeValueSearch = (value: string) => {
    setSearchText(value);
    setFilter('search');
  };

  useEffect(() => {
    switch(selected) {
      case bilingual.CREATED_PLACES.FILTER_ALL:
        setFilter('all');
        break;
      case bilingual.CREATED_PLACES.FILTER_ACCEPTED:
        setFilter('accepted');
        break;
      case bilingual.CREATED_PLACES.FILTER_WAITING:
        setFilter('waiting');
        break;
      case bilingual.CREATED_PLACES.FILTER_REJECTED:
        setFilter('rejected');
        break;
    }
  }, [selected])

  const dataRender = () => {
    switch(filter) {
      case 'all':
        return places;
      case 'rejected':
        return places.filter(p => p.status === statusDestinationConstant.REJECTED);
      case 'accepted':
        return places.filter(p => p.status === statusDestinationConstant.ACCEPTED);
      case 'waiting':
        return places.filter(p => p.status === statusDestinationConstant.WAITING);
      case 'search':
        return places.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()));
    }
  }
  const isShowMore = isShowMoreUtil(dataRender(), page);

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (user && user.role) {
      getAllDestinationByRole(user.role, user.id)
        .then(r => {
          const dataCustom: IPlace[] = r.data.data.map(
            (d: ApiReturnDestination) => ({
              id: d._id,
              name:
                user?.language === languageConstant.VI ? d.nameVi : d.nameEn,
              description:
                user?.language === languageConstant.VI
                  ? d.descriptionVi
                  : d.descriptionEn,
              latitude: d.latitude,
              longitude: d.longitude,
              vote: d.vote,
              types: d.types,
              status: d.status,
              images: d.images,
            }),
          );
          // console.log(dataCustom.length);
          setPlaces(dataCustom);
        })
        .catch(e => {
          setDialog({
            visible: true,
            type: 'error',
            message: getErrorMessage(e),
            handleOk: () => setDialog(defaultDialog),
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router]);

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
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {backgroundColor: mode.blue1}]}>
          <View style={styles.containerHeader}>
            <ButtonArrowLeft onPress={goBack} />
            <View style={styles.containerTitle}>
              <Text style={[theme.textVariants.textLg, styles.title, {color: mode.orange}]}>
                {bilingual.CREATED_PLACES.SCREEN_TITLE}
              </Text>
            </View>
          </View>
          <View style={styles.containerSearch}>
            <View style={styles.search}>
              <Search
                value={searchText}
                handleChangeValueSearch={handleChangeValueSearch}
                placeholderLabel={bilingual.CREATED_PLACES.FIND_PLACEHOLDER}
              />
            </View>
            {/* <View style={styles.dropdown}>
              <LabelScreenReverse nameIcon='dropdown' title='All' />
            </View> */}
          </View>
          <View style={{width: '100%', marginTop: 16}}>
            <SelectList
              setSelected={(val: React.SetStateAction<string>) =>
                setSelected(val)
              }
              data={dataFilter}
              save="value"
              placeholder={`-- ${bilingual.CREATED_PLACES.FILTER_SEARCH_LABEL} --`}
              searchPlaceholder={`-- ${bilingual.CREATED_PLACES.FILTER_SEARCH_LABEL} --`}
              defaultOption={dataFilter[0]}
              fontFamily={font.semiBold}
              boxStyles={{borderWidth: 2, borderColor: mode.white}}
              inputStyles={{color: mode.orange, fontSize: 16}}
              dropdownStyles={{borderWidth: 2, borderColor: mode.white}}
              dropdownTextStyles={{color: mode.white, fontSize: 16}}
            />
          </View>
          <View style={styles.containerUser}>
            {dataRender().slice(0, getItemPagination(page)).map((place, index) => (
              <View key={index} style={styles.place}>
                <Place
                  id={place.id}
                  name={place.name}
                  description={place.description}
                  vote={place.vote}
                  status={place.status}
                  longitude={place.longitude}
                  latitude={place.latitude}
                  images={place.images}
                  types={place.types}
                />
              </View>
            ))}
            {!loading && dataRender().length === 0 ? (
              <Text
                style={{
                  marginTop: '50%',
                  color: mode.white,
                  textAlign: 'center',
                  fontFamily: font.bold,
                  fontSize: 20,
                }}>
                {loading ? '' : bilingual.GENERAL.NO_DATA}
              </Text>
            ) : (
              <></>
            )}
          </View>
          {isShowBtnPagination(dataRender()) ? (
            <View
              pointerEvents={'auto'}
              style={{marginHorizontal: 50, marginVertical: 24}}>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default CreatedPlacesScreen;
