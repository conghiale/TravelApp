import { font } from '@/utils/font'
import theme from '@/utils/theme'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './customAlert.style'
import { runOnJS } from 'react-native-reanimated'
import { Rating } from 'react-native-ratings'
import { useState } from 'react'
import CustomInput from '../input/CustomInput'

const CustomAlert = ({ 
    stateColor, 
    displayMode, 
    isStar, 
    isEdit, 
    displayMsg, 
    visible, 
    star,
    inputComment,
    onChangeInput,
    onDimissAlert, 
    onHandlerActionOK, 
    onHandlerActionCANCEL }: CustomAlertProps) => {

    const [rating, setRating] = useState(star)

    const handleActionOK = () => {
        if (onHandlerActionOK)
            runOnJS(onHandlerActionOK)(rating)
        onDimissAlert(false)
    }

    const handleActionCANCEL = () => {
        if (onHandlerActionCANCEL)
            runOnJS(onHandlerActionCANCEL)()
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
                <View style={styles.container}>
                    <View style={styles.containerAlert}>
                        <View style={[styles.header]}>
                            <Text style={[
                                theme.textVariants.textXl,
                                { color: stateColor },
                                styles.title]}
                            >
                                {displayMode}
                            </Text>
                        </View>
                        <View style={styles.body}>
                            <Text style={[
                                theme.textVariants.textSm,
                                styles.content,]}
                            >
                                {displayMsg}
                            </Text>
                            {isStar && isStar === true ? (<Rating
                                                type='star'
                                                ratingCount={5}
                                                startingValue={star ? star : 4.5}
                                                imageSize={25}
                                                fractions={1}
                                                jumpValue={0.5}
                                                showRating={true}
                                                onFinishRating={setRating}
                                            />) : null}

                            {isEdit && isEdit === true ? (
                                <View style={{marginVertical: 8, width: '100%'}}>
                                    <CustomInput
                                    name='contentComment'
                                    value={inputComment ? inputComment :''}
                                    placeholder='Enter your edit comment'
                                    handleInputChange={onChangeInput}
                                />
                                </View>
                            ) : null}
                        </View>
                        <View style={styles.footer}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={handleActionCANCEL}
                                style={styles.btnCancel}>
                                <Text style={styles.btnText}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={handleActionOK}
                                style={styles.btnOk}
                            >
                                <Text style={styles.btnText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default CustomAlert
