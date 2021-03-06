import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { light } from '@eva-design/eva';
import { AntDesign } from '@expo/vector-icons';

const DAYS = ['Today', 'Tomorrow', 'This week', 'This month'];


export default function SearchList({setCreateVisible}) {
    const _renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.item}>
                <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
        )
    };

    const _renderItemHeader = () => {
        return (
            <TouchableOpacity onPress={() => {
                setCreateVisible(true)
            }}
                style={styles.itemHeader}>
                <AntDesign style={{marginLeft: 5}} name="pluscircle" size={15} color="#274BDB" />
                <Text style={[styles.itemHeaderText, styles.text]}>Create</Text>
            </TouchableOpacity>
        )
    };

    return (
        <View>
            <FlatList
                data={DAYS}
                keyExtractor={item => item}
                key={item => item.id}
                horizontal={true}
                ListHeaderComponent={() => _renderItemHeader()}
                renderItem={({item}) => _renderItem(item)}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#EDF1F7',
        borderRadius: 10,
        margin: 5,
        padding: 5
    },
    text: {
        fontWeight: "600",
        marginLeft: 5,
        marginRight: 5
    },
    itemHeader: {
        backgroundColor: '#D9E4FF',
        borderRadius: 10,
        margin: 5,
        padding: 5,
        marginLeft: 10,
        flexDirection: 'row'
    },
    itemHeaderText: {
        color: '#274BDB'
    }
});