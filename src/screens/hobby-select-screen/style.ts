import {font} from '@/utils/font';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

const checkboxView: ViewStyle = {
  borderWidth: 3,
  borderRadius: 8,
  height: 60,
  width: 132,
  justifyContent: 'center',
};
const checkboxText: TextStyle = {
  fontFamily: font.regular,
  fontSize: 16,
  textAlign: 'center',
};

const styles = StyleSheet.create({
  title: {
    fontFamily: font.regular,
    fontSize: 24,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  checked: {...checkboxView},
  textChecked: {...checkboxText},
  unchecked: {...checkboxView},
  textUnchecked: {...checkboxText},
  textContinue: {
    fontFamily: font.regular,
    fontSize: 26,
    textDecorationLine: 'underline',
  },
});

export default styles;
