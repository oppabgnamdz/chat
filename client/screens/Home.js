import React, { useEffect, useState, useRef } from 'react';
import { View, Image } from 'react-native';
import io from 'socket.io-client'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import Spinner from 'react-native-loading-spinner-overlay';
import SERVER from '../utils/Server';
import ToggleSwitch from 'toggle-switch-react-native'

export default function Home({ navigation, route }) {
    const { name, room, account, avatar, time } = route.params;
    const [receiveMessage, setReceiveMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toggle, setToggle] = useState(false);
    const socket = useRef(null);
    useEffect(() => {
        fetch(`${SERVER}${room}`)
            .then(res => res.json())
            .then(res => {
                socket.current = io(`${SERVER}`);
                socket.current.emit("join", { name, room, account, avatar, time })
                socket.current.on("message", message => {
                    setReceiveMessage(pre => GiftedChat.append(pre, message))
                })
                setReceiveMessage(pre => GiftedChat.append(pre, res))
                setIsLoading(false)

            })
    }, [])
    useEffect(() => {
        navigation.setOptions({
            title: "Room: " + room, headerRight: () => (
                <ToggleSwitch
                    isOn={toggle}
                    onColor="white"
                    offColor="black"
                    label="Switch mode"
                    labelStyle={{ color: "black", fontWeight: "900" }}
                    size="medium"
                    onToggle={isOn => {
                        setToggle(toggle => !toggle)
                    }}
                />
            )
        })
    }, [toggle])
    const onSend = (messageToSend) => {
        socket.current.emit("message", messageToSend[0].text);
        setReceiveMessage(pre => GiftedChat.append(pre, messageToSend))
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: toggle ? 'white' : 'black'
        }}>
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
                    _id: time,
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
