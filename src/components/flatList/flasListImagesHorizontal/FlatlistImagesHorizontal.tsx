import {Animated, FlatList, Image, View} from 'react-native';
import React, {useRef} from 'react';
import Pagination from '@/components/Pagination';
import { BASE_URL_AVATAR, BASE_URL_DESTINATION } from '@/services/config';

const FlatlistImagesHorizontal: React.FC<ListPlaceProps> = ({data}) => {
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
        renderItem={({item}) => (
          <View
            style={{
              marginHorizontal: 8,
              paddingBottom: 8,
              borderRadius: 10,
            }}>
            {/* change to uri: item */}
            <Image
              style={{
                borderRadius: 10,
                height: 320,
                width: 360,
              }}
              source={item ? {uri: `${BASE_URL_DESTINATION}/${item}`} :require('../../../assets/images/vinh-ha-long.jpg')}
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
      <Pagination data={data} scrollX={scrollX} />
    </>
  );
};

export default FlatlistImagesHorizontal;
