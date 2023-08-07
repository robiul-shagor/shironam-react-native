import { Stack, Slot } from "expo-router";
import { useFonts } from "expo-font";
import { Provider } from "../context/auth";
import { TailwindProvider } from "tailwindcss-react-native";

export const unstable_settings = {
    initialRouteName: "home"
};

const Layout = () => {
    const [fontsLoaded] = useFonts({
        InterRegular: require("../assets/font/Inter-Regular.ttf"),
        InterMedium: require("../assets/font/Inter-Medium.ttf"),
        InterBold: require("../assets/font/Inter-Bold.ttf"),
        NotoSerifRegular: require("../assets/font/NotoSerif-Regular.ttf"),
        NotoSerifMedium: require("../assets/font/NotoSerif-Medium.ttf"),
        NotoSerifBold: require("../assets/font/NotoSerif-Bold.ttf"),
    });

    if(!fontsLoaded ) {
        return null;
    }

    return (
        <Provider>
            <TailwindProvider platform="ios">
                <Stack initialRouteName="home" >
                    <Stack.Screen name="home" />
                </Stack>
            </TailwindProvider>
        </Provider>
    );
}

export default Layout;