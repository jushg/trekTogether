import React,{useState,useEffect} from "react"
import { View, StyleSheet, Text } from "react-native";
import { Card, Avatar,Paragraph } from "react-native-paper"
import { MAPS_API_KEY } from "@env";

import * as Trip from "../../utils/trip";
import colorConst from '../constant/color';
import loadingImg from "../../assets/loading.jpg"
export default (props) => {
    const {item,user,navigation} = props
    const date = item.date.toDate().toLocaleDateString();
    const hasBuddy = item.members.length === 2;
    let buddyDesc ;
    if (hasBuddy) {
        buddyDesc = `Going with ${item.otherMemberName[user.uid]}`;
    } else if (item.inviting === {}) {
        buddyDesc = "Solo trip";
    } else {
        buddyDesc = `Pending reply from ${item.inviting.name}`;
    }
    let placeDesc = item.place;
    if (Array.isArray(item.place)) {
        placeDesc = item.place.join(", ");
    }

    
    // photoRef is the result of the initial Place Search query
    const photoRef = "CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU"
    let imageLookupURL
    // let imageURLQuery 
    if (photoRef) {
      imageLookupURL = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${MAPS_API_KEY}&maxwidth=700&maxheight=700`;
    }
    const [imageURL,setImageURL] = useState("none")
    
    // useEffect(() => {
    //   async function fetchImage() {
    //     try {
    //       let response = await fetch(imageLookupURL)
    //       setImageURL(response.url)
    //       console.log(imageURL)
    //     } 
    //     catch (error) { console.error(error) }
    //   }
    //   fetchImage()
    // }, [])
  
    useEffect(() => {
      fetch(imageLookupURL)
      .then(response => response.url)
      .then(data => {
        setImageURL(data)
        console.log(imageURL)
      })
      .catch(err => console.error(err))
      // .then(data => image = data);
    }, []);
    return(
        <Card 
        mode="outlined"
        style={styles.card}
        onPress={() => navigation.navigate("Edit Trip", {trip: item})} >
        {imageURL == "none" ? <Card.Cover source={loadingImg} />: <Card.Cover source={{uri: imageURL}} />}
        <Card.Title 
        title={item.routeName ? (item.routeName + " - " + date) : (item.place + " - " + date)}
        subtitle={date + " - " + buddyDesc}
        subtitleNumberOfLines={3}
        right={(props) => {
          if (hasBuddy)
            return (
              <View style={{ justifyContent: 'center', padding: '0.5%' }}>
                <Avatar.Image {...props} size={50} source={{uri: item.otherAvatarURL[user.uid]}} />
              </View>
            );
        }}
      />
      <Card.Content>
        <Text style={{fontStyle: "italic"}}>{placeDesc}</Text>
        {item.notes !== "" && <Paragraph>{item.notes}</Paragraph>}
      </Card.Content>
        
        </Card>
    )
}



const styles = StyleSheet.create({
    card: {
      marginVertical: "1.5%",
      backgroundColor: "white",
      borderWidth: 0.5,
      borderRadius: 10,
      elevation: 5
    }
  });