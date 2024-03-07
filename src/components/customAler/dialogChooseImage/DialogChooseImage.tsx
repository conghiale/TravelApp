import { font } from '@/utils/font'
import theme from '@/utils/theme'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { runOnJS } from 'react-native-reanimated'
import styles from './dialogChooseImage.style'
import Icons from '@/components/shared/icon'

const actions: Action[] = [
    {
        //   title: 'Take Image',
        type: 'capture',
        options1: {
            saveToPhotos: false,
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        },
        options2: {}
    },
    {
        //   title: 'Select Image',
        type: 'library',
        options1: {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000
        },
        options2: {
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        }
    },
]

const DialogChooseImage = ({ visible, onDimissAlert, onHandlerActionCamera, onHandlerActionGallery, onHandlerActionRemove }: DialogChooseImageProps) => {

    const handleActionCamera = () => {
        if (onHandlerActionCamera)
            runOnJS(onHandlerActionCamera)({ type: actions[0].type, options1: actions[0].options1, options2: actions[0].options2 })
        onDimissAlert(false)
    }

    const handleActionGallery = () => {
        if (onHandlerActionGallery)
            runOnJS(onHandlerActionGallery)({ type: actions[1].type, options1: actions[1].options1, options2: actions[1].options2 })
        onDimissAlert(false)
    }

    const handleActionRemove = () => {
        if (onHandlerActionRemove)
            runOnJS(onHandlerActionRemove)()
        onDimissAlert(false)
    }

    return (
        <View>
            <Modal
                visible={visible}
                animationType='fade'
                transparent={true}
                onRequestClose={() => onDimissAlert(false)}
            >

                <View style={styles.container} onTouchEndCapture={() => onDimissAlert(false)}>
                    <View style={styles.containerAlert}>
                        <View style={[styles.header]}>
                            <Text style={[
                                theme.textVariants.textXl,
                                styles.title]}
                            >
                                Profile Photo
                            </Text>
                        </View>
                        <View style={styles.body}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={handleActionCamera}
                                style={styles.btn}>
                                <Icons name='camera' />
                                <Text style={[theme.textVariants.textBase, styles.btnText]}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={handleActionGallery}
                                style={styles.btn}>
                                <Icons name='gallery' />
                                <Text style={[theme.textVariants.textBase, styles.btnText]}>Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={handleActionRemove}
                                style={styles.btn}>
                                <Icons name='remove' color='#57606f' />
                                <Text style={[theme.textVariants.textBase, styles.btnText]}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default DialogChooseImage
