import { TextInput, TouchableOpacity, View } from "react-native"

import styles from "./search.style";
import Icons from "../shared/icon";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { labelEn, labelVi } from "@/utils/label";

const Search = ({ value, handleChangeValueSearch, placeholderLabel }: InputSearchProps) => {
  const {user} = useUserGlobalStore();
  const bilingual = user?.language === 'EN' ? labelEn : labelVi;
    
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.text_input}
                value={value}
                onChangeText={handleChangeValueSearch}
                placeholder={placeholderLabel}
                placeholderTextColor={'#A09D98'} />
            <TouchableOpacity style={styles.btn_search}>
                <Icons name="search" color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default Search