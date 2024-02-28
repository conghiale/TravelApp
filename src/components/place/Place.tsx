import { Alert, Image, Text, View } from "react-native"
import styles from "./place.style"
import theme from "@/utils/theme"
import Button from "../button/button01/Button"

const Place = () => {
    const handlePress = () => {
        Alert.alert('PLACE', 'Button Map pressed', [
            { text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel', },
        ]);
    }

    return (
        <View style={styles.place_container}>
            <Image style={styles.place_image} source={require('../../assets/images/vinh-ha-long.jpg')} />
            <View style={{ marginTop: 4,flexDirection: 'row' }}>
                <Text style={[styles.place_text_title, theme.textVariants.textBase]}>Ha Long Bay</Text>
                <Button label="Map" onPress={handlePress} />
            </View>
        </View>
    )
}

export default Place