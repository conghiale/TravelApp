import { Box, Text } from '@/utils/theme'
import React, { useState } from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import CustomAlert from '@/components/customAler/CustomAlert'
import { View } from 'react-native'

const PersonalScreen = () => {
    const [showAlerDiglog, setShowAlerDiglog] = useState(true)

    return (
        <SafeAreaWrapper>
            <View>
                <CustomAlert
                    stateColor='red'
                    displayMode='TITlE'
                    displayMsg='CONTENT CONTENT CONTENT CONTENT CONTENT'
                    visible={showAlerDiglog}
                    onDimissAlert={setShowAlerDiglog}
                />
            </View>
        </SafeAreaWrapper>
    )
}

export default PersonalScreen