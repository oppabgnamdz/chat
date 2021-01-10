import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

export default function JoinScreen({ clickJoin }) {
    const [name, setName] = useState('');
    return (
        <View style={{ backgroundColor: '#f000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
                style={{ fontSize: 30 }}
            >Join Chat !</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 10, borderColor: 'gray' }}
                placeholder="Enter Your Name"
                value={name}
                onChangeText={(e) => {
                    setName(e)
                }}

            />
            <TouchableOpacity
                style={{ backgroundColor: 'cyan', textAlign: 'center', borderRadius: 50, marginTop: 20, padding: 10 }}
                onPress={() => {
                    console.log('click')
                    clickJoin(name)
                }}
            >
                <Text>Join!</Text>
            </TouchableOpacity>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
