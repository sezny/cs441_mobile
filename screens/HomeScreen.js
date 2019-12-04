import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Input, Avatar } from 'react-native-ui-kitten';
import SearchList from '../components/home/SearchList';
import TodayList from '../components/home/TodayList'
import CategoriesList from '../components/home/CategoriesList';
import RecommendedList from '../components/home/RecommendedList';
import {AntDesign, MaterialIcons} from '@expo/vector-icons'
import SearchModal from '../components/home/Search';
import CreateModal from '../components/home/Create';

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
    const [searchVisible, setSearchVisible] = useState(false);
    const [createVisible, setCreateVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <SearchModal visible={searchVisible} setSearchVisible={setSearchVisible}/>
            <CreateModal visible={createVisible} setCreateVisible={setCreateVisible}/>
            <View style={styles.containerHeader}>
                <Text style={styles.eventTitle}>Events</Text>
                <TouchableOpacity onPress={() => {
                    setSearchVisible(true)
                }}>
                    <MaterialIcons style={{marginRight: 15}} name="search" size={30} color="#274BDB" />
                </TouchableOpacity>
            </View>
            <SearchList setCreateVisible={setCreateVisible}/>
            <ScrollView style={{backgroundColor: '#f5f5f5'}}>
                <TodayList/>

                <CategoriesList/>
                <RecommendedList/>
            </ScrollView>
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
    containerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    },
    eventTitle: {
        fontSize: 26, marginLeft: 20, marginBottom: 10, fontWeight: "700"
    }
});
