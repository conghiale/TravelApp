import { Box, Text } from '@/utils/theme'
import React from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'

const PersonalScreen = () => {
    return (
        <SafeAreaWrapper>
            <Box>
                <Text>Personal settings</Text>
            </Box>
        </SafeAreaWrapper>
    )
}

export default PersonalScreen