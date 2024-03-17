import {AppScreenNavigationType} from '@/navigation/types';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import styles from './viewUsers.style';
import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft';
import {Search} from '@/components';
import ProfileUser from '@/components/profileUser/ProfileUser';
import theme from '@/utils/theme';
import {SelectList} from 'react-native-dropdown-select-list';
import {font} from '@/utils/font';
import {getAllUserExceptAdmin, lockUserByEmail} from '@/services/user-service';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from '@/components/dialog-handle-event';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import {labelEn, labelVi} from '@/utils/label';
import {
  defaultDialog,
  getErrorMessage,
  getItemPagination,
  isShowBtnPagination,
  isShowMoreUtil,
} from '@/utils';
import Button01 from '@/components/button/button01/Button01';
import {getDestinationTypes} from '@/services/destination-service';
import {languageConstant} from '@/API/src/utils/constant';

interface ApiReturnUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  language: string;
  lock: boolean;
  avatar: string;
  isFirstTime: boolean;
  viewedPlaces: string[];
  hobby: string[];
  createdAt: string;
  updatedAt: string;
}

type FilterProps = 'all' | 'lock' | 'unlock' | 'search';

const ViewUsersScreen = () => {
  const {user} = useUserGlobalStore();
  const bilingual = user?.language === 'EN' ? labelEn : labelVi;
  const [loading, setLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);

  const navigation = useNavigation<AppScreenNavigationType<'ViewUsers'>>();
  const [selected, setSelected] = React.useState('All');
  const dataFilter = [
    {key: '1', value: 'All'},
    {key: '2', value: 'Locked'},
    {key: '3', value: 'Unlock'},
  ];

  const [users, setUsers] = useState<CardUserProps[]>([]);
  const [types, setTypes] = useState<DestCustom[]>([]);
  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState<FilterProps>('all');
  const [searchText, setSearchText] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  //filter data
  useEffect(() => {
    if (selected === 'Locked') {
      setFilter('lock');
    } else if (selected === 'Unlock') {
      setFilter('unlock');
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
        return users;
      case 'lock':
        return users.filter(u => u.lock);
      case 'unlock':
        return users.filter(u => !u.lock);
      case 'search':
        return users.filter(
          u =>
            u.email.toLowerCase().includes(searchText.toLowerCase()) ||
            u.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            u.lastName.toLowerCase().includes(searchText.toLowerCase()),
        );
    }
  };
  const isShowMore = isShowMoreUtil(dataRender(), page);
  // end filter data

  const fetchUsers = () => {
    setLoading(true);
    getAllUserExceptAdmin()
      .then(r => {
        const fetchData: CardUserProps[] = r.data.data.map(
          (d: ApiReturnUser): CardUserProps => ({
            id: d._id,
            email: d.email,
            firstName: d.firstName,
            lastName: d.lastName,
            hobby: d.hobby,
            avatar: d.avatar,
            lock: d.lock,
            viewPlaces: d.viewedPlaces,
          }),
        );
        setUsers(fetchData);
        console.log('user set');
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
  };

  const fetchTypes = () => {
    getDestinationTypes().then(r => {
      setTypes(
        r.data.data.map((d: ApiReturnDestType) => ({
          id: d._id,
          label: user?.language === languageConstant.VI ? d.labelVi : d.labelEn,
        })),
      );
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTypes();
      fetchUsers();

      return () => {
        // releaseMemory();
        console.log('Screen blurred');
      };
    }, []),
  );

  const lockUser = (email: string) => {
    lockUserByEmail(email)
      .then(r => {
        console.log(r.data.message);
        fetchUsers();
        console.log('fetched');
      })
      .catch(e => {
        console.log(e.response.data.message);
      })
      .finally(() => {
        setDialog(defaultDialog);
      });
  };

  const handleButtonLock = (email: string, lock: boolean) => {
    setDialog({
      visible: true,
      type: 'warning',
      message: lock
        ? `${bilingual.VIEW_USERS.CF_UNLOCK} ${email}`
        : `${bilingual.VIEW_USERS.CF_LOCK} ${email}`,
      handleOk: () => lockUser(email),
      handleCancel: () => setDialog(defaultDialog),
    });
  };

  const handleButtonReview = (id: string) => {
    navigation.navigate('ReviewUser', {id});
  };

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
        handleCancel={dialog.handleCancel}
      />
      <ScrollView
        style={{backgroundColor: theme.colors.blue1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <ButtonArrowLeft onPress={goBack} />
            <View style={styles.containerTitle}>
              <Text style={[theme.textVariants.textLg, styles.title]}>
                {bilingual.VIEW_USERS.TITLE}
              </Text>
            </View>
          </View>
          <View style={styles.containerSearch}>
            <View style={styles.search}>
              <Search
                placeholderLabel={bilingual.VIEW_USERS.FIND_PLACEHOLDER}
                value={searchText}
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
                borderColor: theme.colors.white,
                backgroundColor: theme.colors.grey,
              }}
              inputStyles={{color: theme.colors.blue1, fontSize: 16}}
              dropdownStyles={{borderWidth: 2, borderColor: theme.colors.white}}
              dropdownTextStyles={{color: theme.colors.white, fontSize: 16}}
            />
          </View>
          <View style={styles.containerUser}>
            {dataRender()
              .slice(0, getItemPagination(page))
              .map(user => (
                <View key={user.id} style={styles.user}>
                  <ProfileUser
                    image={user.avatar}
                    email={user.email}
                    firstName={user.firstName}
                    LastName={user.lastName}
                    hobby={types
                      .filter(t => user.hobby.includes(t.id))
                      .map(t => t.label)}
                    lock={user.lock}
                    handleButtonLock={() =>
                      handleButtonLock(user.email, user.lock)
                    }
                    handleButtonReview={() => handleButtonReview(user.id)}
                  />
                </View>
              ))}
            {!loading && dataRender().length === 0 ? (
              <Text
                style={{
                  marginTop: '50%',
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
          </View>

          {isShowBtnPagination(users) ? (
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
    </SafeAreaWrapper>
  );
};

export default ViewUsersScreen;
