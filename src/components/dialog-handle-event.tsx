import useUserGlobalStore from '@/store/useUserGlobalStore';
import {font} from '@/utils/font';
import {labelEn, labelVi} from '@/utils/label';
import theme from '@/utils/theme';
import React from 'react';
import {Modal, View, Text, Button, TouchableOpacity} from 'react-native';

type DialogType = 'success' | 'error' | 'warning' | '';

interface DialogProps {
  isVisible: boolean;
  message: string;
  type: DialogType;
  handleOk?: () => void;
  handleCancel?: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  isVisible,
  message,
  type,
  handleOk,
  handleCancel,
}) => {
  const {user} = useUserGlobalStore();
  const bilingual = user?.language === 'EN' ? labelEn : labelVi;
  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 24,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            width: '75%',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontFamily: font.extraBold,
              color:
                type === 'success'
                  ? theme.colors.green
                  : type === 'error'
                  ? theme.colors.red
                  : theme.colors.orange,
            }}>
            {type === 'success'
              ? bilingual.DIALOG.SUCCESS_MESSAGE
              : type === 'error'
              ? bilingual.DIALOG.ERROR_MESSAGE
              : bilingual.DIALOG.WARNING_MESSAGE}
          </Text>
          <Text
            style={{
              marginTop: 20,
              marginBottom: 30,
              fontFamily: font.medium,
              fontSize: 17,
              textAlign: 'center',
            }}>
            {message}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 24,
            }}>
              {handleCancel ? <TouchableOpacity onPress={handleCancel}>
                <Text
                  style={{
                    color: theme.colors.white,
                    backgroundColor: theme.colors.grey,
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    borderRadius: 12,
                    textAlign: 'center',
                    fontFamily: font.extraBold,
                    fontSize: 14
                  }}>
                  {bilingual.DIALOG.CANCEL}
                </Text>
              </TouchableOpacity> : <></>}
              <TouchableOpacity onPress={handleOk}>
                <Text
                  style={{
                    color: theme.colors.white,
                    backgroundColor:
                      type === 'success'
                        ? theme.colors.green
                        : type === 'error'
                        ? theme.colors.red
                        : theme.colors.blue,
                    paddingHorizontal: 40,
                    paddingVertical: 12,
                    borderRadius: 12,
                    textAlign: 'center',
                    fontFamily: font.extraBold,
                    fontSize: 14
                  }}>
                  {bilingual.DIALOG.OK}
                </Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Dialog;
