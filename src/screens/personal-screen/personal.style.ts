import {font} from '@/utils/font';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    paddingTop: 32,
  },
  containerAvatar: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  imageAvatar: {
    width: 160,
    height: 160,
    borderWidth: 2,
    borderRadius: 80,
  },
  containerCamera: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 25,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  containerHobby: {
    marginTop: 16,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    paddingHorizontal: '5%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 20,
  },
  information: {
    flexDirection: 'column',
    gap: 20,
  },
  containerUpdateTypes: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: 10,
    rowGap: 10,
    marginTop: 16,
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
  heading: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 4,
  },
  changePassword: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 12,
    marginTop: 12,
  },
  settings: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 20,
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  advanced: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});

export default styles;
