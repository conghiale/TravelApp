import { Image, TouchableOpacity, View } from 'react-native'
import styles from './imageUpload.style'
import Icons from '../shared/icon'

const IMAGE = '../../assets/images/pictureDefault.png'

interface ImageUpload {
    // id?: number
    image: any
    onHandleShowTakeImage : () => void
    // onHandleShowTakeImage : (id: number, isShow: boolean) => void
}

const ImageUpload = ({image, onHandleShowTakeImage} : ImageUpload) => {

  return (
    <View style={styles.containerAvatar}>
        <Image
            source={image !== '' ? { uri: image } : require(IMAGE)}
            // source={require(IMAGE)}
            style={styles.imageAvatar} />
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onHandleShowTakeImage()}
        >
            <View style={styles.containerCamera}>
                <Icons name={'edit'} width={18} height={20} />
                {/* <Icons name={image === '' ? 'add' : 'cancel'} width={20} height={20} /> */}
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default ImageUpload


// onPress={() => onHandleShowTakeImage(id, true)}
