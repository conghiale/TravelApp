import { Alert, Image, Text, View } from 'react-native'
import styles from './profileUse.style'
import theme from '@/utils/theme'
import Button02 from '../button/button02/Button02'
import { useState } from 'react'

const ProfileUser = ({ image, email: gmail, firstName, LastName, hobby, lock, handleButtonLock, handleButtonReview }: ProfileUserProps) => {
    const [isLock, setLock] = useState(lock)

    const handleButtonLockPress = () => {
        setLock(!isLock)
        handleButtonLock()
    }

    const handleButtonReviewPress = () => {
        handleButtonReview()
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/user.png')} />
                <Text style={[theme.textVariants.text2Xl, styles.gmail]}>{gmail}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.containerFN}>
                    <Text style={[theme.textVariants.textLg, styles.titleFN]}>First name:</Text>
                    <Text style={[theme.textVariants.textBase, styles.firstName]}>{firstName}</Text>
                </View>
                <View style={styles.containerFN}>
                    <Text style={[theme.textVariants.textLg, styles.titleFN]}>Last name:</Text>
                    <Text style={[theme.textVariants.textBase, styles.firstName]}>{LastName}</Text>
                </View>
                <View style={styles.containerFN}>
                    <Text style={[theme.textVariants.textLg, styles.titleFN]}>Hobby:</Text>
                    <Text style={[theme.textVariants.textBase, styles.firstName]}>{hobby}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.buttonLock}>
                    <Button02
                        height={38}
                        label={isLock === true ? 'Unlock' : 'Lock'}
                        lock={isLock}
                        onPress={handleButtonLockPress} />
                </View>
                <View style={styles.buttonReview}>
                    <Button02
                        height={38}
                        label='Review'
                        onPress={handleButtonReviewPress} />
                </View>
            </View>
        </View>
    )
}

export default ProfileUser
