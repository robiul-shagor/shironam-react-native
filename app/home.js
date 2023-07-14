import React, { useState, createContext } from "react"
import { View, Text, ScrollView, SafeAreaView } from "react-native"
import { Stack, useRouter } from "expo-router"
import { images } from "../constants"
import { LogoElement, HeaderLeft, HeaderRight, NewsCardNonUser } from "../components"
import { TailwindProvider } from "tailwindcss-react-native"
import Footer from "../components/common/footer/footer"

export const UserContext = createContext();

const Home = () => {
    const router = useRouter();
    const [userLogin, setUserLogin] = useState(false);
    const [langMode, setLangMode] = useState('BN');

    return (
        <UserContext.Provider
            value={{
            userLogin,
            setUserLogin,
            langMode,
            setLangMode
            }}
        >
            <TailwindProvider>
                <SafeAreaView>
                    <Stack.Screen options={{
                        headerShadowVisible: true,
                        headerStyle: { paddingTop: 15, paddingBotton: 15 },
                        headerLeft: () => (
                            <HeaderLeft />
                        ),    
                        headerRight: () => (
                            <HeaderRight />
                        ),
                        headerTitle: () => (
                            <LogoElement imageUrl={images.logo} />
                        )
                    }} />

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <NewsCardNonUser />

                        <Footer />
                    </ScrollView>
                </SafeAreaView>
            </TailwindProvider>
        </UserContext.Provider>
    )
}

export default Home