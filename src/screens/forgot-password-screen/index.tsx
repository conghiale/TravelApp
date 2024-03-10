import {Box, Text} from '@/utils/theme';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {AuthScreenNavigationType} from '@/navigation/types';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import theme from '@/utils/theme';
import {font} from '@/utils/font';
import Icons from '@/components/shared/icon';
import styles from './style';
import {getLinkResetPassword} from '@/services/user-service';
import GlobalDialog from '@/components/dialogs';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [dialog, setDialog] = useState<Dialog>({type: '', message: ''});

  const navigation =
    useNavigation<AuthScreenNavigationType<'ForgotPassword'>>();
  const navigateToSignInScreen = () => {
    navigation.navigate('SignIn');
  };

  const handleChangeText = (text: string) => {
    setEmail(text);
  };

  const handleResetPassword = async () => {
    if (!email) setDialog({type: 'error', message: 'Please input email field'});
    getLinkResetPassword({email})
      .then(r => {
        setDialog({
          type: 'success',
          message: r.data.message,
        });
      })
      .catch(e => {
        if (e.response && e.response.data && e.response.data.message) {
          setDialog({type: 'error', message: e.response.data.message});
        } else {
          setDialog({type: 'error', message: 'Error happened'});
        }
      });
  };

  return (
    <SafeAreaWrapper>
      <Box
        style={{
          backgroundColor: theme.colors.brown,
          flex: 1,
          justifyContent: 'center',
        }}>
        {/* <Image source={require("@/assets/images/logo.png")} style={styles.logo} /> */}

        <View style={{marginHorizontal: 30, gap: 20}}>
          <Text
            style={{
              fontFamily: font.bold,
              fontSize: 32,
              textAlign: 'center',
              color: theme.colors.orange1,
            }}>
            Recovery
          </Text>

          <TextInput
            onChangeText={text => handleChangeText(text)}
            placeholder="Enter your email address"
            keyboardType="email-address"
            style={styles.textInput}
          />

          <TouchableOpacity
            style={{...styles.button, width: '100%'}}
            onPress={handleResetPassword}>
            <Text style={styles.buttonText}>
              Reset password <Icons name="in" color="#fff" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{...styles.button1, width: '100%'}}
            onPress={navigateToSignInScreen}>
            <Text style={styles.buttonText1}>
              Sign in <Icons name="in" color={theme.colors.orange1} />
            </Text>
          </TouchableOpacity>
        </View>
        <GlobalDialog
          dialog={dialog}
          handleOk={() => setDialog({type: '', message: ''})}
          handleClose={() => setDialog({type: '', message: ''})}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default ForgotPasswordScreen;
