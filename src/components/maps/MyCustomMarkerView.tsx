import { Image } from "react-native"

const MyCustomMarkerView = ({selected} : {selected : boolean}) => {
    const imageMarker = (selected ? '../../assets/images/market_focus.png' : '../../assets/images/marker_defaut.png')
    return (
        <Image 
            style={{ width: 32, height: 32 }}
            // source={require(imageMarker)}    
            source={require('../../assets/images/marker_defaut.png')}    
        />
    )
}

export default MyCustomMarkerView
