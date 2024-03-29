import { Animated, FlatList, Text, View } from 'react-native';
import Icons from '../../shared/icon';
import React, { useRef, useState } from 'react';
import Place from '@/components/place/Place';
import Pagination from '@/components/Pagination';
import styles from '@/components/search/search.style';

const FlatlistHorizontal: React.FC<ListPlacePropsOutstanding> = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const handelOnScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 8, marginVertical: 16, borderRadius: 10}}>
            <Place
              images={item.images}
              types={item.types}
              id={item.id ? item.id : ''}
              name={item.name}
              description={item.description}
              vote={item.vote}
              longitude={item.longitude}
              latitude={item.latitude}
              distance={item.distance}
            />
          </View>
        )}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handelOnScroll}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={data.map(d => d.id)} scrollX={scrollX} />
    </>
  );
};

export default FlatlistHorizontal;
