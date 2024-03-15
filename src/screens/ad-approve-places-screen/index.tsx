import {AppScreenNavigationType} from '@/navigation/types';
import theme from '@/utils/theme';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Button, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './approvePlaces.style';
import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft';
import {Search} from '@/components';
import LabelScreenReverse from '@/components/labelScreen/LabelScreenReverse';
import {Places} from '@/assets/data';
import ApprovalListItem from '@/components/approvalListIem/ApprovalListItem';
import {SelectList} from 'react-native-dropdown-select-list';
import {font} from '@/utils/font';
import { getWaitingDestination } from '@/services/destination-service';

const ApprovePlacesScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<'ApprovePlaces'>>();

  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = React.useState('');
  const [places, setPlaces] = useState<PlaceProps[]>([])
  const dataFilter = [
    {key: '1', value: 'Recent times'},
    {key: '2', value: 'Longest time'},
  ];

  useEffect(() => {
    getWaitingDestination().then(r => {
      setPlaces(r.data.data.map((d: ApiReturnDestination): PlaceProps => ({
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
      })))
    })
  }, [])

  const handleChangeValueSearch = (value: string) => {
    setSearchValue(value);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handlePress = (id: string) => {
    navigation.navigate('DetailRequestPlace', {id});
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.blue1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <ButtonArrowLeft onPress={goBack} />
            <View style={styles.containerTitle}>
              <Text style={[theme.textVariants.textLg, styles.title]}>
                Approval List
              </Text>
            </View>
          </View>
          <View style={styles.containerSearch}>
            <View style={styles.search}>
              <Search
                value={searchValue}
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
              placeholder="-- Select state --"
              searchPlaceholder="-- Select state --"
              defaultOption={dataFilter[0]}
              fontFamily={font.semiBold}
              boxStyles={{borderWidth: 2, borderColor: theme.colors.white}}
              inputStyles={{color: theme.colors.orange, fontSize: 16}}
              dropdownStyles={{borderWidth: 2, borderColor: theme.colors.white}}
              dropdownTextStyles={{color: theme.colors.white, fontSize: 16}}
            />
          </View>

          <View style={styles.containerPlace}>
            {places.map((place, index) => (
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
        </View>
      </ScrollView>
    </View>
  );
};

export default ApprovePlacesScreen;
