import React, { Component, createRef, useCallback, useRef, useState } from 'react'
import { Dimensions, Image, ImageComponent, View } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView, PanGestureHandlerProps, } from 'react-native-gesture-handler'
import Place from '../place/Place'
import Animated, { runOnJS, runOnUI, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import styles from './placeItem.style'
import theme from '@/utils/theme'
import { opacity } from '@shopify/restyle'
import CustomAlert from '../customAler/CustomAlert'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.2

const ListPlaceItem = ({ placeItem, onDismiss }: ListPlaceItemProps) => {
    const translateX = useSharedValue(0)
    const itemHeight = useSharedValue(theme.placeItemInfo.PLACE_ITEM_HEIGHT)
    const marginVertical = useSharedValue(8)
    const opacity = useSharedValue(1)

    const [showDialog, setShowDialog] = useState(false)

    const onHandlerActionOK = () => {
        translateX.value = withTiming(-SCREEN_WIDTH)
        itemHeight.value = withTiming(0)
        marginVertical.value = withTiming(0)
        opacity.value = withTiming(0, undefined, (isFinished) => {
            if (isFinished && onDismiss) {
                runOnJS(onDismiss)(placeItem)
            }
        })
    }

    const onHandlerActionCANCEL = () => {
        translateX.value = withTiming(0)
    }

    const panGesture = Gesture.Pan()
        .onChange((e) => {
            translateX.value = e.translationX
        })
        .onEnd(() => {
            const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD
            if (shouldBeDismissed) {
                runOnJS(setShowDialog)(true)
            }
            else
                translateX.value = withTiming(0)
        })

    const rStyle = useAnimatedStyle(() => ({
        transform: [{
            translateX: translateX.value
        }]
    }))

    const rIconContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0)
        return { opacity }
    })

    const rPlaceContainerStyle = useAnimatedStyle(() => {
        return {
            height: itemHeight.value,
            marginVertical: marginVertical.value,
            opacity: opacity.value,
        }
    })

    return (
        <View>
            <CustomAlert
                stateColor='red'
                displayMode='TITlE'
                displayMsg='LOVED LOVED LOVED LOVED'
                visible={showDialog}
                onDimissAlert={setShowDialog}
                onHandlerActionOK={onHandlerActionOK}
                onHandlerActionCANCEL={onHandlerActionCANCEL}
            />
            <Animated.View style={[styles.container, rPlaceContainerStyle]}>
                <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
                    <Image style={styles.imageTrash} source={require('../../assets/icons/trash.png')} />
                </Animated.View>
                <GestureHandlerRootView>
                    <GestureDetector gesture={panGesture}>
                        <Animated.View style={[rStyle]}>
                            <Place
                                id={placeItem.id}
                                name={placeItem.name}
                                description={placeItem.description}
                                vote={placeItem.vote}
                                types={placeItem.types}
                                images={placeItem.images}
                                status={placeItem.status}
                                longitude={placeItem.longitude}
                                latitude={placeItem.latitude} />
                        </Animated.View>
                    </GestureDetector>
                </GestureHandlerRootView>
            </Animated.View>
        </View>
    )
}

export default ListPlaceItem
