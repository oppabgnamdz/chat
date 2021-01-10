import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import io from 'socket.io-client'
import { GiftedChat } from 'react-native-gifted-chat'
import JoinScreen from './JoinScreen'
export default function Home() {
    const [hasJoin, setHasJoin] = useState(false);
    const [receiveMessage, setReceiveMessage] = useState([]);
    const socket = useRef(null);
    //http://192.168.16.104:4001/

    //https://demo-chat-real.herokuapp.com/
    useEffect(() => {
        console.log('effect')
        fetch('https://demo-chat-real.herokuapp.com/')
            .then(res => res.json())
            .then(res => {
                setReceiveMessage(pre => GiftedChat.append(pre, res))

            })
        socket.current = io("https://demo-chat-real.herokuapp.com/");
        socket.current.on("message", message => {
            setReceiveMessage(pre => GiftedChat.append(pre, message))
        })

    }, [])
    const onSend = (messageToSend) => {
        socket.current.emit("message", messageToSend[0].text);
        setReceiveMessage(pre => GiftedChat.append(pre, messageToSend))
    }
    const clickJoin = (value) => {
        if (value) {
            console.log('click')
            socket.current.emit("join", value)
            setHasJoin(true)
        }
    }

    return (
        <View style={styles.container}>
            {hasJoin ? (<GiftedChat
                renderUsernameOnMessage
                messages={receiveMessage}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
            ) : (<JoinScreen clickJoin={clickJoin} />)}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});