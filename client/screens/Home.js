import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Image } from 'react-native';
import io from 'socket.io-client'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import Spinner from 'react-native-loading-spinner-overlay';



export default function Home({ route }) {
    const [receiveMessage, setReceiveMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const socket = useRef(null);
    //http://192.168.16.104:4001/

    //https://demo-chat-real.herokuapp.com/

    useEffect(() => {

        const loadData = async () => {
            await fetch(`http://192.168.16.104:4001/${route.params.room}`)
                .then(res => res.json())
                .then(res => {
                    setReceiveMessage(pre => GiftedChat.append(pre, res))
                    setIsLoading(false)

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
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={isLoading}
                //Text with the Spinner
                textContent={'Loading...'}
                //Text style of the Spinner Text
                textStyle={{ color: '#FFF' }}
            />

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
                renderSend={(props) => {
                    return (
                        <Send
                            {...props}
                            containerStyle={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginRight: 15,
                            }}
                        >
                            <Image source={require('../assets/send.png')}
                                style={{ width: 27.2, height: 27.2 }} />
                        </Send>
                    );
                }}
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