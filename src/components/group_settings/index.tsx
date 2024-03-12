import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './settings.style';
import { Switch } from 'react-native-switch';
import theme from '@/utils/theme';

const GroupSettings = ({ label, isEnabled, activeText, inActiveText,toggleSwitch }: SwitchProps) => {

    return (
        <View style={styles.group}>
            <Text style={[theme.textVariants.textBase, styles.text]}>{label}</Text>
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