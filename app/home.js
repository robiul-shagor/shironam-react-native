import { useState } from "react"
import { View, Text, ScrollView, SafeAreaView } from "react-native"
import { Stack, useRouter } from "expo-router"
import { images } from "../constants"
import { LogoElement, HeaderLeft, HeaderRight, NewsBody, NewsCard } from "../components"
import { TailwindProvider } from "tailwindcss-react-native"

const Home = () => {
    const router = useRouter()
    return (
        <TailwindProvider>
            <SafeAreaView>
                <Stack.Screen options={{
                    headerShadowVisible: true,
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
                    <NewsBody />
                    <NewsCard />
                </ScrollView>
            </SafeAreaView>
        </TailwindProvider>
    )
}

export default Home