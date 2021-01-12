import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'

export default function SignIn({ navigation }) {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');

    async function postData(url = '', data = {}) {

        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'

            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return response.json();
    }
    const signIn = () => {
        if (hasWhiteSpace(account)) {
            Alert.alert('Account is must not white space')
            return;
        }
        if (account && password) {
            //https://demo-chat-real.herokuapp.com/
            //http://192.168.16.104:4001/
            postData('https://demo-chat-real.herokuapp.com/signin', { account, password })
                .then(data => {
                    if (data.status === 'fail') {
                        Alert.alert('This account is Invalid')
                    } else {
                        navigation.navigate('JoinScreen', data[0])
                    }
                });
        } else {
            Alert.alert('Field is not empty')
        }
    }
    function hasWhiteSpace(s) {
        return /\s/g.test(s);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                style={{ borderWidth: 1, padding: 10, borderColor: 'gray', borderRadius: 10, marginTop: 10, color: 'black', fontSize: 20, backgroundColor: 'white', width: '40%', textAlign: 'center' }}
                placeholder="Enter Your Account"
                value={account}
                onChangeText={(e) => {
                    setAccount(e)
                }}

            />
            <TextInput
                secureTextEntry={true}
                style={{ borderWidth: 1, padding: 10, borderColor: 'gray', borderRadius: 10, marginTop: 10, color: 'black', fontSize: 20, backgroundColor: 'white', width: '40%', textAlign: 'center' }}
                placeholder="Enter Your Password"
                value={password}
                onChangeText={(e) => {
                    setPassword(e)
                }}

            />
            <TouchableOpacity
                style={{ backgroundColor: 'cyan', textAlign: 'center', borderRadius: 10, marginTop: 20, padding: 15, width: '60%', alignItems: 'center' }}
                onPress={signIn}
            >
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Sign In</Text>
            </TouchableOpacity>
            <Text
                style={{ marginTop: 30 }}
                onPress={() => {
                    navigation.navigate('SignUp')
                }}
            >Sign Up</Text>
        </View>
    )
}
