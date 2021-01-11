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
        console.log(route.params.room);
        const loadData = async () => {
            await fetch(`http://192.168.16.104:4001/${route.params.room}`)
                .then(res => res.json())
                .then(res => {
                    setReceiveMessage(pre => GiftedChat.append(pre, res))

                })
            socket.current = io("http://192.168.16.104:4001/");
            socket.current.emit("join", { name: route.params.name, room: route.params.room })

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