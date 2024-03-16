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
  const bilingual = user?.language === 'EN' ? labelEn : labelVi;

  const navigation = useNavigation<AppScreenNavigationType<'General'>>();

  const navigateToEditDetailPlaceScreen = () => {
    status
      ? navigation.navigate('EditPlace', {id})
      : navigation.navigate('DetailPlace', {id});
  };

  const navigateToMainScreen = () => {
    navigation.navigate('Root', {
      screen: 'Home',
      // initial: false,
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
              color:
                status === 1
                  ? theme.colors.yellow
                  : status === 3
                  ? '#20BF6B'
                  : '#FF3F34',
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
          tintColor={theme.colors.blue1}
          imageSize={25}
          fractions={1}
          // jumpValue={0.5}
          // showRating={true}
        />
      );
    }
  };

  return (
    <View style={styles.place_container}>
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
              style={[theme.textVariants.textBase, styles.place_text_title, {color: theme.colors.orange1}]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {`About ${distance.toFixed(2)} km`}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View>
          <Button01
            label={bilingual.GENERAL.BTN_MAP}
            onPress={navigateToMainScreen}
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
