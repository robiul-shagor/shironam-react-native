import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, View, TouchableOpacity } from "react-native";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars"

const HeaderLeft = ({ handlePress }) => {
    return(
        <TouchableOpacity onPress={handlePress}>
            <FontAwesomeIcon icon={faBars} />
        </TouchableOpacity>
    )
}

export default HeaderLeft