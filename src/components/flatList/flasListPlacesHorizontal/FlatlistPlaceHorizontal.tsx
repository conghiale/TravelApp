import { Animated, FlatList, Text, View } from "react-native"
import Icons from "../../shared/icon"
import React, { useRef, useState } from "react"
import Place from "@/components/place/Place"
import Pagination from "@/components/Pagination"
import styles from "@/components/search/search.style"

const FlatlistHorizontal: React.FC<ListPlaceProps> = ({ data }) => {
    const scrollX = useRef(new Animated.Value(0)).current

    const handelOnScroll = (event: any) => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        }
                    }
                }
            ],
            {
                useNativeDriver: false,
            }
        )(event)
    }

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current

    return (
        <>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={{marginHorizontal: 8, paddingBottom: 8}}>
                        <Place 
                            id={item.id}
                            destination={item.destination} 
                            content={item.content} 
                            star={item.star}
                            longitude={item.longitude}
                            latitude={item.latitude} />
                    </View>
                )}
                horizontal
                pagingEnabled
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                onScroll={handelOnScroll}
                viewabilityConfig={viewabilityConfig}
            />
            <Pagination data={data} scrollX={scrollX} />
        </>
    )
}

export default FlatlistHorizontal