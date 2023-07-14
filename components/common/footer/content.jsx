import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { images } from '../../../constants'
import { Link } from 'expo-router'

const Content = () => {
    return (
        <View className="bg-white dark:bg-[#272727] dark:text-white">
            <View className="container" style={styles.pdlr}>
                <View className="footer_top py-16 xl:py-20 border-t border-b border-gray-300 dark:border-t-transparent sm:grid sm:grid-cols-12 space-y-10">
                    <View className="widget col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-4">
                        <View className="brand_nav mb-10">
                            <Image source={images.logo}             resizeMode='contain' style={{ width: 100, height: 45 }}  />
                        </View>

                        <Text className="text-2xl mb-4">Follow Us</Text>

                        <View className="social_icons space-x-4">

                        </View>
                    </View>
                </View>

                <View className="widget col-span-6 md:col-span-5 lg:col-span-4">
                    <View className="footer_top_menu gap-6 grid grid-cols-2">
                        <View className="inline mr-6">
                            <Link href="/about-us" className='text-2xl hover:underline'>About Us</Link>
                        </View>        
                        <View className="inline mr-6">
                            <Link href="/advertisement" className='text-2xl hover:underline'>Advertisement</Link>
                        </View> 
                        <View className="inline mr-6">
                            <Link href="/contact-us" className='text-2xl hover:underline'>Contact Us</Link>
                        </View>       
                        <View className="inline mr-6">
                            <Link href="#" className='text-2xl hover:underline'>Newsletter</Link>
                        </View>    
                        <View className="inline mr-6">
                            <Link href="/privacy-policy" className='text-2xl hover:underline'>Privacy & Policy</Link>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Content

const styles = StyleSheet.create({
    pdlr: {
        paddingLeft: 15,
        paddingRight: 15
    }
})