import { font } from '@/utils/font'
import theme from '@/utils/theme'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import styles from './customAlert.style'
import { runOnJS } from 'react-native-reanimated'

const CustomAlert = ({ stateColor, displayMode, displayMsg, visible, onDimissAlert,  onHandlerActionOK, onHandlerActionCANCEL }: CustomAlertProps) => {
    const handleActionOK = () => {
        if (onHandlerActionOK)
            runOnJS(onHandlerActionOK)()
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
