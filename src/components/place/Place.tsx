import { Alert, Image, Text, View } from "react-native"
import styles from "./place.style"
import theme from "@/utils/theme"
import Button01 from "../button/button01/Button01"
import { Star1, Star1_5, Star2, Star2_5, Star3, Star3_5, Star4, Star4_5, Star5 } from "../star"
import { useNavigation } from "@react-navigation/native"
import { AppScreenNavigationType } from "@/navigation/types"
import { Status } from "@/utils/constant"

const Place = ({ id, destination, content, star, status }: PlaceProps) => {
    const navigation = useNavigation<AppScreenNavigationType<"General">>()

    const navigateToDetailPlaceScreen = () => {
        // status ? navigation.navigate("DetailRequestPlace", {id}) : navigation.navigate("DetailPlace", {id})
        navigation.navigate("DetailPlace", {id})
    }
    const navigateToMainScreen = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Root" }]
        })
    }

    // const handleMapPress = () => {
    //     Alert.alert('PLACE', 'Button Map pressed', [
    //         { text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel', },
    //     ]);
    // }

    // const handleDetailPress = () => {
    //     Alert.alert('PLACE', 'Button Detail pressed', [
    //         { text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel', },
    //     ]);
    // }

    const handeStar = () => {
        if (status) {
            return (
                <Text style={[
                    theme.textVariants.textSm,
                    {
                        color: status === 1 ?
                            theme.colors.yellow :
                            status === 3 ?
                                '#20BF6B' : '#FF3F34'}]}>
                    {Status[status]}
                </Text>
            )
        } else {
            switch (star) {
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
    }

    return (
        <View style={styles.place_container}>
            <Image style={styles.place_image} source={require('../../assets/images/vinh-ha-long.jpg')} />
            <View style={styles.place_header}>
                <Text style={[theme.textVariants.textBase, styles.place_text_title]} numberOfLines={1} ellipsizeMode="tail">{destination}</Text>
                <View>
                    <Button01 label="Map" onPress={navigateToMainScreen} />
                </View>
            </View>
            <Text style={[theme.textVariants.textSm, styles.place_text_content]} numberOfLines={3} ellipsizeMode="tail">{content}</Text>
            <View style={styles.place_footer}>
                {handeStar()}
                <View>
                    <Button01 label="Detail" onPress={navigateToDetailPlaceScreen} />
                </View>
            </View>
        </View>
    )
}

export default Place