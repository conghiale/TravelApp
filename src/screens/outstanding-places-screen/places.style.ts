import {StyleSheet} from 'react-native';
import {font} from '@/utils/font';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: '5%',
    paddingVertical: 4,
  },
  containerSearch: {
    marginTop: 8,
  },
  containerFilter: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: 10,
    rowGap: 10,
    marginTop: 16,
  },
  filter: {
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
  title_container: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
