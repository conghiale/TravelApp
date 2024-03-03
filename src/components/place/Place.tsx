import { Alert, Image, Text, View } from "react-native"
import styles from "./place.style"
import theme from "@/utils/theme"
import Button01 from "../button/button01/Button01"
import { Star1, Star1_5, Star2, Star2_5, Star3, Star3_5, Star4, Star4_5, Star5 } from "../star"

const Place = ({ destination, content, star } : PlaceProps) => {
    const handleMapPress = () => {
        Alert.alert('PLACE', 'Button Map pressed', [
            { text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel', },
        ]);
    }

    const handleDetailPress = () => {
        Alert.alert('PLACE', 'Button Detail pressed', [
            { text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel', },
        ]);
    }

    const handeStar = () => {
        switch(star) {
            case 1: return <Star1 />
            case 1.5: return <Star1_5 />
            case 2: return <Star2 />
            case 2.5: return <Star2_5 />
            case 3: return <Star3 />
            case 3.5: return <Star3_5 />
            case 4: return <Star4 />
            case 4.5: return <Star4_5 />
            default: return <Star5 />
        }
    }

    return (
        <View style={styles.place_container}>
            <Image style={styles.place_image} source={require('../../assets/images/vinh-ha-long.jpg')} />
            <View style={styles.place_header}>
                <Text style={[theme.textVariants.textBase, styles.place_text_title]} numberOfLines={1} ellipsizeMode="tail">{destination}</Text>
                <Button01 label="Map" onPress={handleMapPress} />
            </View>
            <Text style={[theme.textVariants.textSm, styles.place_text_content]} numberOfLines={3} ellipsizeMode="tail">{content}</Text>
            <View style={styles.place_footer}>
                {handeStar()}
                <Button01 label="Detail" onPress={handleDetailPress} />
            </View>
        </View>
        
    )
}

export default Place