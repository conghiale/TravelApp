import { Image, Text, View } from 'react-native'
import styles from './comment.style'
import theme from '@/utils/theme'
import { Rating } from 'react-native-ratings'

const Comment = ({ id, image, nameUser, star, content } : CommentProps) => {
    const uriImage = `../../assets/images/${image}`
    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.containerHeaderUser}>
                    <Image 
                        style={styles.image}
                        source={require("../../assets/images/user.png")}/>
                        <Text style={[theme.textVariants.textLg, styles.textContent]}>{nameUser}</Text>
                </View>
                <View style={styles.containerHeaderStar}>
                    <Rating
                        type='star'
                        ratingCount={5}
                        startingValue={star}
                        readonly
                        tintColor={theme.colors.blue1}
                        imageSize={25}
                        fractions={1}
                        // jumpValue={0.5}
                        // showRating={true}
                        // showReadOnlyText={false}
                    />
                </View>
            </View>
            <Text style={[theme.textVariants.textBase, styles.textContent]}>{content}</Text>
        </View>
    )
}

export default Comment
