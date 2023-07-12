import { Image, TouchableOpacity } from "react-native";

const LogoElement = ( {imageUrl, handlePress} ) => {
  return (
    <TouchableOpacity onPress={handlePress}>
        <Image 
            source={imageUrl}
            resizeMode='contain'
            style={{ width: 100, height: 45 }}
        />
    </TouchableOpacity>
  )
}

export default LogoElement