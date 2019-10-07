import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { Input, Avatar } from 'react-native-ui-kitten';
import SearchList from '../components/home/SearchList';
import {MaterialIcons} from '@expo/vector-icons'

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

export default function HomeScreen() {
    const [search, setSearch] = useState('Foot');
    const _renderEventItem = (item) => {
        console.log(item);
        return (
            <View style={styles.itemContainer}>
                <View style={styles.dateContainer}>
                    <View style={styles.dateBoxes}>
                        <Text style={styles.date}>Monday</Text>
                        <View style={styles.dateDivider}/>
                        <Text style={styles.date}>2 - 3 pm</Text>
                    </View>
                </View>
                <Text>
                    {item.title}
                </Text>
            </View>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 26, marginLeft: 20, marginBottom: 10, fontWeight: 700}}>Events</Text>
            {/*<View style={styles.header}>*/}
            {/*    <TouchableOpacity style={{margin: 10}}>*/}
            {/*        <MaterialIcons name="add" size={32} color="blue" />*/}
            {/*    </TouchableOpacity>*/}
            {/*    <Input style={{width: '80%', borderRadius: 10}}/>*/}
            {/*</View>*/}
            <SearchList/>
            <FlatList
                style={styles.list}
                data={DATA}
                keyExtractor={item => item.id}
                key={item => item.id}
                renderItem={({item}) => _renderEventItem(item)} />
        </SafeAreaView>
    );
}

HomeScreen.navigationOptions = {
    header: null,
};


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        backgroundColor: '#fafafa'
    },
    itemContainer: {
        height: 70,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 10
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
