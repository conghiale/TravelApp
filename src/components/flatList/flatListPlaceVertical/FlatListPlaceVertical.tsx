import { Animated, FlatList, Text, View } from "react-native"
import Icons from "../../shared/icon"
import React, { useRef, useState } from "react"
import Place from "@/components/place/Place"
import Pagination from "@/components/Pagination"

const FlatListPlaceVertical: React.FC<ListPlaceProps> = ({ data, onRefresh }) => {
    return (
        <>
            <FlatList
                scrollEnabled={false}
                data={data}
                renderItem={({ item }) => (
                    <View style={{ margin: 8 }}>
                        <Place
                            id={item.id}
                            destination_VI={item.destination_VI}
                            content_VI={item.content_VI}
                            star={item.star}
                            longitude={item.longitude}
                            latitude={item.latitude} />
                    </View>
                )}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            // onEndReached={onRefresh}
            />
        </>
    )
}

export default FlatListPlaceVertical