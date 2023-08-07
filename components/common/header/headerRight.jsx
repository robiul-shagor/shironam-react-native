import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../../context/auth";

const HeaderRight = () => {
    const {user, logOut} = useAuth()
    //console.log(user?.token)
    return(
        <View>
            { user?.normal_user?.name ? (
                <Text>
                    { user?.normal_user?.name }
                    
                    <Text onPress={logOut}>Signout</Text>
                    
                </Text>
                
            ) : (
                <Link href="/login">
                    <Text>Login</Text>
                </Link>
            ) }
        </View>
    )
}

export default HeaderRight