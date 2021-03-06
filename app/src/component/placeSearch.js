import React from "react"
import { View, Keyboard } from "react-native";
import { Chip } from "react-native-paper";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import colorConst from '../constant/color';
import { MAPS_API_KEY } from "@env";

export default (props) => {
  return (
   <>
    <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
        {props.place.map((item, index) => {
        return (
        <View
            style={{ marginHorizontal: 3, marginVertical: 3}}
            // key={item.place_id}
            key={index}
        >
            <Chip
            mode="flat"
            selected={false}
            height={30}
            textStyle={{ color:'black', fontSize: 15 }}
            style={{ backgroundColor: colorConst.secondaryDark, borderColor:"black"}}
            onClose={() => {
                let newPlace = [...props.place];
                newPlace.splice(index, 1);
                props.setPlace(newPlace);
                // console.log('Delete place '+ item.description)
            }}>
            { item.structured_formatting.main_text }
            </Chip>
        </View>
        );
        })}
    </View>

    <GooglePlacesAutocomplete
        placeholder={props.textPlaceHolder}
        debounce={500}     // delay after typing to call API
        multiline={false}
        // fetchDetails={true}
        onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
            const arr = [...props.place, data];
            props.setPlace(arr);
            if(props.moreDetails && details.photos[0].photo_reference != null) {
                const refArr = [...props.coverPhotoRef, details.photos[0].photo_reference];
                props.setCoverPhotoRef(refArr);
                // props.coverPhotoRef == null && props.setCoverPhotoRef(details)
            }
        }}
        // returnKeyType="search"
        onEndEditing={Keyboard.dismiss}
        onFail={console.error}
        onNotFound={console.error}
        fetchDetails={props.moreDetails}
        query={{
            key: MAPS_API_KEY,
            language: 'en',
            components: 'country:sg',
        }}
        textInputProps={{   // props for react native's TextInput, not rn paper!
            clearTextOnFocus: true,     // ios only
            backgroundColor: colorConst.secondaryLight,
            clearButtonMode: "always", //ios only ?
            placeholderTextColor: colorConst.placeholder,
        }}
        styles={{
            textInput: {
                width: "100%",
                height: 65,
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 15,
                fontSize:16,
                marginVertical: 10,
                elevation: 5
            },
            listView:{
                borderRadius:5,
                borderWidth:0.75
            }
        }}
        enablePoweredByContainer={false}
    />
   </>
  );
}