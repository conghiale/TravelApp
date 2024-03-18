import {font} from '@/utils/font';
import theme from '@/utils/theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  containerHeader: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 4,
  },
  containerTitle: {
    flex: 1,
    alignItems: 'center',
    marginStart: -50,
    justifyContent: 'center',
  },
  title: {
    fontFamily: font.bold,
  },
  containerInfo: {
    width: '100%',
    marginVertical: 16,
    gap: 16,
  },
  containerinfoItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textInfo: {
    fontFamily: font.semiBold,
  },
  containerImage: {
    width: '100%',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  containerDestination: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  content: {
    fontFamily: font.semiBold,
    marginTop: 16,
    textAlign: 'justify',
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 12,
  },
});

export default styles;
