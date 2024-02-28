import { Box, Text } from '@/utils/theme'
import React from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import { Search } from '@/components'
import styles from './places.style'
import Icons from '@/components/shared/icon'
import { Image, View } from 'react-native'
import Place from '@/components/place/Place'

const PlacesScreen = () => {
    return (
        <SafeAreaWrapper>
            <Box style={styles.container}>
                <Search />
                <View style={styles.top_place_title_container}>
                    <Icons name="topPlace" color="white" />
                    <Text style={styles.top_place_title_text}>Top Places</Text>
                </View>
                <Place />
            </Box>
        </SafeAreaWrapper>
    )
}

export default PlacesScreen