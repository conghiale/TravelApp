import { font } from '@/utils/font'
import theme from '@/utils/theme'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './style'
import { AppScreenNavigationType, AuthScreenNavigationType } from '@/navigation/types'
import { useNavigation } from '@react-navigation/native'

interface IData {
    name: string
    check: boolean
}

const HobbySelectScreen = () => {
    
    const navigation = useNavigation<AppScreenNavigationType<"HobbySelect">>()
    const navigateToMain = () => {
        navigation.navigate("Root")
    }

    const [data, setData] = useState<IData[]>([])

    useEffect(() => {
        setData([
            { name: "Du lich xa", check: false },
            { name: "Du lich gan", check: false },
            { name: "Van hoa", check: false },
            { name: "The thao", check: false },
            { name: "Dong bang", check: false },
            { name: "Thien nhien", check: false },
            { name: "Am thuc", check: false },
            { name: "Mien nui", check: false },
        ])
    }, [])

    const changeData = (index: number) => {
        const copy = [...data]
        copy[index].check = !copy[index].check
        setData(copy)
    }

    const next = () => {
        console.log('data:', data.map((d) => {
            return d.check
        }))
    }

    return (
        <View style={{ backgroundColor: theme.colors.blue1, flex: 1, justifyContent: "center" }}>
            <Text style={styles.title}>Which is your favorite kinds of travel?</Text>
            <View style={{flexDirection: "row", flexWrap: 'wrap', columnGap: 30, rowGap: 30, justifyContent: "center", marginVertical: 32 }}>
                {data.map((choice, index:number) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => changeData(index)}>
                            <View style={choice.check ? styles.checked : styles.unchecked}>
                                <Text style={choice.check ? styles.textChecked : styles.textUnchecked}>{choice.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>

            <TouchableOpacity style={{alignItems: "center"}} onPress={navigateToMain}>
                <Text style={styles.textContinue}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HobbySelectScreen