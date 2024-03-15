import {AppScreenNavigationType} from '@/navigation/types';
import {useNavigation} from '@react-navigation/native';
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
import {defaultDialog, getErrorMessage, getItemPagination} from '@/utils';
import Button01 from '@/components/button/button01/Button01';

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

const ViewUsersScreen = () => {
  const {user} = useUserGlobalStore();
  const bilingual = user?.language === 'EN' ? labelEn : labelVi;
  const [loading, setLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);

  const navigation = useNavigation<AppScreenNavigationType<'ViewUsers'>>();
  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = React.useState('');
  const dataFilter = [
    {key: '1', value: 'All'},
    {key: '2', value: 'Lock'},
    {key: '3', value: 'Unlock'},
  ];
  const [users, setUsers] = useState<CardUserProps[]>([]);
  const [page, setPage] = useState(1);
  const [dataPagination, setDataPagination] = useState<CardUserProps[]>([]);
  const [userId, setUserId] = useState('')

  const goBack = () => {
    navigation.goBack();
  };

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
        setDataPagination(fetchData.slice(0, getItemPagination(page)));
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

  useEffect(() => {
    // get data user from server
    // if (searchValue === '' && selected === '')
    fetchUsers();
  }, []);

  const handleChangeValueSearch = (value: string) => {
    setSearchValue(value);
  };

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

  const handleButtonLock = (email: string) => {
    setDialog({
      visible: true,
      type: 'warning',
      message: 'Are you sure to lock user ' + email,
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
                Users
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
          <View style={styles.containerUser}>
            {dataPagination.map(user => (
              <View key={user.id} style={styles.user}>
                <ProfileUser
                  image={user.avatar}
                  email={user.email}
                  firstName={user.firstName}
                  LastName={user.lastName}
                  hobby={user.hobby}
                  lock={user.lock}
                  handleButtonLock={() => handleButtonLock(user.email)}
                  handleButtonReview={() => handleButtonReview(user.id)}
                />
              </View>
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
                {loading ? '' : bilingual.GENERAL.NO_DATA}
              </Text>
            ) : (
              <></>
            )}
          </View>
          
          {dataPagination.length !== 0 ? <View
            pointerEvents={
              dataPagination.length < users.length ? 'auto' : 'none'
            }
            style={{marginTop: 32, marginHorizontal: 50}}>
            <Button01
              height={60}
              label={bilingual.OUTSTANDING.SHOW_MORE}
              color={
                dataPagination.length < users.length
                  ? theme.colors.orange
                  : theme.colors.grey
              }
              onPress={() => setPage(prePage => prePage + 1)}
            />
          </View> : <></>}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default ViewUsersScreen;
