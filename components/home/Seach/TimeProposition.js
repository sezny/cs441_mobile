import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, FlatList} from 'react-native'

const DAYS = ['Today', 'Tomorrow', 'This week', 'This month'];


export default function TimeProposition({visible, setSearchVisible}) {
    const _renderItems = (item) => {
        return (
            <View>
                <Text>Hello</Text>
            </View>
        )
    };

    return (
        <View>
            <FlatList
                data={DAYS}
                renderItem={(item) => _renderItems(item)}
            />
        </View>
    );
}
