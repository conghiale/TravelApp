import { Box, Text } from '@/utils/theme'
import React from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'

const HomeScreen = () => {
    return (
        <SafeAreaWrapper>
            <Box>
                <Text>Home screen with Map</Text>
            </Box>
        </SafeAreaWrapper>
    )
}

export default HomeScreen