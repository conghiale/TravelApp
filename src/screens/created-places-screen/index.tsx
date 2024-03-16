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
import {languageConstant} from '@/API/src/utils/constant';
import {defaultDialog, getErrorMessage, getItemPagination, isShowBtnPagination, isShowMoreUtil} from '@/utils';
import Button01 from '@/components/button/button01/Button01';

const CreatedPlacesScreen = () => {
  const {user} = useUserGlobalStore();
  const router = useRoute<any>();
  const bilingual = user?.language === 'EN' ? labelEn : labelVi;
  const [loading, setLoading] = useState<boolean>(true);
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [page, setPage] = useState(1);
  const isShowMore = isShowMoreUtil(places, page);

  const navigation = useNavigation<AppScreenNavigationType<'CreatedPlaces'>>();
  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = React.useState('');
  const dataFilter = [
    {key: '1', value: bilingual.CREATED_PLACES.FILTER_ALL},
    {key: '2', value: bilingual.CREATED_PLACES.FILTER_ACCEPTED},
    {key: '3', value: bilingual.CREATED_PLACES.FILTER_WAITING},
    {key: '4', value: bilingual.CREATED_PLACES.FILTER_REJECTED},
  ];

  const handleChangeValueSearch = (value: string) => {
    setSearchValue(value);
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log('fetched hehe');
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
    <View style={{flex: 1, backgroundColor: theme.colors.blue1}}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <ButtonArrowLeft onPress={goBack} />
            <View style={styles.containerTitle}>
              <Text style={[theme.textVariants.textLg, styles.title]}>
                {bilingual.CREATED_PLACES.SCREEN_TITLE}
              </Text>
            </View>
          </View>
          <View style={styles.containerSearch}>
            <View style={styles.search}>
              <Search
                value={searchValue}
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
              boxStyles={{borderWidth: 2, borderColor: theme.colors.white}}
              inputStyles={{color: theme.colors.orange, fontSize: 16}}
              dropdownStyles={{borderWidth: 2, borderColor: theme.colors.white}}
              dropdownTextStyles={{color: theme.colors.white, fontSize: 16}}
            />
          </View>
          <View style={styles.containerUser}>
            {places.slice(0, getItemPagination(page)).map((place, index) => (
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
          </View>
          {isShowBtnPagination(places) ? (
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
                color={isShowMore ? theme.colors.green : theme.colors.grey}
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
