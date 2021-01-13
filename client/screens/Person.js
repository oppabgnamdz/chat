import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
export default function Person({ route, navigation }) {
    const { name, account, avatar, time, password } = route.params;
    const [editName, setEditName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    async function updateData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'PUT',
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
    const edit = () => {
        const sv = `https://demo-chat-real.herokuapp.com/`
        const local = `http://192.168.16.104:4001/`
        if (oldPassword !== password) {
            Alert.alert('Current password is incorrect')
            return
        }
        if (newPassword !== confirmNewPassword) {
            Alert.alert('Password is not match')
        }
        if (newPassword && newPassword === confirmNewPassword) {
            console.log('new pass');
            if (editName) {
                setIsLoading(true)
                updateData(`${sv}update`, { account, name: editName, password: newPassword })
                    .then(data => {
                        setIsLoading(false)
                        if (data.status === 'fail') {
                            Alert.alert('This account is Invalid')
                        } else {
                            navigation.navigate('SignIn')
                        }
                    });
            } else {
                Alert.alert('Field is not empty')
            }
        }
        if (newPassword === '' && confirmNewPassword === '') {
            console.log('no new pass');
            if (editName) {
                setIsLoading(true)
                updateData(`${sv}update`, { account, name: editName })
                    .then(data => {
                        console.log('hey hey ne');
                        setIsLoading(false)
                        if (data.status === 'fail') {
                            Alert.alert('This account is Invalid')
                        } else {

                            navigation.navigate('SignIn')
                        }
                    });
            } else {
                Alert.alert('Field is not empty')
            }
        }
    }
    return (
        <View>
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={isLoading}
                //Text with the Spinner
                textContent={'Loading...'}
                //Text style of the Spinner Text
                textStyle={{ color: '#FFF' }}
            />
            <Text>Your name:  {name}</Text>
            <Text>Link avatar: {avatar}</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 10, borderColor: 'gray', borderRadius: 10, marginTop: 10, color: 'black', fontSize: 20, backgroundColor: 'white', width: '40%', textAlign: 'center' }}
                placeholder="New name"
                value={editName}
                onChangeText={(e) => {
                    setEditName(e)
                }}
            />
            <TextInput
                secureTextEntry={true}
                style={{ borderWidth: 1, padding: 10, borderColor: 'gray', borderRadius: 10, marginTop: 10, color: 'black', fontSize: 20, backgroundColor: 'white', width: '40%', textAlign: 'center' }}
                placeholder="New password"
                value={newPassword}
                onChangeText={(e) => {
                    setNewPassword(e)
                }}
            />
            <TextInput
                secureTextEntry={true}
                style={{ borderWidth: 1, padding: 10, borderColor: 'gray', borderRadius: 10, marginTop: 10, color: 'black', fontSize: 20, backgroundColor: 'white', width: '40%', textAlign: 'center' }}
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChangeText={(e) => {
                    setConfirmNewPassword(e)
                }}
            />
            <TextInput
                secureTextEntry={true}
                style={{ borderWidth: 1, padding: 10, borderColor: 'gray', borderRadius: 10, marginTop: 10, color: 'black', fontSize: 20, backgroundColor: 'white', width: '40%', textAlign: 'center' }}
                placeholder="Old password"
                value={oldPassword}
                onChangeText={(e) => {
                    setOldPassword(e)
                }}
            />
            <Text>If don't want to change password. Please blank new password and confirm new password</Text>
            <TouchableOpacity
                style={{ backgroundColor: 'cyan', textAlign: 'center', borderRadius: 10, marginTop: 20, padding: 15, width: '60%', alignItems: 'center' }}
                onPress={edit}
            >
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Update</Text>
            </TouchableOpacity>
        </View>
    )
}
