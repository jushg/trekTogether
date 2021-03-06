import React, { useState, useContext, useEffect } from 'react';
import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat';
import {View, StyleSheet, Image} from 'react-native';
import { ActivityIndicator, IconButton, TextInput } from 'react-native-paper';
import * as FileSystem from "expo-file-system";

import firebase from "../../utils/firebase";
import Screen from "../component/screen"
import {UserContext} from "../../utils/context";
import colorConst from '../constant/color';
import TextBox from '../component/textbox'

// https://github.com/amandeepmittal/react-native-examples

export default ({ route }) => {
  const [messages, setMessages] = useState(null
    // example of system message
    // [{
    //   _id: 0,
    //   text: 'New room created.',
    //   createdAt: new Date().getTime(),
    //   system: true
    // },
    // // example of chat message
    // {
    //   _id: 1,
    //   text: 'Henlo!',
    //   createdAt: new Date().getTime(),
    //   user: {
    //     _id: 2,
    //     name: 'Test User'
    //   }
    // }]
  );
  const [otherAvatar, setOtherAvatar] = useState(null);

  const { chat, otherID } = route.params;
  const { user } = useContext(UserContext);

  useEffect(() => {
    const otherAvatarListener = firebase.firestore()
      .collection("users")
      .doc(otherID)
      .onSnapshot(async (doc) => {
        const uri = doc.data().photoURL;
        await FileSystem.downloadAsync(
          uri,
          FileSystem.cacheDirectory + otherID
        )
          .then(({ uri }) => {
            setOtherAvatar(uri);
          })
          .catch(error => {
            console.error(error);
          });
      });

    return () => otherAvatarListener();
  }, [])

  useEffect(() => {
    const messagesListener = firebase.firestore()
      .collection("chats")
      .doc(chat._id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.name
            };
          }

          return data;
        });

        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, []);

  async function handleSend(messages) {
    const text = messages[0].text;
    const lastMessage = {
      text,
      createdAt: new Date().getTime(),
      user: {
        _id: user.uid,
        name: user.displayName,
        avatar: user.photoURL
      }
    };

    await Promise.all([
      firebase.firestore()
        .collection("chats")
        .doc(chat._id)
        .collection("messages")
        .add(lastMessage),

      firebase.firestore()
        .collection("chats")
        .doc(chat._id)
        .update({lastMessage: lastMessage})
    ]);
  }

  const renderAvatar = () => {
    const size = 36;
    return (
      <Image
        source={{ uri: otherAvatar }}
        resizeMode={"cover"}
        style={{ width: size, height: size, borderRadius: size/2 }}
      />
    )
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            marginVertical:2,
            elevation:3,
            borderWidth: 1,
            backgroundColor: colorConst.secondaryDark
          },
          left: { 
            marginVertical:2,
            elevation:3,
            borderWidth: 1,
            backgroundColor: colorConst.secondaryLight 
          }
        }}
        textStyle={{
          right: {
            color: colorConst.text
          },
          left: {
            color: colorConst.text
          }
        }}
        // tickStyle={{ color: props.currentMessage.sent ? '#34B7F1' : '#999' }}
      />
    );
  }

  const renderLoading = () => {
    return (
      <Screen style={styles.loadingContainer}>
        <ActivityIndicator  size="large" color="black"/>
      </Screen>
    );
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send' size={30} color={colorConst.accent}/>
        </View>
      </Send>
    );
  }

  const scrollToBottomComponent = () => {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} />
      </View>
    );
  }

  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

  if (messages == null || otherAvatar == null) {
    return <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="black"/>
    </View>
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: user.uid, name: user.displayName, avatar: user.photoURL }}
      alwaysShowSend
      scrollToBottom
      renderAvatar={renderAvatar}
      renderBubble={renderBubble}
      // renderLoading={renderLoading}
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      renderSystemMessage={renderSystemMessage}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  systemMessageWrapper: {
    backgroundColor: colorConst.accent,
    borderRadius: 4,
    padding: 5
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  }
});