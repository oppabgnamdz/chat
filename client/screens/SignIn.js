import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Form, Item, Input, Label } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import image from '../assets/backgroundtest.jpg';
import SERVER from '../utils/Server';
export default function SignIn({ navigation }) {

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true)
          
            postData(`${SERVER}signin`, { account, password })
                .then(data => {
                    setIsLoading(false)
                    if (data.status === 'fail') {
                        Alert.alert('This account is Invalid')
                        return
                    }
                    if (data[0].isActive) {
                        Alert.alert('This accoutn is active, please sign in another !')
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
        <Container>
            <ImageBackground
                source={image}
                style={styles.container}
            >
                <Spinner
                    visible={isLoading}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />

                <Form style={styles.form}>
                    <Label style={{ ...styles.label, fontSize: 30 }}>Login</Label>
                    <Item floatingLabel>
                        <Label style={styles.label}>Username</Label>
                        <Input onChangeText={(e) => { setAccount(e) }} style={{ marginTop: 10, color: 'cyan' }} />
                    </Item>
                    <Item floatingLabel >
                        <Label style={styles.label}>Password</Label>
                        <Input onChangeText={(e) => { setPassword(e) }} secureTextEntry={true} style={{ marginTop: 10, color: 'cyan' }} />
                    </Item>

                    <TouchableOpacity
                        onPress={() => { navigation.navigate('SignUp') }}
                        style={styles.signup} >
                        <Text style={{ color: 'red', marginRight: 15 }}>Sign up </Text>
                    </TouchableOpacity>
                </Form>
                <View style={styles.buttonRight}>
                    <TouchableOpacity onPress={signIn} style={styles.button} >
                        <AntDesign name="arrowright" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </Container >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#418a8e',
        justifyContent: 'space-around',
        resizeMode: "cover",
    },
    form: {
        marginTop: 40,
        marginLeft: 20,
        marginRight: 30,
        marginTop: 70
    },
    label: {
        color: 'white'
    },
    button: {
        backgroundColor: 'cyan',
        borderRadius: 100,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,

    },
    buttonRight: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    signup: {
        backgroundColor: 'white',
        borderRadius: 20,
        position: 'absolute',
        top: 250,
        width: 200,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        left: -100,
        marginRight: 20,
        padding: 12
    }
});