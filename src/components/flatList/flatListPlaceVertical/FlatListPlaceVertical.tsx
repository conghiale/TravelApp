import { Animated, FlatList, Text, View } from "react-native"
import Icons from "../../shared/icon"
import React, { useRef, useState } from "react"
import Place from "@/components/place/Place"
import Pagination from "@/components/Pagination"

const FlatListPlaceVertical: React.FC<ListPlaceProps> = ({ data }) => {
    return (
        <>
            <FlatList
                scrollEnabled={false}
                data={data}
                renderItem={({ item }) => (
                    <View style={{margin: 8}}>
                        <Place destination={item.destination} content={item.content} star={item.star} />
                    </View>
                )}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            />
        </>
    )
}

export default FlatListPlaceVertical