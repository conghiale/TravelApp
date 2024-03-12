import { TextInput, TouchableOpacity, View } from 'react-native'
import styles from './customInputInfoUser.style'
import theme from '@/utils/theme'
import LabelScreenReverse from '@/components/labelScreen/LabelScreenReverse'
import { useRef, useState } from 'react'

const CustomInputInfoUser = ({ label, nameIcon, value, name, handleChangeValue }: CustomInputInfoUserProps) => {
    const [readOnly, setReadOnly] = useState(true);
    // const textInputRef = useRef<TextInput>(null);

    const handlePressLabel = () => {
        // if(readOnly) {
        //     if (textInputRef.current) {
        //       textInputRef.current.focus();
        //     }
        // }
        setReadOnly(!readOnly)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{ flex: 2 }}
                activeOpacity={0.8}
                onPress={handlePressLabel}>
                <View style={styles.containerTitle}>
                    <LabelScreenReverse
                        nameIcon={nameIcon}
                        title={label}
                        color={theme.colors.white} />
                </View>
            </TouchableOpacity>
            <View style={styles.containerInput}>
                <TextInput
                    // ref={textInputRef}
                    numberOfLines={2}
                    multiline={true}
                    readOnly={readOnly}
                    style={[theme.textVariants.textBase, styles.textInput]}
                    placeholder={label}
                    value={value}
                    onChangeText={(value) => handleChangeValue(name, value)}
                />
            </View>
        </View>
    )
}

export default CustomInputInfoUser
