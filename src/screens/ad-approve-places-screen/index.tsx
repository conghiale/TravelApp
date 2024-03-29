import {AppScreenNavigationType} from '@/navigation/types';
import theme from '@/utils/theme';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './approvePlaces.style';
import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft';
import {Search} from '@/components';
import ApprovalListItem from '@/components/approvalListIem/ApprovalListItem';
import {SelectList} from 'react-native-dropdown-select-list';
import {font} from '@/utils/font';
import {getWaitingDestination} from '@/services/destination-service';
import {
  getErrorMessage,
  getItemPagination,
  isShowBtnPagination,
  isShowMoreUtil,
} from '@/utils';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import {labelEn, labelVi} from '@/utils/label';
import Button01 from '@/components/button/button01/Button01';
import {languageConstant, themeConstant} from '@/API/src/utils/constant';
import {DarkMode, LightMode} from '@/utils/mode';
import Spinner from 'react-native-loading-spinner-overlay';

type FilterProps = 'all' | 'old_new' | 'new_old' | 'search';

const ApprovePlacesScreen = () => {
  const {user} = useUserGlobalStore();
  const bilingual = user?.language === languageConstant.VI ? labelVi : labelEn;
  const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;

  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<AppScreenNavigationType<'ApprovePlaces'>>();

  const [selected, setSelected] = React.useState('All');
  const [places, setPlaces] = useState<PlaceProps[]>([]);
  const [page, setPage] = useState(1);
  const dataFilter = [
    {key: '1', value: 'Oldest to Newest'},
    {key: '2', value: 'Newest to Oldest'},
  ];
  const [filter, setFilter] = useState<FilterProps>('all');
  const [searchText, setSearchText] = useState('');

  //filter data
  useEffect(() => {
    if (selected === 'Oldest to Newest') {
      setFilter('old_new');
    } else if (selected === 'Newest to Oldest') {
      setFilter('new_old');
    } else {
      setFilter('all');
    }
  }, [selected, page]);

  const handleChangeValueSearch = (value: string) => {
    setSearchText(value);
    setFilter('search');
  };

  const dataRender = () => {
    switch (filter) {
      case 'all':
      case 'old_new':
        return places;
      case 'new_old':
        const copyPlaces = [...places];
        return copyPlaces.reverse();
      case 'search':
        return places.filter(
          p =>
            p.nameVi.toLowerCase().includes(searchText.toLowerCase()) ||
            p.nameEn.toLowerCase().includes(searchText.toLowerCase()),
        );
    }
  };
  const isShowMore = isShowMoreUtil(dataRender(), page);
  //end filter data

  const fetchWaiting = () => {
    setLoading(true);
    getWaitingDestination()
      .then(r => {
        setPlaces(
          r.data.data.map(
            (d: ApiReturnDestination): PlaceProps => ({
              id: d._id,
              nameVi: d.nameVi,
              nameEn: d.nameEn,
              descriptionVi: d.descriptionVi,
              descriptionEn: d.descriptionEn,
              latitude: d.latitude,
              longitude: d.longitude,
              images: d.images,
              types: d.types,
              vote: d.vote,
              createdAt: d.createdAt,
            }),
          ),
        );
      })
      .catch(e => {
        console.info(getErrorMessage(e));
      })
      .finally(() => {
        setLoading(false);
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchWaiting();

      return () => {
        setPlaces([]);
      };
    }, []),
  );

  const goBack = () => {
    navigation.goBack();
  };

  const handlePress = (id: string) => {
    navigation.navigate('DetailRequestPlace', {id});
  };

  return (
    <View style={{flex: 1, backgroundColor: mode.blue1}}>
      <Spinner
        size={'large'}
        visible={loading}
        color={mode.orange1}
        animation={'fade'}
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
                {bilingual.DETAIL_REQUEST.APPROVE_LIST}
              </Text>
            </View>
          </View>
          <View style={styles.containerSearch}>
            <View style={styles.search}>
              <Search
                value={searchText}
                placeholderLabel={bilingual.OUTSTANDING.FIND_PLACEHOLDER}
                handleChangeValueSearch={handleChangeValueSearch}
              />
            </View>
          </View>

          <View style={{width: '100%', marginTop: 16}}>
            <SelectList
              setSelected={(val: React.SetStateAction<string>) =>
                setSelected(val)
              }
              data={dataFilter}
              save="value"
              placeholder={`-- ${bilingual.VIEW_USERS.SELECT_STATE} --`}
              searchPlaceholder={`-- ${bilingual.VIEW_USERS.SELECT_STATE} --`}
              defaultOption={dataFilter[0]}
              fontFamily={font.semiBold}
              boxStyles={{
                borderWidth: 2,
                borderColor: mode.white,
                backgroundColor: mode.grey,
              }}
              inputStyles={{color: mode.blue1, fontSize: 16}}
              dropdownStyles={{borderWidth: 2, borderColor: mode.white}}
              dropdownTextStyles={{color: mode.white, fontSize: 16}}
            />
          </View>

          <View style={styles.containerPlace}>
            {dataRender()
              .slice(0, getItemPagination(page))
              .map((place, index) => (
                <ApprovalListItem
                  key={index}
                  index={index}
                  id={place.id ? place.id : ''}
                  nameVi={place.nameVi}
                  nameEn={place.nameEn}
                  createdAt={place.createdAt ? place.createdAt : ''}
                  handlePress={() => handlePress(place.id ? place.id : '')}
                />
              ))}
          </View>
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
          {isShowBtnPagination(dataRender()) ? (
            <View
              pointerEvents={'auto'}
              style={{marginTop: 32, marginHorizontal: 50}}>
              <Button01
                height={60}
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

export default ApprovePlacesScreen;
