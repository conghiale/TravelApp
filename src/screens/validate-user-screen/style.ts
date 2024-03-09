import {font} from '@/utils/font';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import theme from '@/utils/theme';

const baseButton: ViewStyle = {
  width: '85%',
  height: 50,
  borderRadius: 12,
  justifyContent: 'center',
  alignSelf: 'center',
};
const baseButtonText: TextStyle = {
  fontFamily: font.semiBold,
  fontSize: 18,
  textAlign: 'center',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: theme.colors.brown,
    marginTop: 5,
    marginBottom: 30
  },
  input: {
    width: 35,
    height: 60,
    borderBottomWidth: 1,
    borderColor: '#333',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: font.bold,
  },
  button: {...baseButton, backgroundColor: theme.colors.orange},
  buttonText: {...baseButtonText, color: '#fff'},
  text: {fontFamily: font.extraBold, fontSize: 24, textAlign: 'center'},
});

export default styles;
