import theme from '@/utils/theme'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { runOnJS } from 'react-native-reanimated'
import styles from './dialogNotification.style'

const DialogNotification = ({ status, displayMode, displayMsg, visible, onDimissAlert, onHandlerActionOK, onHandlerActionCANCEL }: DialogNotificationProps) => {

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
                                {
                                    color: status === 'success' ?
                                        '#05c46b' : status === 'error' ?
                                            '#ff3f34' : '#ffd32a'
                                },
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
                        <View style={[
                            styles.footer,
                            { justifyContent: status === 'warning' ? 'space-between' : 'flex-end' }]}>
                            {status === 'warning' ? (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => handleActionCANCEL()}
                                    style={styles.btnCancel}>
                                    <Text style={styles.btnText}>CANCEL</Text>
                                </TouchableOpacity>
                            ) : null}
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => handleActionOK()}
                                style={[
                                    styles.btnOk, {
                                        backgroundColor: status === 'success' ? '#05c46b' :'#ff3f34'
                                    }]}
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

export default DialogNotification
