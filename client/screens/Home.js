import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import io from 'socket.io-client'
import { GiftedChat } from 'react-native-gifted-chat'

export default function Home({ route }) {
    const [receiveMessage, setReceiveMessage] = useState([]);
    const socket = useRef(null);
    //http://192.168.16.104:4001/

    //https://demo-chat-real.herokuapp.com/

    useEffect(() => {
        console.log('effect')
        console.log(route.params.name);
        const loadData = async () => {
            await fetch('https://demo-chat-real.herokuapp.com/')
                .then(res => res.json())
                .then(res => {
                    setReceiveMessage(pre => GiftedChat.append(pre, res))

                })
            socket.current = io("https://demo-chat-real.herokuapp.com/");
            socket.current.emit("join", route.params.name)

            socket.current.on("message", message => {
                setReceiveMessage(pre => GiftedChat.append(pre, message))
            })


        }
        loadData();

    }, [])
    const onSend = (messageToSend) => {
        socket.current.emit("message", messageToSend[0].text);
        setReceiveMessage(pre => GiftedChat.append(pre, messageToSend))
    }

    return (
        <View style={styles.container}>
            <GiftedChat
                isTyping={true}
                renderUsernameOnMessage
                messages={receiveMessage}
                placeholder='Send something'
                onSend={messages => onSend(messages)}
                isAnimated={true}
                user={{
                    _id: 1,
                }}
                scrollToBottom={true}
            />
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