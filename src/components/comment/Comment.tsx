import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from './comment.style'
import theme from '@/utils/theme'
import { Rating } from 'react-native-ratings'
import { BASE_URL_AVATAR } from '@/services/config'
import Icons from '../shared/icon'
import useUserGlobalStore from '@/store/useUserGlobalStore'

const Comment = ({ _id, avatar, email, star, content, createdAt, updatedAt, onActionRemove, onActionEdit }: CommentProps) => {

    const { user, updateUser } = useUserGlobalStore();

    const handleActionRemove = () => {
        onActionRemove ? onActionRemove(_id) : undefined
    }

    const handleActionEdit = () => {
        onActionEdit ? onActionEdit() : undefined
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeaderUser}>
                <Image
                    style={styles.image}
                    source={avatar !== '' ? {uri: `${BASE_URL_AVATAR}/${avatar}`} : require("../../assets/images/avatarDefault.jpg")} />
                <Text style={[theme.textVariants.textBase, styles.textContent]}>{email}</Text>
            </View>
            <View style={styles.containerHeaderStar}>
                <Rating
                    type='star'
                    ratingCount={5}
                    startingValue={star}
                    readonly
                    tintColor={theme.colors.blue1}
                    imageSize={20}
                    fractions={1}
                // jumpValue={0.5}
                // showRating={true}
                // showReadOnlyText={false}
                />

                <Text style={[theme.textVariants.textSm, styles.textContent]}>{createdAt}</Text>
            </View>
            <Text style={[theme.textVariants.textSm, styles.textContent, {marginTop: 12, flex: 1}]}>{content}</Text>
            
            <View style={{
                flexDirection: 'row',
                width: '100%',
                // justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
                gap: 10
            }}>
                {createdAt !== updatedAt ? 
                    <Text style={[
                        theme.textVariants.textSm, 
                        styles.textContent, 
                        {flex: 1, color: theme.colors.grey}
                    ]}>
                        updated: {updatedAt}
                    </Text> : <View style={{flex: 1}}></View>
                }
                {user?.email === email ? (
                    <View style={{flexDirection: 'row', gap: 10}}>
                        <TouchableOpacity 
                        activeOpacity={0.85}
                        onPress={() => handleActionRemove()} >
                        <Icons name='remove' color='red' width={22} height={22} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.85}
                            onPress={() => handleActionEdit()} >
                            <Icons name='edit' color='green' width={22} height={22} />
                        </TouchableOpacity>
                    </View>
                )
                : null}
                
            </View>
        </View>
    )
}

export default Comment
