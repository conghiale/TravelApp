import {Image, Text, View} from 'react-native';
import styles from './place.style';
import theme from '@/utils/theme';
import Button01 from '../button/button01/Button01';
import {useNavigation} from '@react-navigation/native';
import {AppScreenNavigationType} from '@/navigation/types';
import {Status} from '@/utils/constant';
import {Rating} from 'react-native-ratings';
import {BASE_URL_DESTINATION} from '@/services/config';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import {labelEn, labelVi} from '@/utils/label';
import { languageConstant, themeConstant } from '@/API/src/utils/constant';
import { DarkMode, LightMode } from '@/utils/mode';
import { font } from '@/utils/font';
import { backgroundColor } from '@shopify/restyle';

const Place = ({
  id,
  name,
  description,
  vote,
  status,
  images,
  distance,
}: IPlace) => {
  const {user} = useUserGlobalStore();
  const bilingual = user?.language === languageConstant.VI ? labelVi : labelEn;
  const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;

  const navigation = useNavigation<AppScreenNavigationType<'General'>>();

  const navigateToEditDetailPlaceScreen = () => {
    status
      ? navigation.navigate('EditPlace', {id})
      : navigation.navigate('DetailPlace', {id});
  };

  const navigateToMainScreen = () => {
    navigation.navigate('Root', {
      screen: 'Home',
      params: {id: id},
    });
  };

  const handleStar = () => {
    if (status) {
      return (
        <Text
          style={[
            theme.textVariants.textSm,
            {
              fontFamily: font.regular,
              fontSize: 16,
              color:
                status === 1
                  ? mode.yellow
                  : status === 3
                  ? mode.green2
                  : mode.red,
            },
          ]}>
          {Status[status]}
        </Text>
      );
    } else {
      return (
        <Rating
          type="star"
          ratingCount={5}
          startingValue={vote}
          readonly
          tintColor={mode.blue2}
          imageSize={25}
          fractions={1}
          // jumpValue={0.5}
          // showRating={true}
        />
      );
    }
  };

  return (
    <View style={[styles.place_container, {backgroundColor: mode.blue2, shadowColor: mode.black}]}>
      {/* thay bằng uri đầu tiên */}
      <Image
        style={styles.place_image}
        source={
          images && images[0]
            ? {uri: `${BASE_URL_DESTINATION}/${images[0]}`}
            : require('@/assets/images/vinh-ha-long.jpg')
        }
      />
      <View style={styles.place_header}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text
            style={[theme.textVariants.textBase, styles.place_text_title]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {name}
          </Text>
          {distance ? (
            <Text
              style={[theme.textVariants.textBase, styles.place_text_title, {color: theme.colors.orange1, fontSize: 13, lineHeight: 18}]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {`${bilingual.GENERAL.ABOUT} ${distance.toFixed(2)} km`}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View>
          <Button01
            label={bilingual.GENERAL.BTN_MAP}
            onPress={navigateToMainScreen}
            destStatus={status}
          />
        </View>
      </View>
      <Text
        style={[theme.textVariants.textSm, styles.place_text_content]}
        numberOfLines={3}
        ellipsizeMode="tail">
        {description}
      </Text>
      <View style={styles.place_footer}>
        {handleStar()}
        <View>
          <Button01
            label={
              status ? bilingual.GENERAL.BTN_EDIT : bilingual.GENERAL.BTN_DETAIL
            }
            onPress={navigateToEditDetailPlaceScreen}
          />
        </View>
      </View>
    </View>
  );
};

export default Place;
