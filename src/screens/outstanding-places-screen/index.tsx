import { Box, Text } from '@/utils/theme'
import React, { useEffect, useRef, useState } from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import { Search } from '@/components'
import styles from './places.style'
import Icons from '@/components/shared/icon'
import { Animated, FlatList, Image, Keyboard, ScrollView, View } from 'react-native'
import Place from '@/components/place/Place'
import { NearestPlaces, Places, TopPlaces } from '@/assets/data'
import Pagination from '@/components/Pagination'
import FlatlistHorizontal from '@/components/flatList/flasListPlacesHorizontal/FlatlistPlaceHorizontal'
import FlatListPlaceVertical from '@/components/flatList/flatListPlaceVertical/FlatListPlaceVertical'
import LabelScreen from '@/components/labelScreen/LabelScreen'

const OutstandingPlacesScreen = () => {
    const [searchValue, setSearchValue] = useState('')

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const handleChangeValueSearch = (value: string) => {
        setSearchValue(value)
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
        <SafeAreaWrapper>
            <View style={styles.container}>
                <ScrollView style={{ marginBottom: isKeyboardVisible ? 5 : 135 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.containerSearch}>
                        <Search value={searchValue} handleChangeValueSearch={handleChangeValueSearch} />
                    </View>
                    {/* Top Places */}
                    <View style={styles.title_container}>
                        <LabelScreen nameIcon='topPlace' title='Top Places' />
                    </View>
                    <View style={{ marginVertical: 8 }}>
                        <FlatlistHorizontal data={TopPlaces} />
                    </View>
                    {/* Nearest Places */}
                    <View style={styles.title_container}>
                        <LabelScreen nameIcon='nearestPlace' title='Nearest Places' />
                    </View>
                    <FlatlistHorizontal data={NearestPlaces} />

                    {/* Places */}
                    <View style={styles.title_container}>
                        <LabelScreen nameIcon='places' title='Places' />
                    </View>
                    <FlatListPlaceVertical data={Places} />
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    )
}

export default OutstandingPlacesScreen