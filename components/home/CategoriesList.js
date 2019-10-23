import React, {useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, Text, Dimensions, StyleSheet, Image, SafeAreaView, TouchableOpacity, FlatList} from 'react-native'
let deviceWidth = Dimensions.get('window').width;

const DATA = [
    {
        name: 'Sport',
        color: '#247BA0'
    },
    {
        name: 'Social',
        color: '#70C1B3'
    },
    {
        name: 'Study',
        color: '#B2DBBF'
    },
    {
        name: 'Chill',
        color: '#F3FFBD'
    }
];

export default function CategoriesList() {
    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity style={[styles.itemContainer, {backgroundColor: item.color}]}>
                <Text>{ item.name }</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <Text style={{fontSize: 24, marginLeft: 20, marginBottom: 10, marginTop: 10, fontWeight: "600"}}>Take a look</Text>
            <FlatList
                data={DATA}
                horizontal={true}
                renderItem={( item ) => _renderItem(item)}
                keyExtractor={item => item.name}
                showsHorizontalScrollIndicator={false}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        width: 100,
        height: 40,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
});