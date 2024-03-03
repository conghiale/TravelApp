import theme from "@/utils/theme"
import React from "react"
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native"

const { width } = Dimensions.get('screen')

const Pagination: React.FC<PaginationProps> = ({ data, scrollX }) => {
    return (
        <View style={styles.container}>
            {data.map((_, idx) => {
                const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width]
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [12, 30, 12],
                    extrapolate: 'clamp',
                })
                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ['#ccc', '#000', '#ccc'],
                    extrapolate: 'clamp',
                })
                return (
                    <Animated.View key={idx.toString()}
                        style={[
                            styles.dot,
                            { width: dotWidth, backgroundColor }, 
                            // idx === index && styles.dotActive
                        ]} />
                )
            })}
        </View>
    )
}

export default Pagination

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ccc',
        marginHorizontal: 2,
    },
    dotActive: {
        backgroundColor: theme.colors.black
    }
})