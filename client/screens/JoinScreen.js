import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'

export default function JoinScreen({ navigation }) {
    const [name, setName] = useState('');
    return (
        <View style={{ backgroundColor: '#f000', flex: 1 }}>
            <ImageBackground
                source={require('../assets/background.jpg')}
                style={{
                    flex: 1,
                    justifyContent: 'flex-start', alignItems: 'center',
                    resizeMode: "cover",

                }}
            >
                <Image
                    source={require('../assets/chat.png')}
                    style={{ width: 200, height: 200 }}
                />
                <Text
                    style={{ fontSize: 30 }}
                >Join Chat !</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 10, borderColor: 'gray', borderRadius: 10, marginTop: 10, color: 'black', fontSize: 20 ,backgroundColor: 'white'}}
                    placeholder="Enter Your Name"
                    value={name}
                    onChangeText={(e) => {
                        setName(e)
                    }}

                />
                <TouchableOpacity
                    style={{ backgroundColor: 'cyan', textAlign: 'center', borderRadius: 10, marginTop: 20, padding: 15, width: '60%', alignItems: 'center' }}
                    onPress={() => {

                        navigation.navigate('Home', { name })
                    }}
                >
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Join!</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View >
    )
}
