import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native'
import {List, Avatar, ActivityIndicator, Divider, Searchbar, Appbar, } from "react-native-paper";
import { CommonActions } from '@react-navigation/native'

// https://docs.expo.io/versions/latest/sdk/permissions/
// TO CACHE AVATARS ?
// https://github.com/DylanVann/react-native-fast-image

import Screen from "../component/screen"
import firebase from "../../utils/firebase";
import {UserContext} from "../feature/auth";
import { Headline } from 'react-native-paper';

export default ({navigation}) => {
  const {user} = useContext(UserContext);
  const [chats, setChats] = useState(null);
  const [myBuddies, setMyBuddies] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState(''); 
  const onChangeSearch = query => setSearchQuery(query); 
  

  // const getAllChats = async (user) => {
  //   const querySnapshot = await firebase.firestore().collection("chats")
  //     .where("members", "array-contains", user)
  //     .orderBy("lastMessage.createdAt", "desc")
  //     .get();
  //   const allChats = querySnapshot.docs.map(doc => {
  //     return {
  //       _id: doc.id,
  //       // give defaults
  //       name: '',
  //       latestMessage: {
  //         text: ''
  //       },
  //       ...doc.data()
  //     };
  //   });
  //   return allChats;
  // }

  useEffect(() => {
    const unsubscribeChatListener = firebase.firestore()
      .collection("chats")
      .where("members", "array-contains", user.uid)
      .orderBy("lastMessage.createdAt", 'desc')
      .onSnapshot(querySnapshot => {
        const allChats = querySnapshot.docs.map(doc => {
          return {
            _id: doc.id,
            // give defaults
            name: '',
            latestMessage: {
              text: ''
            },
            ...doc.data()
          };
        });
        setChats(allChats);
      });

    return () => unsubscribeChatListener();
  }, []);

  useEffect(() => {
    const unsubscribeBuddiesListener = firebase.firestore()
      .collection("users")
      .doc(user.uid)
      .onSnapshot(snapshot => {
        const b = snapshot.data().buddies;    // array of uid, which are strings
        const promises = [];
        // read data from firestore; firestore returns a promise
        b.map(buddy => promises.push(
          firebase.firestore().collection("users")
            .doc(buddy)
            .get()
        ))
        // wait till all promises are resolved, then set state
        Promise.all(promises).then(allResponses => {
          const result = {};
          allResponses.map(doc => result[doc.id] = { buddyID: doc.id, ...doc.data() } );
          setMyBuddies(result);
        });
      });
    return () => unsubscribeBuddiesListener();
  }, []);

  const renderBuddy = ({item}) => {
    return (
      <View style={{paddingHorizontal: 5}}>
        {/*<Avatar.Image size={80} source={require('../../assets/ava6.jpg')} />*/}
        <Avatar.Image size={80} source={{ uri: item.photoURL }} />
      </View>
    )
  }

  function getChatName(itemID, itemName) {
    const x = itemID.split("_");
    const s = itemName.split("_");
    return (x[0] !== user.uid)
      ? { otherID: x[0], otherUsername: s[0]}
      : { otherID: x[1], otherUsername: s[1]};
  }
  const renderChat = ({item}) => {
    let {otherID, otherUsername} = getChatName(item._id, item.name);
    if (item.lastMessage.system) otherUsername += " 👋";   // new buddy? Add an emoji :)
    let lastMessage;
    if (item.lastMessage.system) lastMessage = item.lastMessage.text;  // system message, no sender
    else lastMessage =
      (item.lastMessage.user.name === otherUsername
        ? otherUsername
        : "You")
      + `: ${item.lastMessage.text}`;
    return (

      <List.Item
        title={otherUsername}
        description={lastMessage}
        // left={props => <List.Icon {...props} icon="account"/>}
        left={(props) => {
          const buddyData = myBuddies[otherID];
          // console.log(myBuddies)
          // console.log(otherID)
          // console.log(buddyData);

          return <Avatar.Image {...props} size={70} source={{uri: buddyData.photoURL}}/>;
          // if (buddyData.photoURL)
          //   return <Avatar.Image {...props} size={70} source={{uri: buddyData.photoURL}}/>;
          // else
          // return <Avatar.Image {...props} size={70} source={
          //   require("../../assets/business_cat.png")
          // }/>;
        }}
        onPress={() => navigation.dispatch(CommonActions.navigate({
            name: 'Chat',
            //use this to pass in the name of other user
            params: {chat: item, user: otherUsername},
          })
        )}
        titleNumberOfLines={1}
        descriptionNumberOfLines={1}
        titleStyle={item.lastMessage.system ? {fontWeight:'bold', color:'black'} : {}}
        descriptionStyle={item.lastMessage.system ? {fontWeight:'bold', color:'teal'} : {}}
      />

    )
  };

  if (chats == null || myBuddies == null) {
    return (
      <Screen style={styles.loadingContainer}>
        <ActivityIndicator  size="large" color="black"/>
      </Screen>
    )
    
  }
  else {
    return (
      <>
        <Appbar.Header>
          <Appbar.Content title="Messages"  />
            <Appbar.Action icon="magnify" disabled  />
            <Appbar.Action icon="account-cog"/>
        </Appbar.Header>           
        <View style={{flexDirection: 'row', justifyContent:"space-between"}}>
        {/* <Searchbar
            placeholder="Search buddies"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
        /> */}
          
        </View> 
        <View style={{flex: 1}}>
          <FlatList
            data={chats}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={ () => <Divider/> }
            renderItem={renderChat}
          />
        </View>
      </>
    )
  }
  
}

const styles = StyleSheet.create({
  title: {
    paddingTop:5,
    paddingBottom:10,
  },
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'flex-start',
    paddingHorizontal: 20
  },
  loadingContainer:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
  searchBar: {
    marginBottom: 5,
    borderRadius:20,
    width:"100%"
  }
});