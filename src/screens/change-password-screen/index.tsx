import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft';
import {AppScreenNavigationType} from '@/navigation/types';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ImageBackground, Keyboard, StatusBar, Text, View} from 'react-native';
import styles from './changePassword.style';
import theme from '@/utils/theme';
import CustomInput from '@/components/input/CustomInput';
import Button01 from '@/components/button/button01/Button01';
import BorderButton from '@/components/button/borderButton/BorderButton';
import {labelEn, labelVi} from '@/utils/label';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from '@/components/dialog-handle-event';
import {changePassword} from '@/services/user-service';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';

const ChangePasswordScreen = () => {
  const {user} = useUserGlobalStore();
  const bilingual = user?.language === 'EN' ? labelEn : labelVi;
  const [loading, setLoading] = useState<boolean>(false);
  const defaultDialog: DialogHandleEvent = {
    visible: false,
    type: 'success',
    message: '',
    handleOk: () => {},
  };
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);

  const defaulInputErrorProps = {show: false, message: ''};
  const [inputError, setInputError] = useState({
    currentPassword: defaulInputErrorProps,
    newPassword: defaulInputErrorProps,
    confirmPassword: defaulInputErrorProps,
  });

  const navigation = useNavigation<AppScreenNavigationType<'ChangePassword'>>();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [inputValue, setInputValue] = useState<InputChangePassword>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const goBack = () => {
    reset();
    navigation.goBack();
  };

  const handleInputChange = (
    name: keyof InputChangePassword,
    value: string,
  ) => {
    console.log(name, value);
    switch (name) {
      case 'currentPassword':
      case 'newPassword':
        if (value.length < 8) {
          setInputError(prev => ({
            ...prev,
            [name]: {
              show: true,
              message: 'Length of password must be 8 or longer',
            },
          }));
        } else {
          setInputError(prev => ({
            ...prev,
            [name]: defaulInputErrorProps,
          }));
        }
        break;
      case 'confirmPassword':
        if (value !== inputValue.newPassword) {
          setInputError(prev => ({
            ...prev,
            [name]: {
              show: true,
              message: 'Confirm password not match',
            },
          }));
        } else {
          setInputError(prev => ({
            ...prev,
            [name]: defaulInputErrorProps,
          }));
        }
        break;
    }
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleChangePassword = () => {
    if (
      inputValue.newPassword &&
      inputValue.newPassword &&
      inputValue.currentPassword &&
      !inputError.confirmPassword.show &&
      !inputError.currentPassword.show &&
      !inputError.newPassword.show
    ) {
      changePassword({
        email: user?.email,
        current: inputValue.currentPassword,
        change: inputValue.newPassword,
      })
        .then(r => {
          setDialog({
            visible: true,
            type: 'success',
            message: bilingual.CHANGE_PASSWORD.SUCCESS,
            handleOk: () => goBack(),
          });
          setInputValue({
            currentPassword: '',
            confirmPassword: '',
            newPassword: '',
          });
        })
        .catch(e => {
          setDialog({
            visible: true,
            type: 'error',
            message: bilingual.CHANGE_PASSWORD.ERROR,
            handleOk: () => setDialog(defaultDialog),
          });
        });
    } else {
      setDialog({
        visible: true,
        type: 'error',
        message: bilingual.CHANGE_PASSWORD.VALIDATE,
        handleOk: () => setDialog(defaultDialog),
      });
    }
  };

  const reset = () => {
    setInputValue({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setInputError({
      currentPassword: defaulInputErrorProps,
      newPassword: defaulInputErrorProps,
      confirmPassword: defaulInputErrorProps,
    });
  }

  const handleCancel = () => {
    reset();
  };

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
        <StatusBar backgroundColor={theme.colors.blue1} />
        <ImageBackground
          source={require('../../assets/images/ImgBg.png')}
          style={styles.imageBackground}>
          <View style={styles.containerArrowLeft}>
            <ButtonArrowLeft onPress={goBack} />
          </View>
          <View style={styles.body}>
            <Text style={[theme.textVariants.text3Xl, styles.textTitle]}>
              {bilingual.CHANGE_PASSWORD.TITLE}
            </Text>
            <CustomInput
              name="currentPassword"
              value={inputValue.currentPassword}
              placeholder={bilingual.CHANGE_PASSWORD.CURRENT}
              handleInputChangeName={handleInputChange}
              secure={true}
            />
            {inputError.currentPassword.show ? (
              <Text style={styles.inputError}>
                {inputError.currentPassword.message}
              </Text>
            ) : (
              <></>
            )}
            <CustomInput
              name="newPassword"
              value={inputValue.newPassword}
              placeholder={bilingual.CHANGE_PASSWORD.NEW}
              handleInputChangeName={handleInputChange}
              secure={true}
            />
            {inputError.newPassword.show ? (
              <Text style={styles.inputError}>
                {inputError.newPassword.message}
              </Text>
            ) : (
              <></>
            )}
            <CustomInput
              name="confirmPassword"
              value={inputValue.confirmPassword}
              placeholder={bilingual.CHANGE_PASSWORD.CONFIRM}
              handleInputChangeName={handleInputChange}
              secure={true}
            />
            {inputError.confirmPassword.show ? (
              <Text style={styles.inputError}>
                {inputError.confirmPassword.message}
              </Text>
            ) : (
              <></>
            )}
            <Button01
              height={60}
              label={bilingual.CHANGE_PASSWORD.CHANGE}
              onPress={handleChangePassword}
            />
            <BorderButton
              height={60}
              label={bilingual.CHANGE_PASSWORD.RESET}
              nameIcon="cancel"
              onPress={handleCancel}
            />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaWrapper>
  );
};

export default ChangePasswordScreen;
