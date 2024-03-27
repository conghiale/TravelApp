import { Animated, FlatList, Text, View } from "react-native"
import Icons from "../../shared/icon"
import React, { useRef, useState } from "react"
import Place from "@/components/place/Place"
import Pagination from "@/components/Pagination"

const FlatListPlaceVertical: React.FC<ListPlacePropsOutstanding> = ({ data, onRefresh }) => {
    return (
        <>
            <FlatList
                scrollEnabled={false}
                data={data}
                renderItem={({ item }) => (
                    <View style={{ marginHorizontal: 4, marginVertical: 10, borderRadius: 10 }}>
                        <Place
                            id={item.id}
                            types={item.types}
                            images={item.images}
                            description={item.description}
                            name={item.name}
                            vote={item.vote}
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