import { TextInput, TouchableOpacity, View } from "react-native"

import styles from "./search.style";
import Icons from "../shared/icon";

const Search = ({ value, handleChangeValueSearch }: InputSearchProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.text_input}
                value={value}
                onChangeText={handleChangeValueSearch}
                placeholder="Find places"
                placeholderTextColor={'#A09D98'} />
            <TouchableOpacity style={styles.btn_search}>
                <Icons name="search" color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default Search