import theme from '@/utils/theme';
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { AuthStackParamList } from '@/navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Otp = [string, string, string, string, string, string];

const ValidateUserScreen = (props: NativeStackScreenProps<AuthStackParamList, 'Validation'>) => {
    const { route } = props
    console.log(route.params, typeof route.params)
    const [otp, setOtp] = useState<Otp>(['', '', '', '', '', '']);
    const inputRefs = useRef<TextInput[]>([]);

    useEffect(() => {
        inputRefs.current[0].focus();
      }, []);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp as Otp);
        if (text.length === 1 && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleBackspace = (index: number) => {
        if (index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp as Otp);
            inputRefs.current[index - 1].focus();
        }
    };

    const handleReset = () => {
        const newOtp = ['', '', '', '', '', ''];
        setOtp(newOtp as Otp);
        inputRefs.current[0].focus();
    };

    return (
        <View style={{ backgroundColor: theme.colors.brown, flex: 1, justifyContent: 'center' }}>
            <Text style={styles.text}>Type your validation code sended to your email address</Text>
            <View style={styles.container}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        ref={(ref) => (inputRefs.current[index] = ref as TextInput)}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace') {
                                handleBackspace(index);
                            }
                        }}
                    />
                ))}
            </View>
            <View style={{ gap: 20, marginTop: 20 }}>
                <TouchableOpacity style={styles.button} onPress={handleReset}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Resend code</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ValidateUserScreen;