import React, {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, StyleSheet} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import {Container, Form, Item, Input, Label} from 'native-base';
import SERVER from '../utils/Server';
import BlankValidate from '../utils/BlankValidate'
import image from "../assets/backgroundtest.jpg";
import {AntDesign} from '@expo/vector-icons';

export default function SignUp({navigation}) {
    const [account, setAccount] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

    const signUp = () => {
        if (BlankValidate(account) || BlankValidate(password)) {
            Alert.alert('Account is must not white space')
            return;
        }
        if (password === confirmPassword) {
            if (account && password && name) {
                setIsLoading(true)

                postData(`${SERVER}signup`, {account, name, password})
                    .then(data => {
                        setIsLoading(false)
                        if (data.status === 'fail') {
                            Alert.alert('Account is used . Please create another !')
                        } else {
                            Alert.alert('Create account is successfully !')
                            navigation.navigate('SignIn')
                        }
                    });
            } else {
                Alert.alert('Field is not empty')
            }
        } else {
            Alert.alert('Password is not match')
        }
    }
    return (
        <Container>
            <ImageBackground
                source={image}
                style={styles.container}
            >
                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={isLoading}
                    //Text with the Spinner
                    textContent={'Loading...'}
                    //Text style of the Spinner Text
                    textStyle={{color: '#FFF'}}
                />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('SignIn')
                    }}
                    style={styles.signin}>
                    <Text style={{color: 'red', marginLeft: 15}}>Sign in </Text>
                </TouchableOpacity>
                <Form style={styles.form}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20}}>
                        <Label style={{...styles.label, fontSize: 30}}>Sign up</Label>
                    </View>
                    <Item floatingLabel>
                        <Label style={styles.label}>Username</Label>
                        <Input onChangeText={(e) => {
                            setAccount(e)
                        }} style={{marginTop: 10, color: 'cyan'}}/>
                    </Item>
                    <Item floatingLabel>
                        <Label style={styles.label}>Full name</Label>
                        <Input onChangeText={(e) => {
                            setName(e)
                        }} style={{marginTop: 10, color: 'cyan'}}/>
                    </Item>
                    <Item floatingLabel>
                        <Label style={styles.label}>Password</Label>
                        <Input onChangeText={(e) => {
                            setPassword(e)
                        }} secureTextEntry={true} style={{marginTop: 10, color: 'cyan'}}/>
                    </Item>
                    <Item floatingLabel>
                        <Label style={styles.label}>Confirm password</Label>
                        <Input onChangeText={(e) => {
                            setConfirmPassword(e)
                        }} secureTextEntry={true} style={{marginTop: 10, color: 'cyan'}}/>
                    </Item>

                </Form>
                <View style={styles.buttonRight}>
                    <TouchableOpacity onPress={signUp} style={styles.button}>
                        <AntDesign name="check" size={24} color="black"/>
                    </TouchableOpacity>
                </View>

            </ImageBackground>

        </Container>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    form: {
        marginLeft: 20,
        marginRight: 30,
        marginTop: 70
    },
    label: {
        color: 'white'
    },
    buttonRight: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
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
    signin: {
        backgroundColor: 'white',
        borderRadius: 20,
        position: 'absolute',
        width: 200,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        right: -100,
        marginRight: 20,
        padding: 12
    }
})
