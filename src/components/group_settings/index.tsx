import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './settings.style';
import { Switch } from 'react-native-switch';
import theme from '@/utils/theme';
import useUserGlobalStore from '@/store/useUserGlobalStore';
import { themeConstant } from '@/API/src/utils/constant';
import { DarkMode, LightMode } from '@/utils/mode';

const GroupSettings = ({ label, isEnabled, activeText, inActiveText,toggleSwitch }: SwitchProps) => {
    const {user} = useUserGlobalStore();
    const mode = user?.theme === themeConstant.LIGHT ? LightMode : DarkMode;
    return (
        <View style={styles.group}>
            <Text style={[theme.textVariants.textBase, styles.text, {color: mode.white}]}>{label}</Text>
            <Switch
                activeText={activeText}
                inActiveText={inActiveText}
                backgroundActive={theme.colors.yellow1}
                backgroundInactive={theme.colors.grey}
                circleActiveColor={theme.colors.yellow}
                circleInActiveColor={theme.colors.white}
                onValueChange={toggleSwitch}
                value={isEnabled}
                circleSize={40}
            />
        </View>
    );
}

export default GroupSettings;