import { Image } from "react-native"

const MyCustomMarkerView = ({selected} : {selected : boolean}) => {
    return (
        <Image 
            style={{ width: 32, height: 32 }}
            // source={require(imageMarker)}    
            source={selected ? require('../../assets/images/market_focus.png') : require('../../assets/images/marker_defaut.png')}    
        />
    )
}

export default MyCustomMarkerView
