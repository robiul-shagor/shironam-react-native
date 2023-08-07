import React, { useState, createContext } from "react"
import { View, Text, ScrollView, SafeAreaView } from "react-native"
import { Stack, useRouter } from "expo-router"
import { images } from "../constants"
import { LogoElement, HeaderLeft, HeaderRight, NewsCard, NewsCardNonUser } from "../components"
import Footer from "../components/common/footer/footer"
import { useAuth } from "../context/auth"

const Home = () => {
    const router = useRouter();
    const { user } = useAuth();

    return (
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
                { user?.normal_user ? (
                    <NewsCard />
                ) : (
                    <NewsCardNonUser />
                )}
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home