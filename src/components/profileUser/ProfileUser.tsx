import {Image, Text, View} from 'react-native';
import styles from './profileUse.style';
import theme from '@/utils/theme';
import Button02 from '../button/button02/Button02';
import {BASE_URL_AVATAR} from '@/services/config';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import { labelEn, labelVi } from '@/utils/label';

const ProfileUser = ({
  image,
  email,
  firstName,
  LastName,
  hobby,
  lock,
  handleButtonLock,
  handleButtonReview,
}: ProfileUserProps) => {
  const {user} = useUserGlobalStore();
  const bilingual = user?.language === 'EN' ? labelEn : labelVi;

  const handleButtonLockPress = () => {
    // setLock(!isLock)
    handleButtonLock();
  };

  const handleButtonReviewPress = () => {
    handleButtonReview();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Image
          style={styles.image}
          source={
            image
              ? {uri: `${BASE_URL_AVATAR}/${image}`}
              : require('../../assets/images/user.png')
          }
        />
        <Text style={[theme.textVariants.text2Xl, styles.gmail]}>{email}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.containerFN}>
          <Text style={[theme.textVariants.textLg, styles.titleFN]}>
            {`${bilingual.PERSONAL.FIRST_NAME}:`}
          </Text>
          <Text style={[theme.textVariants.textBase, styles.firstName]}>
            {firstName}
          </Text>
        </View>
        <View style={styles.containerFN}>
          <Text style={[theme.textVariants.textLg, styles.titleFN]}>
            {`${bilingual.PERSONAL.LAST_NAME}:`}
          </Text>
          <Text style={[theme.textVariants.textBase, styles.firstName]}>
            {LastName}
          </Text>
        </View>
        <View style={styles.containerFN}>
          <Text style={[theme.textVariants.textLg, styles.titleFN]}>
            {`${bilingual.PERSONAL.HOBBY}:`}
          </Text>
          <Text style={[theme.textVariants.textBase, styles.firstName]}>
            {hobby.join(', ')}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonLock}>
          <Button02
            height={38}
            label={lock === true ? 'Unlock' : 'Lock'}
            lock={lock}
            onPress={handleButtonLockPress}
          />
        </View>
        <View style={styles.buttonReview}>
          <Button02
            height={38}
            label="Review"
            onPress={handleButtonReviewPress}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileUser;
