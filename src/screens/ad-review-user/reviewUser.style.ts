import {font} from '@/utils/font';
import theme from '@/utils/theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  containerHeader: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  containerContent: {
    marginTop: 32,
    gap: 12,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
  },
  content: {
    // marginTop: 16,
    gap: 12,
  },
  containerTitle: {
    alignItems: 'center',
    marginStart: -50,
    justifyContent: 'center',
  },
  title: {
    fontFamily: font.bold,
  },
  titleInfo: {
    fontFamily: font.bold,
  },
  containerUpdateTypes: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: 10,
    rowGap: 10,
    marginTop: 12,
  },
  updateTypes: {
    borderWidth: 2,

    padding: 8,
    borderRadius: 5,
  },
  iconAdd: {
    position: 'absolute',
    right: -10,
    top: -10,
    zIndex: 1,
  },
  text: {
    fontFamily: font.semiBold,
  },
  containerModal: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  containerModalDialog: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 7,
    paddingVertical: 16,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
  textTitleModal: {
    fontFamily: font.semiBold,

    width: '100%',
    textAlign: 'center',
  },
  bodyModal: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 16,
    marginTop: 16,
    justifyContent: 'center',
    gap: 12,
  },
  footerModal: {
    flexDirection: 'row',
    width: '70%',
    marginTop: 16,
  },
});

export default styles;
