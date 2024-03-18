import {font} from '@/utils/font';
import theme from '@/utils/theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  place_container: {
    height: theme.placeItemInfo.PLACE_ITEM_HEIGHT,
    width: theme.placeItemInfo.PLACE_ITEM_WIDTH,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  place_image: {
    height: '40%',
    width: 'auto',
  },
  place_header: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  place_text_title: {
    width: '70%',
    fontFamily: font.semiBold,
    color: theme.colors.white,
  },
  place_text_content: {
    fontFamily: font.regular,
    color: theme.colors.white,
    marginTop: 8,
  },
  place_footer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
