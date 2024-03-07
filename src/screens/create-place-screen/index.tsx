import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import Icons from '@/components/shared/icon'
import styles from './createScreen.style'
import theme from '@/utils/theme'
import { AppScreenNavigationType } from '@/navigation/types'
import { useNavigation } from '@react-navigation/native'

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 500

const CreatePlaceScreen = () => {
    const navigation = useNavigation<AppScreenNavigationType<"CreatePlace">>()
    const navigateToCreatedPlacesScreen = () => {
        navigation.navigate("CreatedPlaces")
    }

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
        <SafeAreaWrapper >
            <View style={styles.container}>
                <ScrollView style={{marginBottom: isKeyboardVisible ? 5 : 135}} showsVerticalScrollIndicator={false}>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerItem}>
                            <Icons name='createDestination' />
                            <Text style={styles.headerText}>Create destination</Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.headerItem} 
                            onPress={navigateToCreatedPlacesScreen}
                            activeOpacity={0.85}>
                            <Icons name='list' />
                            <Text style={styles.headerText}>List</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewInputDestination}>
                        <TextInput placeholder='Destination name' style={[theme.textVariants.textBase, styles.inputDestination]} />
                    </View>
                    <View style={[styles.destinationDescription]}>
                        <TextInput
                            style={[theme.textVariants.textBase, styles.inputDestination]}
                            placeholder='Destination name'
                            multiline={true}
                            numberOfLines={8}
                        />
                    </View>

                    <View style={styles.viewInputDestination}>
                        <TextInput placeholder='Latitude' style={[theme.textVariants.textBase, styles.inputDestination]} />
                    </View>

                    <View style={styles.viewInputDestination}>
                        <TextInput placeholder='Longitude' style={[theme.textVariants.textBase, styles.inputDestination]} />
                    </View>

                    <View style={{ width: '100%' }}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.btnAdd}
                            onPress={() => console.log('...')}>
                            <Icons name='add' />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    )
}

export default CreatePlaceScreen