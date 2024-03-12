import { TextInput, TouchableOpacity, View } from 'react-native'
import styles from './customInputInfoUser.style'
import theme from '@/utils/theme'
import LabelScreenReverse from '@/components/labelScreen/LabelScreenReverse'
import { useEffect, useRef, useState } from 'react'
import { border } from '@shopify/restyle'

const CustomInputInfoUser = ({ label, nameIcon, value, name, handleChangeValue }: CustomInputInfoUserProps) => {
    const [editable, setEditable] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const inputText = useRef<TextInput>(null)

    const handlePressLabel = () => {
        setEditable(!editable)
    }

    useEffect(() => {
        if (editable) {
            inputText.current?.focus();
        }
    }, [editable]);

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    return (
        <View style={[styles.container,
        {
            borderColor: isFocused ? '#0be881' : '',
            borderWidth: isFocused ? 2 : 0
        }]}>
            <TouchableOpacity
                style={{ flex: 2 }}
                activeOpacity={0.8}
                onPress={handlePressLabel}>
                <View style={[styles.containerTitle, {backgroundColor: editable ? '#0be881' : theme.colors.orange}]}>
                    <LabelScreenReverse
                        nameIcon={nameIcon}
                        title={label}
                        color={theme.colors.white} />
                </View>
            </TouchableOpacity>
            <View style={styles.containerInput}>
                <TextInput
                    ref={inputText}
                    numberOfLines={2}
                    multiline={true}
                    editable={editable}
                    style={[theme.textVariants.textBase, styles.textInput]}
                    placeholder={label}
                    value={value}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={(value) => handleChangeValue(name, value)}
                />
            </View>
        </View>
    )
}

export default CustomInputInfoUser
