import React, { useState } from 'react'
import { Button, Avatar, Title, Paragraph } from "react-native-paper"
import Swiper from "react-native-deck-swiper"
import { StyleSheet, Text, View, Pressable } from 'react-native'


import Screen from "../component/screen"
import { getAllPotentialBuddies } from "../../utils/computeBuddy";

export default ({navigation}) => {
  
  //This item include (User Info)
  const renderCard = ({item}) => {
    return(
      <View style={styles.card}>
        <Avatar.Image size={90} source={require('../../assets/ava1.png')} />
        
        <Text style={{ fontSize:20 }}>User, Age</Text>
        <Text>Beginner</Text>
        <View style={{alignItems:"baseline", alignSelf:"stretch", paddingHorizontal: 10}}>
          <Paragraph>Say something nice ...</Paragraph>
          <Title>Preferred Destination</Title>

          <Title>Availability</Title>
        </View>      
      </View>
    )
  }

  const allPotentialBuddies = getAllPotentialBuddies();
  const getNext10Cards = () => {
    console.log("getting the next 10 cards...");
  };

  return (
    <Screen style={styles.container}>
        <Swiper
          // cards={getMatches}
          verticalSwipe={false}
            cards={['1', '2', '3', '4', '5', '6', '7']}
            renderCard={renderCard}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
          onSwipedLeft={}
          onSwipedRight={}
            onSwipedAll={getNext10Cards}
            cardIndex={0}
            backgroundColor={'lightblue'}
            stackSize= {3}>
        </Swiper>
      {/* <Avatar.Image size={90} source={require('../../assets/ava1.png')} />
        <Text style={{paddingHorizontal: 10, fontSize: 25}}>User</Text>
        <View style={{alignItems:"baseline"}}>
        <Text>Say something nice ...</Text>
       
        <Text>Preferred Place and Time</Text>
        </View> */}
       
    </Screen>
  ) 
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 30,
    paddingTop: 30,
    color:"#05668D"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});