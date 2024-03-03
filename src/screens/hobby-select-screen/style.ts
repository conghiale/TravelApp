import {font} from '@/utils/font';
import theme from '@/utils/theme';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

const checkboxView: ViewStyle = {
  borderColor: '#fff',
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
    color: '#fff',
  },
  checked: {...checkboxView, backgroundColor: '#fff'},
  textChecked: {...checkboxText, color: '#000'},
  unchecked: {...checkboxView, backgroundColor: 'transparent'},
  textUnchecked: {...checkboxText, color: '#fff'},
  textContinue: {fontFamily: font.regular, fontSize: 26, color: theme.colors.orange, textDecorationLine: "underline"},
});

export default styles;
