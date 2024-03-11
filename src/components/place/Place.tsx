import { Alert, Image, Text, View } from "react-native"
import styles from "./place.style"
import theme from "@/utils/theme"
import Button01 from "../button/button01/Button01"
import { Star1, Star1_5, Star2, Star2_5, Star3, Star3_5, Star4, Star4_5, Star5 } from "../star"
import { useNavigation, CommonActions } from "@react-navigation/native"
import { AppScreenNavigationType } from "@/navigation/types"
import { Status } from "@/utils/constant"
import { Rating } from "react-native-ratings"

const Place = ({ id, destination, content, star, status }: PlaceProps) => {
    const navigation = useNavigation<AppScreenNavigationType<"General">>()

    const navigateToEditDetailPlaceScreen = () => {
        console.log("Place Component (15): ID: " + id)
        status ? (
            navigation.navigate('Root', {
                screen: 'Create',
                params: { id: id },
            })
        ) : navigation.navigate("DetailPlace", { id })
    }

    const navigateToMainScreen = () => {
        // navigation.dispatch(
        //     CommonActions.reset({
        //         index: 0,
        //         routes: [
        //             {
        //                 name: "Home",
        //                 params: { id: id },
        //             }
        //         ]
        //     })
        // )

        navigation.navigate('Root', {
            screen: 'Home',
            // initial: false,
            params: { id: id },
        });
    }

    const handeStar = () => {
        if (status) {
            return (
                <Text style={[
                    theme.textVariants.textSm,
                    {
                        color: status === 1 ?
                            theme.colors.yellow :
                            status === 3 ?
                                '#20BF6B' : '#FF3F34'
                    }]}>
                    {Status[status]}
                </Text>
            )
        } else {
            return (
                <Rating
                    type='star'
                    ratingCount={5}
                    startingValue={star}
                    readonly
                    tintColor={theme.colors.blue1}
                    imageSize={25}
                    fractions={1}
                // jumpValue={0.5}
                // showRating={true}
                />
            )
        }
    }

    return (
        <View style={styles.place_container}>
            {/* thay bằng uri đầu tiên */}
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
                    <Button01 label={status ? "Edit" : "Detail"} onPress={navigateToEditDetailPlaceScreen} />
                </View>
            </View>
        </View>
    )
}

export default Place