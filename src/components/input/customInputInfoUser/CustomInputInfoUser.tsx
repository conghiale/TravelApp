import {TextInput, TouchableOpacity, View} from 'react-native';
import styles from './customInputInfoUser.style';
import theme from '@/utils/theme';
import LabelScreenReverse from '@/components/labelScreen/LabelScreenReverse';
import {useEffect, useRef, useState} from 'react';
import { themeConstant } from '@/API/src/utils/constant';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import { DarkMode, LightMode } from '@/utils/mode';

const CustomInputInfoUser = ({
  label,
  nameIcon,
  value,
  name,
  handleChangeValue,
  changeEditable,
}: CustomInputInfoUserProps) => {
  const [editable, setEditable] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputText = useRef<TextInput>(null);
  const {user} = useUserGlobalStore();
  const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;

  const handlePressLabel = () => {
    setEditable(!editable);
  };

  useEffect(() => {
    if (editable) {
      inputText.current?.focus();
    }
  }, [editable]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: isFocused ? mode.green1 : '',
          borderWidth: isFocused ? 2 : 0,
        },
      ]}>
      <TouchableOpacity
        style={{flex: 2}}
        activeOpacity={0.8}
        onPress={handlePressLabel}>
        <View
          style={[
            styles.containerTitle,
            {
              backgroundColor:
                (editable && changeEditable) ? mode.green1 : mode.orange,
            },
          ]}>
          <LabelScreenReverse
            nameIcon={nameIcon}
            title={label}
            color={mode.white}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.containerInput}>
        <TextInput
          ref={inputText}
          numberOfLines={2}
          multiline={true}
          editable={editable && changeEditable}
          style={[theme.textVariants.textBase, styles.textInput]}
          placeholder={label}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={value => handleChangeValue(name, value)}
        />
      </View>
    </View>
  );
};

export default CustomInputInfoUser;
