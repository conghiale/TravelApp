import theme from '@/utils/theme';
import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {AuthStackParamList} from '@/navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createUser, markUserValidation} from '@/services/user-service';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import {TRAVEL_TOKEN_NAME, saveToken} from '@/services/config';
import {defaultDialog, getErrorMessage} from '@/utils';
import Dialog from '@/components/dialog-handle-event';

type Otp = [string, string, string, string, string, string];

const ValidateUserScreen = (
  props: NativeStackScreenProps<AuthStackParamList, 'Validation'>,
) => {
  // const { route } = props;
  const user = props.route.params?.user;
  const [dialog, setDialog] = useState<DialogHandleEvent>(defaultDialog);
  const [otp, setOtp] = useState<Otp>(['', '', '', '', '', '']);
  const inputRefs = useRef<TextInput[]>([]);
  const {updateUser} = useUserGlobalStore();

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp as Otp);
    if (text.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp as Otp);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleReset = () => {
    const newOtp = ['', '', '', '', '', ''];
    setOtp(newOtp as Otp);
    inputRefs.current[0].focus();
  };

  const handleSubmit = async () => {
    createUser({...user, codeValidation: otp.join('')})
      .then(r => {
        setDialog({
          visible: true,
          type: 'success',
          message: r.data.message,
          handleOk: () => setDialog(defaultDialog),
        });

        saveToken(TRAVEL_TOKEN_NAME, r.data.data.token);
        updateUser({
          id: r.data.data.user.id,
          email: r.data.data.user.email,
          firstName: r.data.data.user.firstName,
          lastName: r.data.data.user.lastName,
          avatar: r.data.data.user.avatar,
          language: r.data.data.user.language,
          lock: r.data.data.user.lock,
          role: r.data.data.user.role,
          hobby: r.data.data.user.hobby,
          isFirstTime: r.data.data.user.isFirstTime,
          theme: r.data.data.theme,
        });
      })
      .catch(e => {
        setDialog({
          visible: true,
          type: 'error',
          message: getErrorMessage(e),
          handleOk: () => setDialog(defaultDialog),
        });
      });

    // try {
    //     await createUser({ ...user, codeValidation: otp.join('') });
    //     updateUser({
    //         email: user.email,
    //         name: `${user.firstName} ${user.lastName}`,
    //     });
    //     setDialog({type: 'success', message: "You've regitered successfully, now let's enjoy our app"})
    // } catch(e: any) {
    //     console.log(e)
    //     setDialog({type: 'error', message: e.response?.data.message})
    // }
  };

  const handleResendCode = async () => {
    if (!user)
      return setDialog({
        visible: true,
        type: 'error',
        message: 'Error happened, try again',
        handleOk: () => setDialog(defaultDialog),
      });

    markUserValidation(user)
      .then(r => {
        setDialog({
          visible: true,
          type: 'success',
          message: 'Code resended, check your email to receive it',
          handleOk: () => setDialog(defaultDialog),
        });
      })
      .catch(e => {
        setDialog({
          visible: true,
          type: 'error',
          message: getErrorMessage(e),
          handleOk: () => setDialog(defaultDialog),
        });
      });
  };

  return (
    <>
      <Dialog
        isVisible={dialog.visible}
        message={dialog.message}
        type={dialog.type}
        handleOk={dialog.handleOk}
        // handleCancel={dialog.handleCancel}
      />
      <View
        style={{
          backgroundColor: theme.colors.brown,
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text style={styles.text}>
          Type your validation code sended to your email address
        </Text>
        <View style={styles.container}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.input}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              ref={ref => (inputRefs.current[index] = ref as TextInput)}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(index);
                }
              }}
            />
          ))}
        </View>
        <View style={{gap: 20, marginTop: 20}}>
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleResendCode}>
            <Text style={styles.buttonText}>Resend code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ValidateUserScreen;
