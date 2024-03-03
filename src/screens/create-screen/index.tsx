import { View, Text, SafeAreaView, Image, TextInput } from 'react-native'
import React from 'react'
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import Icons from '@/components/shared/icon'
import styles from './createScreen.style'
import theme from '@/utils/theme'

const CreateScreen = () => {
    return (
        <SafeAreaWrapper>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerItem}>
                        <Icons name='createDestination' />
                        <Text style={styles.headerText}>Create destination</Text>
                    </View>
                    <View style={styles.headerItem}>
                        <Icons name='list' />
                        <Text style={styles.headerText}>List</Text>
                    </View>
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
                    <View style={styles.btnAdd}>
                        <Icons name='add' />
                    </View>
                </View>
            </View>
        </SafeAreaWrapper>
    )
}

export default CreateScreen