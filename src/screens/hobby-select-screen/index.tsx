import theme from '@/utils/theme';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import {AppScreenNavigationType} from '@/navigation/types';
import {useNavigation} from '@react-navigation/native';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import Spinner from 'react-native-loading-spinner-overlay';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import {getDestinationTypes} from '@/services/destination-service';
import {defaultDialog, getErrorMessage} from '@/utils';
import {languageConstant, themeConstant} from '@/API/src/utils/constant';
import Dialog from '@/components/dialog-handle-event';
import {labelEn, labelVi} from '@/utils/label';
import {updateUserById} from '@/services/user-service';
import { DarkMode, LightMode } from '@/utils/mode';

const HobbySelectScreen = () => {
  const {user, updateUser} = useUserGlobalStore();
  const [data, setData] = useState<TypesFilterProps[]>([]);
  const bilingual = user?.language === languageConstant.VI ? labelVi : labelEn;
  const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;
  const [loading, setLoading] = useState<boolean>(true);
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);
  const navigation = useNavigation<AppScreenNavigationType<'HobbySelect'>>();
  const navigateToMain = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Root'}],
    });
  };

  const fetchDestTypes = () => {
    setLoading(true);
    getDestinationTypes()
      .then(r => {
        setData(
          r.data.data.map((d: ApiReturnDestType) => ({
            dest: {
              id: d._id,
              label:
                user?.language === languageConstant.VI ? d.labelVi : d.labelEn,
            },
            isChoose: false,
          })),
        );
      })
      .catch(e => {
        console.info(getErrorMessage(e));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDestTypes();
  }, []);

  const changeData = (index: number) => {
    const copy = [...data];
    copy[index].isChoose = !copy[index].isChoose;
    setData(copy);
  };

  const handleContinue = () => {
    const typeSelected = data.filter(d => d.isChoose);
    if (typeSelected.length === 0) {
      setDialog({
        visible: true,
        message: bilingual.ASK_HOBBY.ERROR.MT_TYPE,
        type: 'error',
        handleOk: () => setDialog(defaultDialog),
      });
    } else {
      if (user && user.id) {
        //update user hobby, first time
        console.log(typeSelected.map(t => t.dest.id).join(','));

        setLoading(true);
        updateUserById(user.id, {
          typesString: typeSelected.map(t => t.dest.id).join(','),
        })
          .then(r => {
            updateUser({
              ...user,
              hobby: typeSelected.map(t => t.dest.id),
              isFirstTime: r.data.data.isFirstTime,
            });
            navigateToMain();
          })
          .catch(e => {
            console.info(getErrorMessage(e));
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  return (
    <SafeAreaWrapper>
      <Dialog
        isVisible={dialog.visible}
        message={dialog.message}
        type={dialog.type}
        handleOk={dialog.handleOk}
      />
      <Spinner
        size={'large'}
        visible={loading}
        color={mode.orange1}
        animation={'fade'}
      />
      <View
        style={{
          backgroundColor: mode.blue1,
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text style={[styles.title, {color: mode.white}]}>
          {bilingual.ASK_HOBBY.TITLE}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            columnGap: 30,
            rowGap: 30,
            justifyContent: 'center',
            marginVertical: 32,
          }}>
          {data.map((choice, index: number) => {
            return (
              <TouchableOpacity key={index} onPress={() => changeData(index)}>
                <View
                  style={
                    choice.isChoose
                      ? [
                          styles.checked,
                          {
                            borderColor: mode.white,
                            backgroundColor: mode.white,
                          },
                        ]
                      : [
                          styles.unchecked,
                          {
                            borderColor: mode.white,
                            backgroundColor: mode.transparent,
                          },
                        ]
                  }>
                  <Text
                    style={
                      choice.isChoose
                        ? [styles.textChecked, {color: mode.black}]
                        : [styles.textUnchecked, {color: mode.white}]
                    }>
                    {choice.dest.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={handleContinue}>
          <Text style={[styles.textContinue, {color: mode.orange}]}>
            {bilingual.ASK_HOBBY.CONTINUE}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

export default HobbySelectScreen;
