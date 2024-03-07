import ButtonArrowLeft from '@/components/button/buttonArrowLeft/ButtonArrowLeft'
import { AppScreenNavigationType } from '@/navigation/types'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Button, ImageBackground, Keyboard, ScrollView, StatusBar, Text, View } from 'react-native'
import styles from './changePassword.style'
import theme from '@/utils/theme'
import CustomInput from '@/components/input/CustomInput'
import Button01 from '@/components/button/button01/Button01'
import BorderButton from '@/components/button/borderButton/BorderButton'

const ChangePasswordScreen = () => {
  const navigation = useNavigation<AppScreenNavigationType<"ChangePassword">>()
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [inputValue, setInputValue] = useState<InputChangePassword>({
    notValue: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const goBack = () => {
    navigation.goBack()
  }

  const handleInputChange = (name: keyof InputChangePassword, value: string) => {
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
    Alert.alert('CHANGE PASSWOR', 'Handle ChangePassword pressed', [
      { text: 'OK', onPress: () => console.log('OK CHANGE PASSWOR Pressed'), style: 'cancel', },
    ]);
  }

  const handleCancel = () => {
    Alert.alert('CANCEL', 'Handle Cancel pressed', [
      { text: 'OK', onPress: () => console.log('OK CANCEL Pressed'), style: 'cancel', },
    ]);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.blue1} />
      <ImageBackground source={require('../../assets/images/ImgBg.png')} style={styles.imageBackground}>
        <View style={styles.containerArrowLeft}>
          <ButtonArrowLeft onPress={goBack} />
        </View>
        <View style={styles.body}>
          <Text style={[theme.textVariants.text3Xl, styles.textTitle]}>Change Password</Text>
          <CustomInput
            name='currentPassword'
            value={inputValue.currentPassword}
            placeholder='Current password'
            handleInputChangeName={handleInputChange} />
          <CustomInput
            name='newPassword'
            value={inputValue.newPassword}
            placeholder='New password'
            handleInputChangeName={handleInputChange} />
          <CustomInput
            name='confirmPassword'
            value={inputValue.confirmPassword}
            placeholder='Confirm password'
            handleInputChangeName={handleInputChange} />
          <Button01 height={60} label='Change password' onPress={handleChangePassword} />
          <BorderButton height={60} label='Cancel' nameIcon='cancel' onPress={handleCancel} />
        </View>
      </ImageBackground>
    </View>
  )
}

export default ChangePasswordScreen