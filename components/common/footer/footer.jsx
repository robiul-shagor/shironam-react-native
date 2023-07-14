import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Content from './content'
import Modal from './modal'

const Footer = () => {
    return (
        <View>
            <Content />
            <Modal />
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({})