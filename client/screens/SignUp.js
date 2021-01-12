import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'

export default function SignUp() {
    const [account, setAccount] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

    const signUp = () => {
        if (hasWhiteSpace(account)) {
            Alert.alert('Account is must not white space')
            return;
        }
        if (password === confirmPassword) {
            if (account && password && name) {
                postData('http://192.168.16.104:4001/signup', { account, name, password })
                    .then(data => {
                        if (data.status === 'fail') {
                            Alert.alert('Account is used . Please create another !')
                        } else {
                            Alert.alert('Create account is successfully !')
                        }
                    });
            } else {
                Alert.alert('Field is not empty')
            }
        } else {
            Alert.alert('Password is not match')
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
                style={{ borderWidth: 1, padding: 10, borderColor: 'gray', borderRadius: 10, marginTop: 10, color: 'black', fontSize: 20, backgroundColor: 'white', width: '40%', textAlign: 'center' }}
                placeholder="Enter Your Name"
                value={name}
                onChangeText={(e) => {
                    setName(e)
                }}

            />
            <TextInput
                secureTextEntry={true}
                style={{ borderWidth: 1, padding: 10, borderColor: 'gray', borderRadius: 10, marginTop: 10, color: 'black', fontSize: 20, backgroundColor: 'white', width: '40%', textAlign: 'center' }}
                placeholder="Enter Password"
                value={password}
                onChangeText={(e) => {
                    setPassword(e)
                }}

            />
            <TextInput
                secureTextEntry={true}
                style={{ borderWidth: 1, padding: 10, borderColor: 'gray', borderRadius: 10, marginTop: 10, color: 'black', fontSize: 20, backgroundColor: 'white', width: '40%', textAlign: 'center' }}
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChangeText={(e) => {
                    setConfirmPassword(e)
                }}

            />
            <TouchableOpacity
                style={{ backgroundColor: 'cyan', textAlign: 'center', borderRadius: 10, marginTop: 20, padding: 15, width: '60%', alignItems: 'center' }}
                onPress={signUp}
            >
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}
