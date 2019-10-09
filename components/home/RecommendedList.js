import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from "react-native";
import { AntDesign } from '@expo/vector-icons';


const DATA = [
    {
        "id": 1,
        "title": "titre 1",
        "description": null,
        "created_at": "2019-09-25T20:04:45.350Z",
        "updated_at": "2019-09-25T20:04:45.350Z",
        "user_id": null
    },
    {
        "id": 2,
        "title": "titre 2",
        "description": "cool event  2",
        "created_at": "2019-09-25T20:05:03.449Z",
        "updated_at": "2019-09-25T20:05:03.449Z",
        "user_id": null
    },
    {
        "id": 3,
        "title": "ant.ledu@free.fr",
        "description": "aaaaaaaa",
        "created_at": "2019-09-25T21:19:34.633Z",
        "updated_at": "2019-09-25T21:19:34.633Z",
        "user_id": 16
    },
    {
        "id": 4,
        "title": "ant.ledu@free.fr",
        "description": "aaaaaaaa",
        "created_at": "2019-09-26T01:00:12.107Z",
        "updated_at": "2019-09-26T01:00:12.107Z",
        "user_id": 16
    }
];

export default function RecommendedList() {
    const _renderEventItem = (item) => {
        console.log(item);
        return (
            <View style={styles.itemContainer}>
                <Image
                    style={{width: 180, height: 70, borderRadius: 10}}
                    resizeMode={'cover'}
                    source={{ uri: 'https://d301qp0kpaemqw.cloudfront.net/nonprofits/1c8206c0-c23c-40c4-8f65-cd8dcbb9c5a6/events/e1b59c43-e5ad-40a3-ad82-577e5f30012a/processed_8f5be2eff9c98718c75ec89a9514812be6a46bcca5f9b619d0468e796c8372f4_background_image.jpg'}}
                />
            </View>
        )
    };

    return (
        <View>
            <Text style={{fontSize: 24, marginLeft: 20, marginBottom: 10, marginTop: 10, fontWeight: 600}}>For you</Text>
            <FlatList
                contentContainerStyle={styles.list}
                // style={styles.list}
                data={DATA}
                keyExtractor={item => item.id}
                key={item => item.id}
                numColumns={2}
                renderItem={({item}) => _renderEventItem(item)} />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fafafa',
        alignItems: 'center'
    },
    itemContainer: {
        height: 70,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 10,
        margin: 5
    },
    dateContainer: {
        height: 60,
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    dateDivider: {
        height: 2,
        backgroundColor: 'white',
        marginLeft: 5,
        marginRight: 5
    },
    dateBoxes: {
        justifyContent: 'space-evenly',
        height: 60
    },
    date: {
        paddingLeft: 10,
        paddingRight: 10,
        color: '#cb140d',
        fontSize: 15
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginBottom: 20
    }
});