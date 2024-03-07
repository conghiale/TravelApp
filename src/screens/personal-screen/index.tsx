import theme, { Box, Text } from '@/utils/theme'
import React, { useEffect, useState } from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import CustomAlert from '@/components/customAler/CustomAlert'
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './personal.style'
import Icons from '@/components/shared/icon'
import GroupSettings from '@/components/group_settings'
import { useNavigation } from '@react-navigation/native'
import { AppScreenNavigationType, AuthScreenNavigationType } from '@/navigation/types'
import BorderButton from '@/components/button/borderButton/BorderButton'
import LabelScreen from '@/components/labelScreen/LabelScreen'

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 100

const PersonalScreen = () => {
    const IMAGE = '../../assets/images/avatarDefault.jpg'

    const [person, setPerson] = useState<Person>({
        hobby: 'Trai nghiem, Kham pha, Thien nhien, Mao hiem',
        email: '',
        firstName: '',
        lastName: '',
        image: '../../assets/images/avatarDefault.jpg',
        isEnglish: false,
        isLight: false,
    });

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const navigation = useNavigation<AppScreenNavigationType<"Root">>()

    const handleInputChange = (name: keyof Person, value: string) => {
        setPerson({
            ...person,
            [name]: value,
        });
    };

    const handleToggle = (name: keyof Person) => {
        setPerson({
            ...person,
            [name]: !person[name],
        });
    };

    const navigateToChangePasswordScreen = () => {
        navigation.navigate("ChangePassword")
    }

    const navigateToUserListScreen = () => {
        navigation.navigate("ViewUsers")
    }

    const navigateToApprovePlacesScreen = () => {
        navigation.navigate("ApprovePlaces")
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView
                style={{ marginBottom: isKeyboardVisible ? 5 : 135 }}
                showsVerticalScrollIndicator={false} >
                <View style={styles.header}>
                    <Text style={[theme.textVariants.textXl, styles.text]}>Your Profile</Text>
                    <View style={styles.containerAvatar}>
                        <Image
                            source={require(IMAGE)} 
                            style={styles.imageAvatar} />
                        <TouchableOpacity
                            activeOpacity={0.85}
                            // onPress={}
                        >
                            <View style={styles.containerCamera}>
                                <Icons name='camera' />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerHobby}>
                        <Text 
                            numberOfLines={2}
                            ellipsizeMode='tail'
                            style={[theme.textVariants.textBase, styles.text, {textAlign: 'center'}]}>
                                {person.hobby}
                        </Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.information}>
                        <View style={styles.heading}>
                            <LabelScreen nameIcon='personal' title='Information' />
                        </View>
                        <TextInput
                            style={[theme.textVariants.textBase, styles.input]}
                            placeholder="abc@gmail.com"
                            value={person.email}
                            onChangeText={(value) => handleInputChange('email', value)}
                        />
                        <TextInput
                            style={[theme.textVariants.textBase, styles.input]}
                            placeholder="First name"
                            value={person.firstName}
                            onChangeText={(value) => handleInputChange('firstName', value)}
                        />
                        <TextInput
                            style={[theme.textVariants.textBase, styles.input]}
                            placeholder="Last name"
                            value={person.lastName}
                            onChangeText={(value) => handleInputChange('lastName', value)}
                        />
                        <TouchableOpacity
                            style={styles.changePassword}
                            onPress={navigateToChangePasswordScreen}
                        >
                            <Text style={[theme.textVariants.textLg, styles.text]}>Change password</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.settings}>
                        <View style={styles.heading}>
                            <LabelScreen nameIcon='setting' title='Settings' />
                        </View>

                        <GroupSettings
                            label={'Language (VI/EN)'}
                            isEnabled={person.isEnglish}
                            toggleSwitch={() => handleToggle('isEnglish')}
                        />

                        <GroupSettings
                            label={'Theme (Dark/Light)'}
                            isEnabled={person.isLight}
                            toggleSwitch={() => handleToggle('isLight')}
                        />
                    </View>

                    <View style={styles.advanced}>
                        <View style={styles.heading}>
                            <LabelScreen nameIcon='advanced' title='Advanced' />
                        </View>
                        <BorderButton
                            height={60}
                            label='Users'
                            nameIcon='userList'
                            onPress={navigateToUserListScreen} />

                        <BorderButton
                            height={60}
                            label='Approve creating'
                            nameIcon='advanced'
                            onPress={navigateToApprovePlacesScreen} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default PersonalScreen