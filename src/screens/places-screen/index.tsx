import { Box, Text } from '@/utils/theme'
import React, { useRef, useState } from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import { Search } from '@/components'
import styles from './places.style'
import Icons from '@/components/shared/icon'
import { Animated, FlatList, Image, ScrollView, View } from 'react-native'
import Place from '@/components/place/Place'
import { NearestPlaces, Places, TopPlaces } from '@/assets/data'
import Pagination from '@/components/Pagination'
import FlatlistHorizontal from '@/components/flatList/flasListPlacesHorizontal/FlatlistPlaceHorizontal'
import FlatListPlaceVertical from '@/components/flatList/flatListPlaceVertical/FlatListPlaceVertical'

const PlacesScreen = () => {

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>
                <ScrollView>
                    <Search />
                    {/* Top Places */}
                    <View style={styles.title_container}>
                        <Icons name="topPlace" color="white" />
                        <Text style={styles.title_text}>Top Places</Text>
                    </View>
                    <FlatlistHorizontal data={TopPlaces} />

                    {/* Nearest Places */}
                    <View style={styles.title_container}>
                        <Icons name="nearestPlace" color="white" />
                        <Text style={styles.title_text}>Nearest Places</Text>
                    </View>
                    <FlatlistHorizontal data={NearestPlaces} />

                    {/* Places */}
                    <View style={styles.title_container}>
                        <Icons name="places" color="white" />
                        <Text style={styles.title_text}>Places</Text>
                    </View>
                    <FlatListPlaceVertical data={Places} />
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    )
}

export default PlacesScreen