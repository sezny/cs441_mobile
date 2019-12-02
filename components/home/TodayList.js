import React, {useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, Text, Dimensions, StyleSheet, Image, SafeAreaView, TouchableOpacity} from 'react-native'
let deviceWidth = Dimensions.get('window').width;

const DATA = [
    {
        "id": 1,
        "title": "Title 1",
        "description": null,
    },
    {
        "id": 2,
        "title": "Title 2",
        "description": "cool event  2",
    },
    {
        "id": 3,
        "title": "ant.ledu@free.fr",
        "description": "aaaaaaaa",
    },
    {
        "id": 4,
        "title": "ant.ledu@free.fr",
        "description": "aaaaaaaa",
    }
];

export default function TodayList() {
    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity style={styles.itemContainer}>
                <Image
                    style={{width: 270, height: 125, borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                    resizeMode={'cover'}
                    source={{ uri: 'https://d301qp0kpaemqw.cloudfront.net/nonprofits/1c8206c0-c23c-40c4-8f65-cd8dcbb9c5a6/events/e1b59c43-e5ad-40a3-ad82-577e5f30012a/processed_8f5be2eff9c98718c75ec89a9514812be6a46bcca5f9b619d0468e796c8372f4_background_image.jpg'}}
                />
                <Text>{ item.title }</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <Text style={{fontSize: 24, marginLeft: 20, marginBottom: 10, marginTop: 10, fontWeight: '600'}}>Today</Text>
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={DATA}
                renderItem={_renderItem}
                sliderWidth={deviceWidth}
                sliderHeight={400}
                itemWidth={270}
                itemHeight={275}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 230,
        borderRadius: 10,
        borderColor: '#f5f5f5',
        borderWidth: 1,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginBottom: 10
    }
});